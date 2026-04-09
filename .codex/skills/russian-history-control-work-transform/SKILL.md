---
name: russian-history-control-work-transform
description: Use when converting files under books/russian-history-9/books/russian-history/control-work into interactive practice cards in this repo. Preserve the full source structure, keep headers and visuals, and mark every generated or inferred element with *.
---

# Russian History Control-Work Transform

Use this skill for isolated control-work conversion tasks in this repository.

For full chapter rebuilds, use `.codex/skills/russian-history-chapter-conversion/SKILL.md` as the primary workflow.

## Core rules

- Preserve all source content between question `N.` and question `N+1.`.
- Do not collapse structured prompts into one-line paraphrases.
- Keep source headers such as `СОБЫТИЯ`, `УЧАСТНИКИ`, `НАЧАЛО СУЖДЕНИЯ`, `ВАРИАНТЫ ЗАВЕРШЕНИЯ СУЖДЕНИЯ`.
- Keep answer instructions unless the exact instruction is already shown once in the interactive control label or prompt.
- Allow only light cleanup: spacing, punctuation, obvious OCR or encoding fixes, and minor grammar or style cleanup.
- Mark every generated or inferred element with `*`.
- Do not add or transform a practice question until `1-3` support cards in the same chapter contain the facts needed to answer it.
- Visible support-card layout for this repo: first block combines `Время`, `Место`, and `Участники` into short text lines with labels; second block contains paragraph sections `Главное`, then optional `Причины`, `Итоги`.

## Workflow

1. Identify the exact source span.
2. Copy the source structure first: stem, subheaders, lists, tables, images, maps, schemes, answer instruction.
3. Classify the question family.
4. Confirm which `1-3` support cards answer the question and enrich them first if needed.
5. Apply the matching branch below.
6. Add explanations grounded in the chapter books.
7. Add `*` to every generated or inferred element.

## Branches

### Chronology
- Preserve the event list exactly.
- If the source answer is open, generated sequence options must be marked `*`.

### Matching
- Preserve both columns and their headers.
- Do not replace the columns with a paraphrased sentence.
- If transformed into MCQ, each option must represent a full mapping and be marked `*`.

### Choose N correct statements
- Preserve the excerpt and every numbered statement.
- Render as exact-N selection when the source says `выберите два`, `укажите два`, and similar.

### Image and map blocks
- Keep the original image or map visible.
- If the source groups tasks, keep the group header and split the tasks only after the source block is preserved.
- For questions like `Какой цифрой...`, extract visible numeric labels and use them as MCQ options marked `*`.
- If a map or image question cannot be bounded safely, stop and ask the user.

### Table completion
- Preserve the original table.
- Preserve `НАЧАЛО СУЖДЕНИЯ` and `ВАРИАНТЫ ЗАВЕРШЕНИЯ СУЖДЕНИЯ`.
- Convert to bounded interaction only when the completion set is explicit.

### Theory/fact matching
- Preserve all numbered statements.
- Use matching-style subtasks or bounded MCQ.
- Any helper labels or recomposed pairings are marked `*`.

### Error spotting / sequence restoration
- Preserve the numbered source text.
- For error spotting, keep the numbered sentences and exact-N selection.
- For sequence restoration, keep the numbered sentences and use ordered subtasks or bounded MCQ.

### Odd term out / term definition / source attribution
- Preserve the list or excerpt except for light cleanup.
- Use MCQ only when distractors are chapter-grounded and defensible.
- If safe bounded options cannot be formed, stop and ask the user.

### Scheme fill-in
- Keep the original scheme image.
- Split blanks into subtasks.
- Generated answer options are marked `*`.

### Compare-and-contrast
- Preserve the original compare stem and table headings.
- Transform into guided or bounded subtasks.
- Generated criteria are always marked `*`.

## Validation checklist

- The transformed card still contains every source block from the original question span, except for an answer instruction duplicated verbatim by the interactive control label or prompt.
- No source subheader disappeared, and any omitted answer instruction is duplicated exactly once elsewhere in the card.
- Every generated or inferred element is marked `*`.
- Explanations are consistent with the chapter books.
- Matching questions still display both sides of the match.
- The question is answerable from `1-3` support cards in the same chapter.
