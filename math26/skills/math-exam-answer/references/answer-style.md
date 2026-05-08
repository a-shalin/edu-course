# Answer Style

## Goal

Produce an oral-exam answer that is maximally short, but mathematically complete for the ticket.

## Required Structure

Use this structure unless the user requests another format:

```markdown
## Краткий план
...

## Определения
...

## Теоремы
...

## Доказательства
...

## Финальная устная версия
...
```

For very short tickets, merge sections if that makes the answer clearer, but do not drop definitions, theorem statements, or proofs required by the ticket.

## Writing Rules

- Answer in Russian.
- Use LaTeX for formulas: `\( ... \)` and `\[ ... \]`.
- State hypotheses before conclusions.
- Keep proofs compressed: give the key construction and the key estimate, not every routine algebraic detail.
- Make dependencies explicit: "по критерию Коши", "по теореме Больцано--Вейерштрасса", "по определению замыкания".
- Do not include motivational prose, historical notes, or examples unless they are needed to answer the ticket.
- If the ticket contains several clauses, cover them in the same order unless a different order substantially reduces repetition.

## Completeness Checklist

Before finalizing, verify that the answer includes:

- Every definition named in the ticket.
- Every theorem or criterion named in the ticket.
- Proofs for theorem-level statements unless the ticket explicitly says "без доказательства".
- Connections between related facts, not just isolated definitions.
- Source locations from the textbook PDFs.

## Concision Standard

The final oral version should be something a strong student can say in a few minutes. It may rely on previously stated definitions and should avoid re-proving auxiliary facts unless they are central to the ticket.
