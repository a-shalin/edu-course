---
name: russian-history-6-chapter-conversion
description: Use when converting a full RH6 chapter in this repo from the Russian History 6 textbook HTML and control-work HTML into a course module with timeline cards, linked textbook anchors, and selected practice that is answerable from those cards.
---

# Russian History 6 Chapter Conversion

Use this skill for full RH6 chapter work in this repository.

## Scope

Apply it when work targets:
- `rh6/books/russian-history-6/books/russian-history/part-1/*.php.html`
- `rh6/books/russian-history-6/books/russian-history/control-work/*.php.html`
- `rh6/src/lib/chapter*-course-data.ts`
- `rh6/src/lib/chapter*-book-data.ts`
- `rh6/src/lib/chapter*-practice.ts`

The RH6 output must include:
- a collapsed chronology summary for the chapter
- one study card for each main event taken from page `35.php.html` that belongs to the chapter scope
- extra support cards for adjacent facts needed to remove gaps
- selected control-work items that are answerable from `1-3` cards
- textbook reader targets for summaries, cards, and practice

## Core rules

- Keep user-facing assistant messages in English unless the user explicitly asks for another language.
- Preserve source workbook wording before adding interaction.
- Do not keep workbook exercises that are not directly supported by the RH6 cards.
- Before keeping any exercise, ask: `Can this be answered from 1-3 cards without guessing?`
- If the answer is no, enrich the cards first or drop the exercise.
- Page `rh6/books/russian-history-6/books/russian-history/part-1/35.php.html` is the canonical main-event spine.
- Every page-35 event used in a ready chapter needs its own main-event card.
- Support cards must stay chronological and should cover causes, actors, institutions, and consequences when the selected exercises need them.
- Reuse the existing RH9/RH6 reader-link model: practice links come from supporting-card targets, not a separate practice target table.

## Workflow

1. Read [references/chapter-map.md](references/chapter-map.md) for the RH6 chapter/source map.
2. Identify which page-35 events belong to the target chapter.
3. Build one main-event card per selected page-35 event.
4. Add support cards only where they remove understanding gaps or make workbook items answerable.
5. Select only the control-work items that reinforce those cards.
6. Wire summary targets and study-card targets in `chapter*-book-data.ts`.
7. Add textbook anchors through `scripts/build_rh6_textbook_anchors.py` instead of hand-editing HTML.
8. Validate that every referenced anchor id exists and that every kept practice item is covered by `1-3` supporting cards.

## RH6-specific constraints

- RH6 chapters follow the textbook’s four-part chapter structure, not the workbook’s chapter numbering.
- The workbook is a question bank, not a completeness target.
- Use workbook chapter material conservatively: keep only event-aligned items.
- When an event from page 35 is explained in an adjacent textbook section outside the strict chapter boundary, prefer a clean reader target over forcing a weaker anchor.

## Validation

- Run `python3 scripts/build_rh6_textbook_anchors.py` after changing anchor ids or textbook targets.
- Run `npm run lint:rh6` and `npm run e2e:rh6`.
- If repo behavior changed, also run `npm run lint` and `npm run e2e`.
