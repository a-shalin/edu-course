"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import type {
  GuidedSubtask,
  MarkedText,
  PracticeBlock,
  PracticeItem,
  PracticePart,
} from "@/lib/practice";

type PartResponse = {
  selected?: string;
  selectedMany?: string[];
  submitted?: boolean;
  revealed?: boolean;
};

function MarkedInline({ value }: { value: MarkedText }) {
  return (
    <>
      {value.text}
      {value.generated ? (
        <sup className="ml-0.5 text-[0.7em] font-semibold text-accent">*</sup>
      ) : null}
    </>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current + 1) / total) * 100;

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted">
        <span>
          Карточка {current + 1} из {total}
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-border">
        <div
          className="h-1.5 rounded-full bg-accent transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function SourceBlock({ block }: { block: PracticeBlock }) {
  if (block.type === "heading") {
    const headingClass =
      block.level === 3
        ? "font-serif text-2xl font-bold text-foreground"
        : "text-sm font-bold uppercase tracking-[0.16em] text-foreground";

    return (
      <div className={headingClass}>
        <MarkedInline value={block.text} />
      </div>
    );
  }

  if (block.type === "paragraph") {
    return (
      <p className="text-sm leading-7 text-foreground/82">
        <MarkedInline value={block.text} />
      </p>
    );
  }

  if (block.type === "list") {
    const ListTag = block.ordered ? "ol" : "ul";

    return (
      <div>
        {block.title ? (
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">
            <MarkedInline value={block.title} />
          </div>
        ) : null}
        <ListTag className="space-y-2 rounded-[1.2rem] border border-border/80 bg-paper px-5 py-4 text-sm leading-7 text-foreground/82">
          {block.items.map((item, index) => (
            <li key={`${item.text}-${index}`} className="list-none">
              <MarkedInline value={item} />
            </li>
          ))}
        </ListTag>
      </div>
    );
  }

  if (block.type === "table") {
    return (
      <div className="overflow-hidden rounded-[1.2rem] border border-border/90 bg-card">
        {block.title ? (
          <div className="border-b border-border bg-paper px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-muted">
            <MarkedInline value={block.title} />
          </div>
        ) : null}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            {block.headers ? (
              <thead>
                <tr>
                  {block.headers.map((header, index) => (
                    <th
                      key={`${header.text}-${index}`}
                      className="border-b border-border bg-paper px-4 py-3 text-left font-semibold text-foreground"
                    >
                      <MarkedInline value={header} />
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="align-top">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      className="border-b border-border/70 px-4 py-3 text-foreground/82 last:border-r-0"
                    >
                      {cell.text.trim() ? (
                        <MarkedInline value={cell} />
                      ) : (
                        <span className="text-muted">&mdash;</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (block.type === "image") {
    return (
      <figure className="overflow-hidden rounded-[1.2rem] border border-border/90 bg-paper p-4">
        <Image
          src={block.src}
          alt={block.alt}
          width={block.width ?? 1200}
          height={block.height ?? 900}
          className="w-full rounded-[0.9rem] border border-border/60 object-contain"
        />
        {block.caption ? (
          <figcaption className="mt-3 text-xs leading-6 text-muted">
            <MarkedInline value={block.caption} />
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (block.type === "answerInstruction") {
    return (
      <div className="rounded-[1rem] border border-dashed border-border px-4 py-3 text-xs font-medium uppercase tracking-[0.16em] text-muted">
        <MarkedInline value={block.text} />
      </div>
    );
  }

  return (
    <div className="rounded-[1rem] bg-paper px-4 py-3 text-sm leading-7 text-foreground/78">
      <MarkedInline value={block.text} />
    </div>
  );
}

function OptionButton({
  label,
  active,
  correct,
  wrong,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  correct: boolean;
  wrong: boolean;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  let borderClass = "border-border hover:border-accent-soft";
  let bgClass = "bg-card";

  if (correct) {
    borderClass = "border-success";
    bgClass = "bg-success-soft";
  } else if (wrong) {
    borderClass = "border-danger";
    bgClass = "bg-danger-soft";
  } else if (active) {
    borderClass = "border-accent";
    bgClass = "bg-accent/5";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-[1.2rem] border ${borderClass} ${bgClass} p-4 text-left transition-colors disabled:cursor-default`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
            correct
              ? "border-success bg-success text-white"
              : wrong
                ? "border-danger bg-danger text-white"
                : active
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-border text-muted"
          }`}
        >
          {label}
        </div>
        <div className="pt-0.5 text-sm leading-7 text-foreground">{children}</div>
      </div>
    </button>
  );
}

function ExplanationCard({
  tone,
  title,
  body,
}: {
  tone: "success" | "danger" | "neutral";
  title: string;
  body: MarkedText;
}) {
  const toneClasses =
    tone === "success"
      ? "border-l-success bg-success-soft text-success"
      : tone === "danger"
        ? "border-l-danger bg-danger-soft text-danger"
        : "border-l-accent bg-paper text-accent";

  return (
    <div className={`rounded-[1.2rem] border-l-4 p-4 ${toneClasses}`}>
      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
        {title}
      </div>
      <div className="text-sm leading-7 text-foreground">
        <MarkedInline value={body} />
      </div>
    </div>
  );
}

function isCorrectMultiSelect(part: Extract<PracticePart, { interaction: "multi_select_exact_n" }>, response?: PartResponse) {
  if (!response?.submitted || !response.selectedMany) {
    return false;
  }

  const actual = [...response.selectedMany].sort();
  const expected = [...part.correctAnswers].sort();

  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function SingleChoicePart({
  part,
  response,
  onSelect,
}: {
  part: Extract<PracticePart, { interaction: "single_choice" }>;
  response?: PartResponse;
  onSelect: (label: string) => void;
}) {
  const answered = Boolean(response?.selected);
  const selected = response?.selected;
  const isCorrect = selected === part.correctAnswer;

  return (
    <div className="space-y-4 rounded-[1.4rem] border border-border/90 bg-card px-5 py-5 shadow-[0_10px_30px_rgba(59,37,26,0.06)]">
      {part.title ? (
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          <MarkedInline value={part.title} />
        </div>
      ) : null}
      {part.prompt ? (
        <div className="text-sm leading-7 text-foreground">
          <MarkedInline value={part.prompt} />
        </div>
      ) : null}
      <div className="space-y-3">
        {part.options.map((option) => (
          <OptionButton
            key={option.label}
            label={option.label}
            active={selected === option.label}
            correct={answered && option.label === part.correctAnswer}
            wrong={answered && selected === option.label && option.label !== part.correctAnswer}
            disabled={answered}
            onClick={() => onSelect(option.label)}
          >
            <MarkedInline value={option.text} />
          </OptionButton>
        ))}
      </div>
      {answered ? (
        <div className="space-y-3">
          <ExplanationCard
            tone={isCorrect ? "success" : "danger"}
            title={isCorrect ? "Верно" : `Неверно — правильный ответ: ${part.correctAnswer}`}
            body={part.explanation}
          />
          {part.distractorExplanations ? (
            <div className="space-y-2">
              {Object.entries(part.distractorExplanations).map(([label, text]) => (
                <div key={label} className="rounded-[1rem] bg-paper px-4 py-3 text-sm leading-7 text-foreground/82">
                  <span className="mr-1 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                    Вариант {label}:
                  </span>
                  <MarkedInline value={text} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function MultiSelectPart({
  part,
  response,
  onToggle,
  onSubmit,
}: {
  part: Extract<PracticePart, { interaction: "multi_select_exact_n" }>;
  response?: PartResponse;
  onToggle: (label: string) => void;
  onSubmit: () => void;
}) {
  const selected = response?.selectedMany ?? [];
  const submitted = Boolean(response?.submitted);
  const correct = isCorrectMultiSelect(part, response);

  return (
    <div className="space-y-4 rounded-[1.4rem] border border-border/90 bg-card px-5 py-5 shadow-[0_10px_30px_rgba(59,37,26,0.06)]">
      {part.title ? (
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          <MarkedInline value={part.title} />
        </div>
      ) : null}
      {part.prompt ? (
        <div className="text-sm leading-7 text-foreground">
          <MarkedInline value={part.prompt} />
        </div>
      ) : null}
      <div className="rounded-[1rem] bg-paper px-4 py-3 text-xs uppercase tracking-[0.16em] text-muted">
        Нужно выбрать ровно {part.exactSelectionCount}
      </div>
      <div className="space-y-3">
        {part.options.map((option) => {
          const isSelected = selected.includes(option.label);
          const isActuallyCorrect = part.correctAnswers.includes(option.label);
          const correctState = submitted && isActuallyCorrect;
          const wrongState = submitted && isSelected && !isActuallyCorrect;

          return (
            <OptionButton
              key={option.label}
              label={option.label}
              active={isSelected}
              correct={correctState}
              wrong={wrongState}
              disabled={submitted}
              onClick={() => onToggle(option.label)}
            >
              <MarkedInline value={option.text} />
            </OptionButton>
          );
        })}
      </div>
      {!submitted ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={selected.length !== part.exactSelectionCount}
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-soft disabled:cursor-not-allowed disabled:bg-border"
        >
          Проверить
        </button>
      ) : (
        <div className="space-y-3">
          <ExplanationCard
            tone={correct ? "success" : "danger"}
            title={correct ? "Верно" : "Нужно было выбрать другой набор пунктов"}
            body={part.explanation}
          />
          {part.optionExplanations ? (
            <div className="space-y-2">
              {Object.entries(part.optionExplanations).map(([label, text]) => (
                <div key={label} className="rounded-[1rem] bg-paper px-4 py-3 text-sm leading-7 text-foreground/82">
                  <span className="mr-1 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                    Пункт {label}:
                  </span>
                  <MarkedInline value={text} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function GuidedSubtaskCard({ subtask }: { subtask: GuidedSubtask }) {
  return (
    <div className="rounded-[1.2rem] border border-border/90 bg-paper px-4 py-4">
      {subtask.title ? (
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          <MarkedInline value={subtask.title} />
        </div>
      ) : null}
      <div className="mb-3 text-sm leading-7 text-foreground">
        <MarkedInline value={subtask.prompt} />
      </div>
      <div className="rounded-[1rem] border border-accent/20 bg-card px-4 py-3 text-sm leading-7 text-foreground">
        <span className="mr-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
          Ориентир:
        </span>
        <MarkedInline value={subtask.answer} />
      </div>
      {subtask.explanation ? (
        <div className="mt-3 text-sm leading-7 text-foreground/82">
          <MarkedInline value={subtask.explanation} />
        </div>
      ) : null}
    </div>
  );
}

function GuidedSubtasksPart({
  part,
  revealed,
  onReveal,
}: {
  part: Extract<PracticePart, { interaction: "guided_subtasks" }>;
  revealed: boolean;
  onReveal: () => void;
}) {
  return (
    <div className="space-y-4 rounded-[1.4rem] border border-border/90 bg-card px-5 py-5 shadow-[0_10px_30px_rgba(59,37,26,0.06)]">
      {part.title ? (
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          <MarkedInline value={part.title} />
        </div>
      ) : null}
      {part.prompt ? (
        <div className="text-sm leading-7 text-foreground">
          <MarkedInline value={part.prompt} />
        </div>
      ) : null}
      {!revealed ? (
        <button
          type="button"
          onClick={onReveal}
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-soft"
        >
          Показать ориентир
        </button>
      ) : (
        <>
          <div className="space-y-3">
            {part.subtasks.map((subtask) => (
              <GuidedSubtaskCard key={subtask.id} subtask={subtask} />
            ))}
          </div>
          {part.explanation ? (
            <ExplanationCard tone="neutral" title="Почему так" body={part.explanation} />
          ) : null}
        </>
      )}
    </div>
  );
}

function RevealAnswerPart({
  part,
  revealed,
  onReveal,
}: {
  part: Extract<PracticePart, { interaction: "reveal_answer" }>;
  revealed: boolean;
  onReveal: () => void;
}) {
  return (
    <div className="space-y-4 rounded-[1.4rem] border border-border/90 bg-card px-5 py-5 shadow-[0_10px_30px_rgba(59,37,26,0.06)]">
      {part.title ? (
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          <MarkedInline value={part.title} />
        </div>
      ) : null}
      {part.prompt ? (
        <div className="text-sm leading-7 text-foreground">
          <MarkedInline value={part.prompt} />
        </div>
      ) : null}
      {!revealed ? (
        <button
          type="button"
          onClick={onReveal}
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-soft"
        >
          Показать ответ
        </button>
      ) : (
        <div className="space-y-3">
          <ExplanationCard tone="neutral" title="Ответ" body={part.answer} />
          {part.explanation ? (
            <div className="rounded-[1rem] bg-paper px-4 py-3 text-sm leading-7 text-foreground/82">
              <MarkedInline value={part.explanation} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function isPartCompleted(part: PracticePart, response?: PartResponse): boolean {
  if (part.interaction === "single_choice") {
    return Boolean(response?.selected);
  }

  if (part.interaction === "multi_select_exact_n") {
    return Boolean(response?.submitted);
  }

  return Boolean(response?.revealed);
}

function getScorableParts(items: PracticeItem[]) {
  return items.flatMap((item) =>
    item.parts.filter(
      (part): part is Extract<PracticePart, { interaction: "single_choice" | "multi_select_exact_n" }> =>
        part.interaction === "single_choice" || part.interaction === "multi_select_exact_n"
    )
  );
}

function ScoreScreen({
  items,
  responses,
  onRestart,
}: {
  items: PracticeItem[];
  responses: Record<string, PartResponse>;
  onRestart: () => void;
}) {
  const scorableParts = useMemo(() => getScorableParts(items), [items]);
  const correct = scorableParts.filter((part) => {
    const response = responses[part.id];

    if (part.interaction === "single_choice") {
      return response?.selected === part.correctAnswer;
    }

    return isCorrectMultiSelect(part, response);
  }).length;

  const total = scorableParts.length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="rounded-[2rem] border border-border bg-card p-10 text-center shadow-[0_20px_80px_rgba(59,37,26,0.08)]">
      <div className="mb-10">
        <div className="mb-2 font-serif text-6xl font-bold text-foreground">{pct}%</div>
        <div className="text-lg text-muted">
          {correct} из {total} проверяемых ответов верны
        </div>
        <div className="mt-3 text-sm text-foreground/72">
          В этой итерации практикум сочетает проверяемые задания, задания с показом ответа и ориентиры для сложных сравнительных вопросов.
        </div>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-soft"
      >
        Пройти ещё раз
      </button>
    </div>
  );
}

export function PracticeSession({ items }: { items: PracticeItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, PartResponse>>({});
  const [finished, setFinished] = useState(false);

  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-border bg-card p-8 text-center text-sm leading-7 text-foreground/78">
        Практические карточки для этой главы пока не подготовлены.
      </div>
    );
  }

  const currentItem = items[currentIndex];
  const canContinue = currentItem.parts.every((part) => isPartCompleted(part, responses[part.id]));

  const updateResponse = (partId: string, patch: Partial<PartResponse>) => {
    setResponses((prev) => ({
      ...prev,
      [partId]: {
        ...prev[partId],
        ...patch,
      },
    }));
  };

  const handleNext = () => {
    if (currentIndex + 1 >= items.length) {
      setFinished(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
  };

  const handleRestart = () => {
    setResponses({});
    setCurrentIndex(0);
    setFinished(false);
  };

  if (finished) {
    return <ScoreScreen items={items} responses={responses} onRestart={handleRestart} />;
  }

  return (
    <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_20px_80px_rgba(59,37,26,0.08)] lg:p-8">
      <ProgressBar current={currentIndex} total={items.length} />

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 text-xs uppercase tracking-[0.18em] text-muted">{currentItem.sourceLabel}</div>
          <h4 className="font-serif text-2xl font-bold leading-tight text-foreground">
            {currentItem.title}
          </h4>
        </div>
      </div>

      <div className="space-y-4">
        {currentItem.blocks.map((block, index) => (
          <SourceBlock key={`${currentItem.id}-block-${index}`} block={block} />
        ))}
      </div>

      <div className="mt-6 space-y-5">
        {currentItem.parts.map((part) => {
          const response = responses[part.id];

          if (part.interaction === "single_choice") {
            return (
              <SingleChoicePart
                key={part.id}
                part={part}
                response={response}
                onSelect={(label) => updateResponse(part.id, { selected: label })}
              />
            );
          }

          if (part.interaction === "multi_select_exact_n") {
            return (
              <MultiSelectPart
                key={part.id}
                part={part}
                response={response}
                onToggle={(label) => {
                  const selectedMany = response?.selectedMany ?? [];
                  const exists = selectedMany.includes(label);
                  const next = exists
                    ? selectedMany.filter((item) => item !== label)
                    : selectedMany.length >= part.exactSelectionCount
                      ? selectedMany
                      : [...selectedMany, label];

                  updateResponse(part.id, { selectedMany: next });
                }}
                onSubmit={() => updateResponse(part.id, { submitted: true })}
              />
            );
          }

          if (part.interaction === "guided_subtasks") {
            return (
              <GuidedSubtasksPart
                key={part.id}
                part={part}
                revealed={Boolean(response?.revealed)}
                onReveal={() => updateResponse(part.id, { revealed: true })}
              />
            );
          }

          return (
            <RevealAnswerPart
              key={part.id}
              part={part}
              revealed={Boolean(response?.revealed)}
              onReveal={() => updateResponse(part.id, { revealed: true })}
            />
          );
        })}
      </div>

      {canContinue ? (
        <button
          type="button"
          onClick={handleNext}
          className="mt-8 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-soft"
        >
          {currentIndex + 1 >= items.length ? "Посмотреть результат" : "Следующая карточка"}
        </button>
      ) : null}
    </div>
  );
}
