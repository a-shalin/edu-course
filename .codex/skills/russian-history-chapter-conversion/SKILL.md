---
name: russian-history-chapter-conversion
description: Use when converting a full Russian History 9 chapter in this repo from textbook HTML and control-work HTML into a course module with chronological summary, support cards, and shuffled learner-facing practice.
---

# Russian History Chapter Conversion

Use this skill for chapter-level conversions in this repository.

## Scope

Apply it when a chapter must be rebuilt or added from:
- textbook HTML under `books/russian-history-9/books/russian-history/part-*`
- matching control-work HTML under `books/russian-history-9/books/russian-history/control-work`

The target chapter module contains:
- a chapter-opening chronological summary
- chronological support cards
- a learner-facing practice session built from the chapter exercises

## Core rules

- Keep learner-facing messages in English unless the user explicitly asks for another language.
- Preserve all source content between question `N.` and question `N+1.` before adding interaction.
- Do not flatten structured prompts into one-line paraphrases.
- Keep source headers, answer instructions, tables, images, maps, and schemes.
- Mark every generated or inferred element with `*`.
- Do not add provenance phrasing such as `Оригинальная карта` or similar labels that explain where material came from instead of what it teaches.
- Generated headings, captions, notes, and prompts must focus on historical content and task meaning.
- Every included practice item must be answerable from `1-3` support cards in the same chapter.
- Support cards must contain the needed facts before the practice item is finalized: `Время`, `Место`, `Участники`, and the main event meaning are the default minimum; add `Причины` and `Итоги` when needed.
- If required names, dates, places, institutions, or terms are missing from the current support cards, enrich the cards first.
- Apply this explicit check before finalizing any practice item: `Can I answer this from the cards without guessing?` If the honest answer is no, the support cards are still incomplete and must be enriched first.
- Learner-facing practice titles, section headers, and helper labels must not reveal the correct answer before the learner interacts with the item.
- Source answer instructions should be preserved unless they duplicate the learner action already shown in the interactive control.
- If the same task would otherwise appear in both the source block and the interactive prompt, keep the concise action phrase in the interactive prompt and trim the repeated instruction from the learner-facing source block.
- If a source-side numbered statement list is identical to the interactive answer options, remove that list from the learner-facing source block and keep it only in the interactive control.
- Apply the same deduplication rule to titles: when the interactive prompt already tells the learner what to do, the title should name the topic or source focus, not repeat the task mechanic such as `верные суждения`.
- Visible support-card layout in this repo: first block combines `Время`, `Место`, and `Участники` into short text lines with labels; second block contains paragraph sections `Главное`, then optional `Причины`, `Итоги`.

## Workflow

1. Identify the chapter textbook pages and the matching control-work page.
2. Extract the full exercise inventory in source order.
3. Build the opening chronological summary from the textbook chapter.
4. Build chronological support cards from the textbook chapter.
5. Map each practice item to `1-3` support cards and enrich those cards if coverage is weak.
6. For each mapped item, ask: `Can I answer this from the cards without guessing?` If not, improve the support cards before keeping the item.
7. Transform control-work tasks into practice items using the branch rules below.
8. Check the learner-facing title and visible headers of each practice item and remove any wording that gives away the answer.
9. Store source metadata for every practice item, but do not show that metadata in the learner UI.
10. Present practice items in shuffled order to the learner.
11. Run validation and fix coverage, ordering, and rendering gaps.

## Practice conversion rules

### Short-answer control-work tasks
- Convert each numbered short-answer task into one practice item.
- Preserve the original source structure before the interactive part.
- If several derived items need the same map, image, table, excerpt, or scheme, duplicate the needed source block so every learner-facing item is self-contained.

### Long-answer control-work tasks
- A numbered long-answer task may become more than one practice item.
- Split it into atomic answerable checks only after preserving the original full source block.
- If one source task is split into several practice items, keep the shared context or excerpt, but replace the original multi-question ending with only the one question that belongs to the current derived item.
- Remove sibling questions from the learner-facing text of that derived item so the card does not suggest that the learner must answer prompts that are not part of the current interaction.
- Prefer bounded `single_choice` or `multi_select_exact_n` interactions.
- If any fragment cannot be bounded safely, stop and ask the user before finalizing that fragment.
- Do not silently skip the fragment and do not guess.

### Learner-facing order
- Keep source order in stored metadata for traceability.
- Shuffle practice items once at session start.
- Reshuffle on restart.
- Do not show source badges such as control-work number, variant, or fragment key in the learner UI.
- Show only the running question order in the session.

## Branches by question family

### Chronology
- Preserve the event list.
- If generated order options are added, mark them with `*`.

### Matching
- Preserve both columns and their headers.
- If converted to MCQ, each option must represent a full mapping and be marked `*`.

### Choose N correct statements
- Preserve the excerpt and every numbered statement.
- Use exact-N selection when the source asks for two or another fixed count.
- When the numbered statements are rendered as interactive options, do not also repeat the same list in the learner-facing source block.

### Image and map blocks
- Keep the image or map visible.
- If the source groups tasks under one visual block, preserve that source block and then split after it.
- Map number questions may become MCQ by extracting visible labels and marking generated options with `*`.
- If a map or image question cannot be bounded safely, stop and ask the user.

### Table completion
- Preserve the table and source headers such as `НАЧАЛО СУЖДЕНИЯ` and `ВАРИАНТЫ ЗАВЕРШЕНИЯ СУЖДЕНИЯ`.
- Convert to bounded interaction only when the completion set is explicit.

### Theory/fact matching
- Preserve all numbered statements.
- Use matching-style interaction or bounded MCQ.
- Generated helper pairings are marked with `*`.

### Error spotting / sequence restoration
- Preserve the numbered source text.
- For error spotting, keep exact-N selection.
- For sequence restoration, keep the numbered structure and use bounded ordering logic.

### Odd term out / term definition / source attribution
- Preserve the source wording except for light cleanup.
- Use MCQ only when distractors are chapter-grounded and defensible.
- If safe bounded options cannot be formed, stop and ask the user.

### Scheme fill-in
- Preserve the scheme image.
- Split blanks into atomic items or subtasks.
- Generated options are marked with `*`.

### Compare-and-contrast
- Preserve the compare topic, but remove learner-facing scaffolding that is no longer part of the transformed task.
- If the original wording asks the learner to formulate criteria and the converted card does not actually require free-form criteria creation, omit that instruction.
- Remove blank comparison tables when they are no longer being filled directly by the learner.
- Split into bounded common-feature and difference items where possible.
- Generated criteria are always marked with `*`.

## Summary and support-card rules

- The chapter summary must be chronological, compact, and hidden by default in the UI.
- Summary entries must include dates and enough factual detail to give the learner a full chapter picture.
- Support cards must be shown in chronological order.
- Add visual support cards only when the visual itself is needed to answer a practice item.

## Validation checklist

- The chapter summary is chronological and collapsed by default.
- Support cards are chronological.
- Every included practice item has `1-3` support cards with enough facts to answer it.
- Every included practice item passes the check: `Can I answer this from the cards without guessing?`
- No learner-facing practice title, header, or label reveals the correct answer before interaction.
- No derived practice card shows leftover sibling questions from the same split source task.
- No derived compare-and-contrast card keeps empty tables or obsolete instructions about formulating comparison criteria.
- No learner-facing card repeats the same task instruction in both the source block and the interactive prompt; when deduplication is needed, the interactive prompt keeps the action phrase.
- No learner-facing card repeats the same numbered statement list in both the source block and the interactive options.
- No learner-facing title repeats the same task mechanic already expressed by the interactive prompt.
- Practice metadata retains source order internally.
- Practice is shuffled in the learner UI.
- No learner-facing practice card shows source badges.
- Every generated or inferred element is marked with `*`.
- No non-informative provenance phrasing appears in learner-facing content.
