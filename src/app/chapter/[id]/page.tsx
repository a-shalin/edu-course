"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PracticeSession } from "@/components/PracticeSession";
import { getChapter, getExcerptsByChapter } from "@/lib/course-data";
import { getPracticeItemsByChapter } from "@/lib/practice";

function InlineFactSummary({
  time,
  place,
  participants,
}: {
  time?: string;
  place?: string;
  participants?: string[];
}) {
  const facts = [
    time ? { label: "Время", value: time } : null,
    place ? { label: "Место", value: place } : null,
    participants && participants.length > 0
      ? { label: "Участники", value: participants.join(", ") }
      : null,
  ].filter(Boolean);

  if (facts.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[1rem] border border-border bg-paper px-4 py-4 text-sm leading-7 text-foreground/82">
      {facts.map((fact, index) => (
        <p key={index}>
          <span className="font-semibold text-foreground">{fact.label}:</span>{" "}
          {fact.value}
        </p>
      ))}
    </div>
  );
}

function DetailParagraph({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  if (!value) {
    return null;
  }

  return (
    <div>
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
        {label}
      </div>
      <p className="text-sm leading-7 text-foreground/82">{value}</p>
    </div>
  );
}

function ExcerptCard({
  index,
  title,
  time,
  place,
  participants,
  essence,
  causes,
  results,
}: {
  index: number;
  title: string;
  time?: string;
  place?: string;
  participants?: string[];
  essence: string;
  causes?: string;
  results?: string;
}) {
  return (
    <article className="rounded-[1.6rem] border border-border/90 bg-card p-6 shadow-[0_20px_60px_rgba(59,37,26,0.08)]">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-serif text-base font-bold text-accent">
          {index}
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-foreground">
            {title}
          </h3>
        </div>
      </div>

      <InlineFactSummary
        time={time}
        place={place}
        participants={participants}
      />

      <div className="mt-4 rounded-[1rem] border border-border bg-paper px-4 py-4">
        <DetailParagraph label="Главное" value={essence} />
        <DetailParagraph label="Причины" value={causes} />
        <DetailParagraph label="Итоги" value={results} />
      </div>
    </article>
  );
}

export default function ChapterPage() {
  const params = useParams<{ id: string }>();
  const chapterId = Number(params.id);
  const chapter = getChapter(chapterId);

  if (!chapter) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-10">
        <h1 className="mb-4 font-serif text-3xl font-bold text-foreground">
          Глава не найдена
        </h1>
        <Link href="/" className="text-sm font-medium text-accent hover:text-accent-soft">
          Вернуться к курсу
        </Link>
      </div>
    );
  }

  const excerpts = getExcerptsByChapter(chapter.id);
  const practiceItems = getPracticeItemsByChapter(chapter.id);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted hover:text-foreground"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M8.5 3.5L5 7l3.5 3.5" />
          </svg>
          Все главы
        </Link>
      </div>

      <section className="mb-10 rounded-[2rem] border border-border bg-card p-8 shadow-[0_20px_80px_rgba(59,37,26,0.1)] lg:p-10">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-2 text-xs uppercase tracking-[0.24em] text-muted">
              {chapter.label}
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
              {chapter.title}
            </h2>
          </div>
          <div className="rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {chapter.periodLabel}
          </div>
        </div>
        <p className="max-w-3xl text-base leading-8 text-foreground/80">
          {chapter.summary}
        </p>
      </section>

      {chapter.status === "ready" ? (
        <>
          <section className="mb-14">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.24em] text-muted">
                  Темы
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  Опорные карточки
                </h3>
              </div>
              <div className="text-sm text-muted">
                {excerpts.length} карточек для повторения
              </div>
            </div>
            <div className="grid gap-5 xl:grid-cols-2">
              {excerpts.map((excerpt, index) => (
                <ExcerptCard
                  key={excerpt.id}
                  index={index + 1}
                  title={excerpt.title}
                  time={excerpt.time}
                  place={excerpt.place}
                  participants={excerpt.participants}
                  essence={excerpt.essence}
                  causes={excerpt.causes}
                  results={excerpt.results}
                />
              ))}
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.24em] text-muted">
                  Практика
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  Практические карточки
                </h3>
              </div>
              <div className="text-sm text-muted">
                {practiceItems.length} карточек по материалам контрольной работы
              </div>
            </div>
            <PracticeSession items={practiceItems} />
          </section>
        </>
      ) : (
        <section className="rounded-[2rem] border border-dashed border-border bg-card p-10 text-center shadow-[0_20px_80px_rgba(59,37,26,0.08)]">
          <div className="mb-3 text-xs uppercase tracking-[0.24em] text-muted">
            В работе
          </div>
          <h3 className="mb-3 font-serif text-2xl font-bold text-foreground">
            Материалы для этой главы ещё собираются
          </h3>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-foreground/78">
            Для первой итерации курс полностью запущен только по первой главе.
            Следующие разделы будут наполняться по той же структуре: краткие
            конспекты, вопросы из контрольных работ и пояснения к ответам.
          </p>
        </section>
      )}
    </div>
  );
}
