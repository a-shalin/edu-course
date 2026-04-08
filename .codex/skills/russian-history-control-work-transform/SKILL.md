---
name: russian-history-control-work-transform
description: Use when converting files under books/russian-history-9/books/russian-history/control-work into interactive course cards in this repo. Preserve all source content between question N and question N+1, keep headers/lists/tables/images/maps/schemes, mark every generated or inferred element with *, and choose the transformation branch by workbook question family instead of flattening prompts.
---

# Russian History Control-Work Transform

Use this skill only for this repository's Russian history 9 control-work HTML.

## Core rules

- Preserve all source content between question `N.` and question `N+1.`.
- Do not collapse structured prompts into one-line paraphrases.
- Keep source headers such as `СОБЫТИЯ`, `УЧАСТНИКИ`, `НАЧАЛО СУЖДЕНИЯ`, `ВАРИАНТЫ ЗАВЕРШЕНИЯ СУЖДЕНИЯ`.
- Keep answer instructions such as `Запишите цифры...`, `Ответ:` unless the exact instruction is already shown once in the interactive control label or prompt.
- Allow only light cleanup: spacing, punctuation, obvious OCR/encoding fixes, minor grammar/style cleanup.
- Mark every generated or inferred element with `*`.
  Generated/inferred means: MCQ options not present in the source, decomposed subtasks, model answers, generated comparison criteria, extracted map labels turned into options, explanatory text.
- Do not add or transform a practice question until `1-3` textbook cards in the same chapter contain the facts needed to answer it.
- For question-supporting textbook cards, the default factual minimum is: time, place, participants, and essence. Add causes and results when the question requires them.
- Visible textbook-card layout for this repo: first block combines `Время`, `Место`, and `Участники` into short text lines with labels; second block contains paragraph sections `Главное`, then optional `Причины`, `Итоги`.

## Workflow

1. Identify the exact source span.
2. Copy the source structure first: stem, subheaders, lists, tables, images, maps, schemes, answer instruction.
3. Classify the question family.
4. Confirm which `1-3` textbook cards support this question and enrich them first if they do not yet contain the needed names, dates, places, institutions, or event essence.
5. Apply the matching branch below.
6. Add explanations grounded in the chapter books.
7. Add `*` to every generated or inferred element.
8. If a safe bounded MCQ cannot be formed, keep the source block and use reveal-answer mode instead of guessing.

## Branches

### Chronology
- Preserve the event list exactly.
- If the source already contains options, keep them.
- If the source answer is open, generated sequence options must be marked `*`.

### Matching
- Preserve both columns and their headers.
- Do not replace the columns with a paraphrased sentence.
- If transformed into MCQ, each option must represent a full mapping and be marked `*`.

### Choose N correct statements
- Preserve the excerpt and every numbered statement.
- Render as exact-N selection when the source says `выберите два`, `укажите два` and similar.

### Image and map blocks
- Keep the original image or map visible.
- If the source groups tasks, keep the group header and split the tasks only after the source block is preserved.
- For questions like `Какой цифрой...`, extract visible numeric labels and use them as MCQ options marked `*`.
- For open map questions like `Запишите название...`, convert to MCQ only if the answer set is safely bounded by the source context; otherwise keep reveal-answer mode.

### Table completion
- Preserve the original table.
- Preserve `НАЧАЛО СУЖДЕНИЯ` and `ВАРИАНТЫ ЗАВЕРШЕНИЯ СУЖДЕНИЯ`.
- Convert to subtasks or bounded MCQ only when the completion set is explicit.

### Theory/fact matching
- Preserve all numbered statements.
- Use matching-style subtasks or bounded MCQ.
- Any helper labels or recomposed pairings are marked `*`.

### Error spotting / sequence restoration
- Preserve the numbered source text.
- For error spotting, keep the numbered sentences and exact-N selection.
- For sequence restoration, keep the numbered sentences and use ordered subtasks or bounded MCQ.

### Odd term out / term definition / source attribution
- Preserve the list or excerpt verbatim except for light cleanup.
- Use MCQ only when distractors are chapter-grounded and defensible.
- Otherwise use reveal-answer mode.

### Scheme fill-in
- Keep the original scheme image.
- Split blanks into subtasks.
- Generated answer options are marked `*`.

### Compare-and-contrast
- Preserve the original compare stem and table headings.
- Transform into guided subtasks.
- Generated criteria are always marked `*`.
- Default structure: `2` common features and `2` differences unless the source clearly requires another layout.

### Long OGE-style prompts
- Split the task into required response elements only after preserving the original full prompt.
- Identification subparts may become MCQ if bounded.
- Analytical subparts should default to reveal-answer with model answers marked `*`.

## Validation checklist

- The transformed card still contains every source block from the original question span, except for an answer instruction duplicated verbatim by the interactive control label or prompt.
- No source subheader disappeared, and any omitted answer instruction is duplicated exactly once elsewhere in the card.
- Every generated or inferred element is marked `*`.
- Explanations are consistent with the chapter books.
- Matching questions still display both sides of the match.
- The question is answerable from `1-3` textbook cards in the same chapter.
- The linked textbook cards contain the needed dates, places, participants, institutions, and event essence instead of relying on unstated background knowledge.
