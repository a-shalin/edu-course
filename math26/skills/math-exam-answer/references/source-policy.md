# Source Policy

## Primary Sources

Use both textbook PDFs in the project root:

- `IvGE_1.pdf`: Иванов, «Лекции по математическому анализу», часть 1.
- `IvGE_2.pdf`: Иванов, «Лекции по математическому анализу», часть 2.

Use `exam_questions_sakbaev.tex` as the default ticket list.

## Source Rules

- Search both PDF files for every ticket unless the location is already obvious from a previous source map in the same task.
- Deduplicate only when files have identical SHA-256 hashes. Different files with similar titles are separate sources.
- Prefer the PDF section that directly matches the ticket topic. If the same fact appears in both parts, use the simpler or more exam-relevant version.
- If a proof is in the textbook, summarize that proof rather than replacing it with an unrelated standard proof.
- If the textbook states "proof repeats" or leaves an exercise, it is acceptable to give the standard proof, but label it as a standard proof.
- Do not invent theorem names, assumptions, or conclusions. Check quantifiers and hypotheses against the source.

## Citation Rules

- Cite compactly at the end of the answer or after major blocks: `IvGE_1.pdf, стр. 158--163`.
- Page numbers are PDF page numbers reported by extraction tools unless the user asks for printed book page numbers.
- Avoid long quotations. Paraphrase definitions and proofs in concise exam language.

## Handling Extraction

- `IvGE_1.pdf` may extract Cyrillic through a legacy encoding path; use the search script because it chooses the more readable decoding.
- `IvGE_2.pdf` generally extracts readable Unicode text directly.
- If formulas are damaged by extraction, inspect the PDF page or infer only standard notation that is unambiguous from surrounding text.
