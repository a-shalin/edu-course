#!/usr/bin/env python3
"""Search local math analysis tickets and Ivanov textbook PDFs."""

from __future__ import annotations

import argparse
import hashlib
import re
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path


SCRIPT = Path(__file__).resolve()
PROJECT_ROOT = SCRIPT.parents[4]
SOURCE_ROOT = PROJECT_ROOT / "source"
DEFAULT_TICKETS = SOURCE_ROOT / "exam_questions_sakbaev.tex"
DEFAULT_PDFS = [SOURCE_ROOT / "IvGE_1.pdf", SOURCE_ROOT / "IvGE_2.pdf"]

WORD_RE = re.compile(r"[A-Za-zА-Яа-яЁё0-9]+")
STOP_WORDS = {
    "для",
    "или",
    "при",
    "как",
    "что",
    "если",
    "тогда",
    "точке",
    "точка",
    "точки",
    "точек",
    "функции",
    "функция",
    "множества",
    "множество",
    "нескольких",
    "переменных",
    "доказательство",
    "теорема",
    "критерий",
}


@dataclass(frozen=True)
class PdfSource:
    path: Path
    aliases: tuple[Path, ...]
    digest: str


def run(args: list[str]) -> bytes:
    try:
        return subprocess.check_output(args, cwd=PROJECT_ROOT, stderr=subprocess.PIPE)
    except FileNotFoundError as exc:
        raise SystemExit(f"Required command not found: {args[0]}") from exc
    except subprocess.CalledProcessError as exc:
        stderr = exc.stderr.decode("utf-8", errors="replace")
        raise SystemExit(f"Command failed: {' '.join(args)}\n{stderr}") from exc


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def cyrillic_score(text: str) -> int:
    return sum(("А" <= ch <= "я") or ch in "Ёё" for ch in text)


def decode_pdf_text(data: bytes) -> str:
    utf = data.decode("utf-8", errors="replace")
    legacy = utf.encode("latin1", errors="ignore").decode("cp1251", errors="ignore")
    return legacy if cyrillic_score(legacy) > cyrillic_score(utf) else utf


def extract_pdf_pages(path: Path) -> list[str]:
    data = run(["pdftotext", "-layout", str(path), "-"])
    text = decode_pdf_text(data)
    pages = text.split("\f")
    if pages and not pages[-1].strip():
        pages.pop()
    return pages


def strip_latex(text: str) -> str:
    replacements = {
        r"\mathbb{R}": "R",
        r"\mathbb{C}": "C",
        r"\ln": "ln",
        r"\cos": "cos",
        r"\sin": "sin",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    text = re.sub(r"\\[a-zA-Z]+\*?(?:\[[^\]]*\])?(?:\{([^{}]*)\})?", r"\1", text)
    text = text.replace("$", " ")
    text = text.replace("{", " ").replace("}", " ")
    text = text.replace("--", " ")
    return re.sub(r"\s+", " ", text).strip()


def extract_ticket(number: int, ticket_file: Path = DEFAULT_TICKETS) -> str:
    if not ticket_file.exists():
        raise SystemExit(f"Ticket file not found: {ticket_file}")

    items: dict[int, list[str]] = {}
    current_number = 0
    current_lines: list[str] | None = None

    for raw_line in ticket_file.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        counter = re.match(r"\\setcounter\{enumi\}\{(\d+)\}", line)
        if counter:
            if current_lines is not None:
                items[current_number] = current_lines
                current_lines = None
            current_number = int(counter.group(1))
            continue

        if line.startswith(r"\item"):
            if current_lines is not None:
                items[current_number] = current_lines
            current_number += 1
            current_lines = [line.removeprefix(r"\item").strip()]
            continue

        if current_lines is not None:
            if line.startswith(r"\end{enumerate}"):
                items[current_number] = current_lines
                current_lines = None
            else:
                current_lines.append(line)

    if current_lines is not None:
        items[current_number] = current_lines

    if number not in items:
        known = ", ".join(str(k) for k in sorted(items))
        raise SystemExit(f"Ticket {number} not found. Known tickets: {known}")
    return strip_latex(" ".join(items[number]))


def tokens_for(query: str) -> list[str]:
    words = []
    for word in WORD_RE.findall(query.lower()):
        if len(word) < 4 or word in STOP_WORDS:
            continue
        # Short prefixes are robust to Russian case endings and extraction noise.
        words.append(word[:6])
    seen = set()
    return [w for w in words if not (w in seen or seen.add(w))]


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def score_page(page: str, tokens: list[str]) -> int:
    lower = page.lower()
    score = 0
    unique_hits = 0
    for token in tokens:
        count = lower.count(token)
        if count:
            unique_hits += 1
            score += 3 + count
    score += unique_hits * 2
    if "оглавление" in lower or "предметный указатель" in lower:
        score -= 35
    return score


def snippet(page: str, tokens: list[str], width: int) -> str:
    lower = page.lower()
    positions = [lower.find(token) for token in tokens if lower.find(token) >= 0]
    if not positions:
        return normalize(page[:width])
    center = min(positions)
    start = max(0, center - width // 2)
    end = min(len(page), center + width // 2)
    return normalize(page[start:end])


def split_clauses(query: str) -> list[str]:
    clauses = [part.strip() for part in re.split(r"[.;]\s+", query) if part.strip()]
    return [clause for clause in clauses if len(tokens_for(clause)) >= 2]


def rank_pages(
    page_records: list[tuple[str, int, str]], tokens: list[str], context: int
) -> list[tuple[int, str, int, str]]:
    results: list[tuple[int, str, int, str]] = []
    for pdf_name, idx, page in page_records:
        page_score = score_page(page, tokens)
        if page_score > 0:
            results.append((page_score, pdf_name, idx, snippet(page, tokens, context)))
    results.sort(key=lambda item: item[0], reverse=True)
    return results


def discover_pdfs(paths: list[Path]) -> list[PdfSource]:
    by_hash: dict[str, list[Path]] = {}
    for path in paths:
        if path.exists():
            by_hash.setdefault(sha256(path), []).append(path)
    sources = []
    for digest, grouped in by_hash.items():
        sources.append(PdfSource(grouped[0], tuple(grouped[1:]), digest))
    return sources


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Search mathan2/source/IvGE_1.pdf and mathan2/source/IvGE_2.pdf for exam-answer passages."
    )
    parser.add_argument("query", nargs="*", help="Free-form search query.")
    parser.add_argument("--ticket", type=int, help="Ticket number from exam_questions_sakbaev.tex.")
    parser.add_argument("--tickets-file", type=Path, default=DEFAULT_TICKETS)
    parser.add_argument("--pdf", action="append", type=Path, help="Override/add PDF path. May repeat.")
    parser.add_argument("--top", type=int, default=8, help="Number of results to print.")
    parser.add_argument("--context", type=int, default=900, help="Snippet width in characters.")
    parser.add_argument("--no-clauses", action="store_true", help="Do not print per-clause results.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    if shutil.which("pdftotext") is None:
        raise SystemExit("pdftotext is required. Install poppler-utils.")

    parts = []
    if args.ticket is not None:
        ticket_text = extract_ticket(args.ticket, args.tickets_file)
        parts.append(ticket_text)
        print(f"Ticket {args.ticket}: {ticket_text}\n")
    if args.query:
        parts.append(" ".join(args.query))
    if not parts:
        raise SystemExit("Provide --ticket N or a search query.")

    query = " ".join(parts)
    tokens = tokens_for(query)
    if not tokens:
        raise SystemExit("No useful search tokens found.")

    pdf_paths = [p if p.is_absolute() else PROJECT_ROOT / p for p in (args.pdf or DEFAULT_PDFS)]
    sources = discover_pdfs(pdf_paths)
    if not sources:
        raise SystemExit("No PDF sources found.")

    page_records: list[tuple[str, int, str]] = []
    for source in sources:
        pages = extract_pdf_pages(source.path)
        for idx, page in enumerate(pages, start=1):
            page_records.append((source.path.name, idx, page))

    results = rank_pages(page_records, tokens, args.context)

    print("Sources:")
    for source in sources:
        aliases = f" aliases: {', '.join(p.name for p in source.aliases)}" if source.aliases else ""
        print(f"- {source.path.name} sha256={source.digest[:12]}{aliases}")
    print()

    print(f"Search tokens: {', '.join(tokens)}\n")
    for score, pdf_name, page, text in results[: args.top]:
        print(f"## {pdf_name}, page {page}, score {score}")
        print(text)
        print()

    clauses = split_clauses(query)
    if not args.no_clauses and len(clauses) > 1:
        print("# Per-clause results\n")
        for clause in clauses:
            clause_tokens = tokens_for(clause)
            clause_results = rank_pages(page_records, clause_tokens, args.context)
            if not clause_results:
                continue
            print(f"### {clause}")
            for score, pdf_name, page, text in clause_results[:3]:
                print(f"- {pdf_name}, page {page}, score {score}: {text}")
            print()

    if not results:
        print("No matches found.")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
