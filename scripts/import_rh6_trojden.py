#!/usr/bin/env python3

from __future__ import annotations

import argparse
import html
import shutil
from pathlib import Path
from typing import Iterable

from bs4 import BeautifulSoup, Comment, Tag


REPO_ROOT = Path(__file__).resolve().parent.parent
TARGET_ROOT = REPO_ROOT / "rh6" / "books" / "russian-history-6"
TEXTBOOK_TARGET = TARGET_ROOT / "books" / "russian-history" / "part-1"
CONTROL_TARGET = TARGET_ROOT / "books" / "russian-history" / "control-work"
PART2_TARGET = TARGET_ROOT / "books" / "russian-history" / "part-2"
ASSETS_TARGET = TARGET_ROOT / "assets" / "images"
BOOTSTRAP_TARGET = TARGET_ROOT / "css" / "bootstrap" / "dist" / "css"
CSS_MAIN_TARGET = TARGET_ROOT / "css" / "main"
FONTS_ROOT_TARGET = TARGET_ROOT / "css"
IMG_TARGET = TARGET_ROOT / "img"

TEXTBOOK_SOURCE_SLUG = "russian-history-ix-xvi-vek-6-class-medinskii-2025"
CONTROL_SOURCE_SLUG = "russian-history-6-class-control-work-artasov-2016"

HTML_HEAD = """<!DOCTYPE html>

<html dir="ltr" lang="ru">
<head>
<meta content="text/html; charset=utf-8" http-equiv="content-type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="../../../assets/images/favicon.png" rel="icon" type="image/png"/>
<!--[if IE]><link rel="SHORTCUT ICON" href="/assets/images/favicon.png"/><![endif]-->
<link href="../../../css/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
<link href="../../../css/main/trojden.css" rel="stylesheet" type="text/css"/>
<link href="../../../css/fonts.css" media="print" onload="this.media='all'" rel="stylesheet"/>
<noscript><link href="../../../css/fonts.css" rel="stylesheet"/></noscript>
<title>{title}</title>
<meta content="{description}" name="description"/>
<style>body{{background:#fff!important;}} .nk-main{{padding-top:0!important;}} .nk-page-nav-3 .container{{max-width:100%;}}</style>
</head>
<body>
<div class="nk-main">
<div class="container">
<div class="row">
<div class="col-lg-12">
{body}
</div>
</div></div>
</div>
</body>
</html>
"""

README_CONTENT = """# RH6 Source Materials

Imported and cleaned local sources:

- textbook: `books/russian-history/part-1/` from `https://trojden.com/books/russian-history/russian-history-ix-xvi-vek-6-class-medinskii-2025/`
- control work: `books/russian-history/control-work/` from `https://trojden.com/books/russian-history/russian-history-6-class-control-work-artasov-2016/`

What was kept:

- cleaned textbook and control-work HTML
- textbook and workbook page image folders referenced by those HTML files
- shared reader styles, fonts, and the favicon used by the cleaned pages
- cover images for the textbook and control-work index pages

What was removed:

- Trojden header, footer, search, share widgets, comments, ads, analytics, and external scripts
- unused site assets such as JS bundles, logos, and extra downloaded resources that the cleaned pages no longer reference

`books/russian-history/part-2/` remains empty until a second textbook part is added.
"""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Import and clean RH6 Trojden textbook sources into the local book tree."
    )
    parser.add_argument(
        "--source-root",
        type=Path,
        required=True,
        help="Path to the mirrored Trojden download root.",
    )
    return parser.parse_args()


def clear_directory(directory: Path) -> None:
    directory.mkdir(parents=True, exist_ok=True)
    for child in directory.iterdir():
        if child.is_dir():
            shutil.rmtree(child)
        else:
            child.unlink()


def ensure_parent(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)


def tag_has_class_prefix(tag: Tag, prefix: str) -> bool:
    classes = tag.get("class", [])
    return any(isinstance(class_name, str) and class_name.startswith(prefix) for class_name in classes)


def strip_unwanted_nodes(container: Tag) -> None:
    for comment in container.find_all(string=lambda value: isinstance(value, Comment)):
        comment.extract()

    selectors = [
        ".nk-breadcrumbs",
        "#vk_comments",
    ]

    for selector in selectors:
        for node in container.select(selector):
            node.decompose()

    for node in container.find_all(lambda tag: isinstance(tag, Tag) and tag_has_class_prefix(tag, "adfinity_block_")):
        node.decompose()

    for icon in container.find_all("i"):
        classes = icon.get("class", [])
        if any(isinstance(class_name, str) and class_name.startswith("fa") for class_name in classes):
            icon.decompose()


def normalize_index_markup(container: Tag) -> None:
    accordion_link = container.select_one(".panel-heading a")
    if accordion_link:
        accordion_link["aria-expanded"] = "true"
        for attr in ("class", "data-toggle", "data-parent"):
            accordion_link.attrs.pop(attr, None)

    accordion_body = container.select_one(".panel-collapse")
    if accordion_body:
        accordion_body["class"] = ["panel-collapse", "show"]
        accordion_body["style"] = "display: block;"


def normalize_page_markup(container: Tag) -> None:
    page_nav = container.select_one(".nk-page-nav-3")
    if not page_nav:
        return

    for link in page_nav.select("a.nk-page-nav-grid"):
        for br in link.find_all("br"):
            br.decompose()
        for paragraph in link.find_all("p"):
            paragraph.unwrap()
        link.string = "Оглавление"


def rewrite_local_links(container: Tag, source_slug: str) -> None:
    for tag in container.find_all(["a", "img", "source"]):
        attr = "href" if tag.name == "a" else "src"
        value = tag.get(attr)
        if not value:
            continue

        if value.startswith(f"https://trojden.com/books/russian-history/{source_slug}/"):
            suffix = value.removeprefix(f"https://trojden.com/books/russian-history/{source_slug}/")
            tag[attr] = localize_suffix(suffix)
            continue

        if value.startswith(f"/books/russian-history/{source_slug}/"):
            suffix = value.removeprefix(f"/books/russian-history/{source_slug}/")
            tag[attr] = localize_suffix(suffix)
            continue

        if value.startswith("https://trojden.com/img/"):
            tag[attr] = "../../../img/" + value.rsplit("/", 1)[-1]
            continue

        if value.startswith("/img/"):
            tag[attr] = "../../../img/" + value.rsplit("/", 1)[-1]


def localize_suffix(suffix: str) -> str:
    if suffix.endswith("/"):
        return "index.html"
    if suffix.endswith(".php"):
        return suffix.rsplit("/", 1)[-1] + ".html"
    return suffix.rsplit("/", 1)[-1]


def collect_local_references(container: Tag) -> set[str]:
    references: set[str] = set()
    for tag in container.find_all(["a", "img", "source"]):
        for attr in ("href", "src"):
            value = tag.get(attr)
            if not value or value.startswith(("http://", "https://", "#", "mailto:", "data:")):
                continue
            base = value.split("#", 1)[0].split("?", 1)[0]
            if base:
                references.add(base)
    return references


def build_document(title: str, description: str, body_html: str) -> str:
    return HTML_HEAD.format(
        title=html.escape(title, quote=False),
        description=html.escape(description, quote=True),
        body=body_html,
    )


def render_book(source_dir: Path, target_dir: Path, source_slug: str, is_index: bool) -> tuple[list[Path], set[str]]:
    written_files: list[Path] = []
    references: set[str] = set()

    html_files = sorted(source_dir.glob("*.html"))
    for html_file in html_files:
        soup = BeautifulSoup(html_file.read_text(encoding="utf-8"), "html.parser")
        content = soup.select_one("div.col-lg-8")
        if content is None:
            raise RuntimeError(f"Could not find main content column in {html_file}")

        strip_unwanted_nodes(content)
        rewrite_local_links(content, source_slug)

        if html_file.name == "index.html" and is_index:
            normalize_index_markup(content)
        else:
            normalize_page_markup(content)

        title_text = soup.title.get_text(strip=True).removeprefix("Trojden | ")
        description_tag = soup.find("meta", attrs={"name": "description"})
        description_text = description_tag["content"].strip() if description_tag and description_tag.has_attr("content") else title_text

        body_html = "".join(str(child) for child in content.children)
        document = build_document(title_text, description_text, body_html)
        output_path = target_dir / html_file.name
        ensure_parent(output_path)
        output_path.write_text(document, encoding="utf-8")
        written_files.append(output_path)
        references.update(collect_local_references(content))

    return written_files, references


def copy_file(source: Path, target: Path) -> None:
    ensure_parent(target)
    shutil.copy2(source, target)


def copy_tree_subset(source_dir: Path, target_dir: Path, relative_paths: Iterable[str]) -> None:
    for relative_path in sorted(set(relative_paths)):
        source_path = source_dir / relative_path
        if not source_path.exists():
            continue
        copy_file(source_path, target_dir / relative_path)


def remove_placeholder_files() -> None:
    keep = PART2_TARGET / ".gitkeep"
    for gitkeep in TARGET_ROOT.rglob(".gitkeep"):
        if gitkeep != keep:
            gitkeep.unlink()

    directories = sorted(
        (path for path in TARGET_ROOT.rglob("*") if path.is_dir() and path != PART2_TARGET),
        key=lambda path: len(path.parts),
        reverse=True,
    )
    for directory in directories:
        try:
            directory.rmdir()
        except OSError:
            continue


def main() -> None:
    args = parse_args()
    source_root = args.source_root.resolve()

    textbook_source_dir = source_root / "books" / "russian-history" / TEXTBOOK_SOURCE_SLUG
    control_source_dir = source_root / "books" / "russian-history" / CONTROL_SOURCE_SLUG

    if not textbook_source_dir.exists():
        raise SystemExit(f"Missing textbook source directory: {textbook_source_dir}")
    if not control_source_dir.exists():
        raise SystemExit(f"Missing control-work source directory: {control_source_dir}")

    clear_directory(TEXTBOOK_TARGET)
    clear_directory(CONTROL_TARGET)
    ASSETS_TARGET.mkdir(parents=True, exist_ok=True)
    BOOTSTRAP_TARGET.mkdir(parents=True, exist_ok=True)
    CSS_MAIN_TARGET.mkdir(parents=True, exist_ok=True)
    FONTS_ROOT_TARGET.mkdir(parents=True, exist_ok=True)
    IMG_TARGET.mkdir(parents=True, exist_ok=True)
    PART2_TARGET.mkdir(parents=True, exist_ok=True)

    written_textbook_files, textbook_refs = render_book(
        textbook_source_dir,
        TEXTBOOK_TARGET,
        TEXTBOOK_SOURCE_SLUG,
        is_index=True,
    )
    written_control_files, control_refs = render_book(
        control_source_dir,
        CONTROL_TARGET,
        CONTROL_SOURCE_SLUG,
        is_index=True,
    )

    clear_directory(ASSETS_TARGET)
    clear_directory(BOOTSTRAP_TARGET)
    clear_directory(CSS_MAIN_TARGET)
    clear_directory(FONTS_ROOT_TARGET / "fonts")
    clear_directory(IMG_TARGET)

    copy_file(source_root / "assets" / "images" / "favicon.png", ASSETS_TARGET / "favicon.png")
    copy_file(
        source_root / "css" / "bootstrap" / "dist" / "css" / "bootstrap.min.css",
        BOOTSTRAP_TARGET / "bootstrap.min.css",
    )
    copy_file(source_root / "css" / "fonts.css", FONTS_ROOT_TARGET / "fonts.css")
    copy_file(source_root / "css" / "main" / "trojden.css", CSS_MAIN_TARGET / "trojden.css")
    shutil.copytree(source_root / "css" / "fonts", FONTS_ROOT_TARGET / "fonts", dirs_exist_ok=True)

    copy_tree_subset(
        textbook_source_dir,
        TEXTBOOK_TARGET,
        (ref for ref in textbook_refs if ref.startswith(f"{TEXTBOOK_SOURCE_SLUG}.files/")),
    )
    copy_tree_subset(
        control_source_dir,
        CONTROL_TARGET,
        (ref for ref in control_refs if ref.startswith(f"{CONTROL_SOURCE_SLUG}.files/")),
    )

    for cover_name in (
        f"{TEXTBOOK_SOURCE_SLUG}.jpg",
        f"{CONTROL_SOURCE_SLUG}.jpg",
    ):
        copy_file(source_root / "img" / cover_name, IMG_TARGET / cover_name)

    (TARGET_ROOT / "README.md").write_text(README_CONTENT, encoding="utf-8")
    remove_placeholder_files()

    print(f"Wrote {len(written_textbook_files)} textbook HTML files to {TEXTBOOK_TARGET}")
    print(f"Wrote {len(written_control_files)} control-work HTML files to {CONTROL_TARGET}")
    print(f"Copied {len([ref for ref in textbook_refs if ref.startswith(TEXTBOOK_SOURCE_SLUG)])} textbook local references")
    print(f"Copied {len([ref for ref in control_refs if ref.startswith(CONTROL_SOURCE_SLUG)])} control-work local references")


if __name__ == "__main__":
    main()
