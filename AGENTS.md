# AGENTS

Use `.codex/skills/russian-history-control-work-transform/SKILL.md` for any conversion of files under `books/russian-history-9/books/russian-history/control-work` into course practice cards.

Mandatory rules:
- Answer user-facing assistant messages in English only unless the user explicitly asks for another language.
- Preserve all source content between question `N.` and question `N+1.` before adding interaction.
- Do not flatten structured prompts into paraphrased one-line questions.
- Keep source headers, answer instructions, tables, images, maps, and schemes.
- Mark every generated or inferred element with `*`.
- If a safe bounded MCQ cannot be formed, keep the source structure and use reveal-answer mode instead of guessing.
- Do not add non-informative provenance phrases such as `Оригинальная карта`, `Оригинальная карта из контрольной работы`, or similar labels that describe where content came from rather than what it teaches.
- Generated headings, captions, notes, and prompts must focus on the historical content and task meaning, not on extraction history or source provenance.
- Before adding or transforming a practice question, make sure it is answerable from `1-3` textbook cards in the same chapter.
- Textbook cards must contain the factual support needed for the linked questions: time, place, participants, and essence are the default minimum; add causes and results when they are needed for the question.
- If a question depends on names, dates, places, institutions, or other facts that are missing from the current textbook cards, enrich the cards first and only then add or transform the question.
- Source answer instructions should be preserved unless they are duplicated verbatim by the interactive control label or prompt; in that case, show the instruction only once.
- Visible textbook-card structure: first block combines `Время`, `Место`, and `Участники` into short text lines with labels; second block contains paragraph sections `Главное`, then optional `Причины`, `Итоги`.
