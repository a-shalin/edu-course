# AGENTS

Use `.codex/skills/russian-history-chapter-conversion/SKILL.md` for full chapter conversions in this repository.

Use `.codex/skills/russian-history-6-chapter-conversion/SKILL.md` for full RH6 chapter conversions in this repository.

Use `.codex/skills/russian-history-control-work-transform/SKILL.md` for isolated conversion of files under `rh9/books/russian-history-9/books/russian-history/control-work` into course practice cards.

Mandatory rules:
- Answer user-facing assistant messages in English only unless the user explicitly asks for another language.
- Preserve all source content between question `N.` and question `N+1.` before adding interaction.
- Do not flatten structured prompts into paraphrased one-line questions.
- Keep source headers, answer instructions, tables, images, maps, and schemes.
- Mark every generated or inferred element with `*`.
- Do not add non-informative provenance phrases such as `Оригинальная карта`, `Оригинальная карта из контрольной работы`, or similar labels that describe where content came from rather than what it teaches.
- Generated headings, captions, notes, and prompts must focus on the historical content and task meaning, not on extraction history or source provenance.
- Before adding or transforming a practice question, make sure it is answerable from `1-3` textbook cards in the same chapter.
- Textbook cards must contain the factual support needed for the linked questions: time, place, participants, and essence are the default minimum; add causes and results when they are needed for the question.
- If a question depends on names, dates, places, institutions, or other facts that are missing from the current textbook cards, enrich the cards first and only then add or transform the question.
- Source answer instructions should be preserved unless they are duplicated verbatim by the interactive control label or prompt; in that case, show the instruction only once.
- Visible textbook-card structure: first block combines `Время`, `Место`, and `Участники` into short text lines with labels; second block contains paragraph sections `Главное`, then optional `Причины`, `Итоги`.
- For chapter rebuilds, convert each numbered short-answer exercise into one practice item.
- For long-answer exercises, split them into atomic bounded practice items when needed; if a fragment cannot be converted safely, stop and ask the user instead of guessing or silently dropping it.
- Keep source metadata in data for authoring, but do not show control-work numbers, variants, or fragment keys in the learner-facing practice UI.
- Learner-facing practice order should be shuffled per session and reshuffled on restart.
- Each ready chapter should begin with a chronological summary hidden by default and opened on click.
- Support cards must be shown in chronological order.
- After changes that affect app behavior or validation, run `npm run lint` and then `npm run e2e`.
