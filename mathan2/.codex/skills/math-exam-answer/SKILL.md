---
name: math-exam-answer
description: In the mathan2 project, convert mathematical analysis exam tickets into concise complete oral answers using mathan2/source/exam_questions_sakbaev.tex and mathan2/source/IvGE_*.pdf. Use only for this mathan2 exam-answer workflow when the user asks to prepare, answer, summarize, or polish a ticket/bilet from this local math analysis program, especially when answers must include definitions, theorem statements, and proofs grounded in the local PDFs.
---

# Math Exam Answer

## Workflow

Use the project layout consistently:
- Read source PDFs and ticket files from `mathan2/source/`.
- Put generated answer `.tex`, `.pdf`, `.aux`, `.log`, and related artifacts in `mathan2/target/`.
- Do not write generated answers into the project root or `mathan2/source/`.

1. Identify the ticket.
   - If the user gives a number, read the matching item from `mathan2/source/exam_questions_sakbaev.tex`.
   - If the user gives text, use it directly and, when helpful, match it against the ticket list.
   - Preserve the full ticket wording for the saved answer document header, but omit the leading ticket number because the top heading already contains it.

2. Search the sources before answering.
   - Read `references/textbook-map.md` first to choose likely chapters and pages.
   - Use `scripts/search_sources.py --ticket N` for numbered tickets.
   - Use `scripts/search_sources.py "ключевые слова"` for free-form ticket text.
   - Search both `IvGE_1.pdf` and `IvGE_2.pdf`; do not assume the needed material is only in one part.

3. Build a source map.
   - Record the relevant PDF name, page numbers, section titles, and the role of each page.
   - Re-run targeted searches for missing subtopics from the ticket.
   - Prefer textbook terminology and proof order when available.

4. Compose the answer.
   - Follow `references/answer-style.md`.
   - Follow `references/source-policy.md`.
   - Include all parts requested by the ticket: definitions, theorem statements, and proofs.
   - Keep the answer as short as possible without omitting required mathematical content.

5. Verify coverage.
   - Compare the final answer against every phrase of the ticket.
   - Remove material from neighboring topics unless it is needed for a proof or definition.
   - If a standard connective definition is needed but not found in the PDFs, mark it as a standard clarification.

## Search Tool

Run from the project root (`mathan2/`):

```bash
python3 .codex/skills/math-exam-answer/scripts/search_sources.py --ticket <номер> --top 8
python3 .codex/skills/math-exam-answer/scripts/search_sources.py "экстремум функция нескольких переменных" --top 8
```

The script prints matching snippets with `pdf`, `page`, and score. Use it as a discovery aid, then inspect adjacent pages with `pdftotext` when a proof spans multiple pages.

## Output Contract

Return the answer in Russian. Use Markdown and LaTeX math. Cite source locations compactly, for example: `Источник: IvGE_1.pdf, стр. 161--163`.

When creating answer files, write them under `mathan2/target/`, for example `mathan2/target/answer_question_01.tex` and `mathan2/target/answer_question_01.pdf`.

Saved answer documents must start with the top heading `Билет <номер>`, then the full ticket wording visually highlighted in normal font: use a framed block in saved `.tex`/`.pdf` output and a plain Markdown blockquote in Markdown output. Do not add a separate `Текст билета` heading and do not repeat the ticket number before the wording.

If the user asks only for the answer, do not include a long research log. If source coverage is uncertain, state the gap briefly and give the best grounded answer.
