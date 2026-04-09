"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { BookReader } from "@/components/BookReader";
import {
  getBookSectionsByChapter,
  getBookTargetForStudyCard,
  getBookTargetForSummaryEntry,
  getBookTargetForSupportingCards,
  type BookTarget,
} from "@/lib/book-data";
import {
  getChapter,
  getChapterSummaryByChapter,
  getStudyCardsByChapter,
  getSupportingStudyCardsByPracticeItem,
  type StudyCard,
} from "@/lib/course-data";
import type { PracticeItem } from "@/lib/practice";
import { getPracticeItemsByChapter } from "@/lib/practice";

const PracticeSession = dynamic(
  () => import("@/components/PracticeSession").then((module) => module.PracticeSession),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-[2rem] border border-border bg-card p-8 text-sm leading-7 text-foreground/78 shadow-[0_20px_80px_rgba(59,37,26,0.08)]">
        Загрузка практики...
      </div>
    ),
  }
);

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
  ].filter(Boolean) as { label: string; value: string }[];

  if (facts.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[1rem] border border-border bg-paper px-4 py-4 text-sm leading-7 text-foreground/82">
      {facts.map((fact) => (
        <p key={fact.label}>
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

function StudyCardView({
  index,
  card,
  onOpenBookTarget,
}: {
  index: number;
  card: StudyCard;
  onOpenBookTarget: (target: BookTarget) => void;
}) {
  const target = getBookTargetForStudyCard(card.id);

  return (
    <button
      type="button"
      onClick={() => {
        if (target) {
          onOpenBookTarget(target);
        }
      }}
      className="rounded-[1.6rem] border border-border/90 bg-card p-6 text-left shadow-[0_20px_60px_rgba(59,37,26,0.08)] transition-colors hover:border-accent/40"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-serif text-base font-bold text-accent">
          {index}
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-foreground">{card.title}</h3>
        </div>
      </div>

      <InlineFactSummary
        time={card.time}
        place={card.place}
        participants={card.participants}
      />

      {card.visual ? (
        <figure className="mt-4 overflow-hidden rounded-[1rem] border border-border bg-paper p-4">
          <Image
            src={card.visual.src}
            alt={card.visual.alt}
            width={card.visual.width}
            height={card.visual.height}
            className="w-full rounded-[0.8rem] border border-border/70 object-contain"
          />
          {card.visual.caption ? (
            <figcaption className="mt-3 text-xs leading-6 text-muted">
              {card.visual.caption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      <div className="mt-4 rounded-[1rem] border border-border bg-paper px-4 py-4">
        <DetailParagraph label="Главное" value={card.essence} />
        <DetailParagraph label="Причины" value={card.causes} />
        <DetailParagraph label="Итоги" value={card.results} />
      </div>
    </button>
  );
}

function ChapterSummary({
  entries,
  onOpenBookTarget,
}: {
  entries: ReturnType<typeof getChapterSummaryByChapter>;
  onOpenBookTarget: (target: BookTarget) => void;
}) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <details className="group mb-14 overflow-hidden rounded-[1.8rem] border border-border bg-card shadow-[0_20px_60px_rgba(59,37,26,0.08)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 marker:content-none lg:px-8">
        <div>
          <div className="mb-1 text-xs uppercase tracking-[0.24em] text-muted">
            Обзор главы
          </div>
          <h3 className="font-serif text-2xl font-bold text-foreground">
            Хронологическая канва
          </h3>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted">
          <span>{entries.length} ключевых вех</span>
          <span className="text-xl transition-transform group-open:rotate-45">+</span>
        </div>
      </summary>
      <div className="border-t border-border bg-paper px-6 py-6 lg:px-8">
        <div className="space-y-5">
          {entries.map((entry) => {
            const target = getBookTargetForSummaryEntry(entry.id);

            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => {
                  if (target) {
                    onOpenBookTarget(target);
                  }
                }}
                className="w-full rounded-[1.2rem] border border-border/80 bg-card px-4 py-4 text-left transition-colors hover:border-accent/40"
              >
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {entry.dateLabel}
                </div>
                <h4 className="mb-2 font-serif text-lg font-bold text-foreground">
                  {entry.title}
                </h4>
                <p className="text-sm leading-7 text-foreground/80">{entry.body}</p>
              </button>
            );
          })}
        </div>
      </div>
    </details>
  );
}

export default function ChapterPage() {
  const params = useParams<{ id: string }>();
  const chapterId = Number(params.id);
  const chapter = getChapter(chapterId);

  const bookSections = useMemo(
    () => getBookSectionsByChapter(chapterId),
    [chapterId]
  );
  const initialBookTarget = useMemo(
    () => (bookSections[0] ? { sectionId: bookSections[0].id } : null),
    [bookSections]
  );
  const [readerOpen, setReaderOpen] = useState(false);
  const [activeBookTarget, setActiveBookTarget] = useState<BookTarget | null>(initialBookTarget);

  const openBookTarget = useCallback((target: BookTarget) => {
    setActiveBookTarget(target);
    setReaderOpen(true);
  }, []);

  const toggleReader = useCallback(() => {
    setReaderOpen((prev) => !prev);
    setActiveBookTarget((prev) => prev ?? initialBookTarget);
  }, [initialBookTarget]);

  const handleReaderTargetChange = useCallback((target: BookTarget) => {
    setActiveBookTarget(target);
  }, []);

  const getPracticeBookTarget = useCallback((item: PracticeItem) => {
    const supportingCards = getSupportingStudyCardsByPracticeItem(item.id);
    return getBookTargetForSupportingCards(supportingCards.map((card) => card.id));
  }, []);

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

  const summaryEntries = getChapterSummaryByChapter(chapter.id);
  const studyCards = getStudyCardsByChapter(chapter.id);
  const practiceItems = getPracticeItemsByChapter(chapter.id);

  return (
    <>
      <div
        className={`px-6 py-12 transition-[padding] lg:px-10 lg:py-16 ${
          readerOpen ? "xl:pr-[calc(36rem+2.5rem)]" : ""
        }`}
      >
        <div
          className={`w-full max-w-6xl transition-[margin] ${
            readerOpen ? "xl:ml-0 xl:mr-auto" : "mx-auto"
          }`}
        >
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
            <ChapterSummary entries={summaryEntries} onOpenBookTarget={openBookTarget} />

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
                  {studyCards.length} карточек в хронологическом порядке
                </div>
              </div>
              <div className="grid gap-5 xl:grid-cols-2">
                {studyCards.map((card, index) => (
                  <StudyCardView
                    key={card.id}
                    index={index + 1}
                    card={card}
                    onOpenBookTarget={openBookTarget}
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
                    Практические задания
                  </h3>
                </div>
                <div className="text-sm text-muted">
                  {practiceItems.length} вопросов в случайном порядке
                </div>
              </div>
              <PracticeSession
                key={`chapter-${chapter.id}`}
                items={practiceItems}
                getBookTarget={getPracticeBookTarget}
                onOpenBookTarget={openBookTarget}
              />
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
              Следующие разделы будут наполняться по той же структуре: хронологический обзор,
              опорные карточки по учебнику и тренировка на основе контрольных работ.
            </p>
          </section>
        )}
        </div>
      </div>

      {chapter.status === "ready" ? (
        <BookReader
          open={readerOpen}
          sections={bookSections}
          activeTarget={activeBookTarget}
          onToggle={toggleReader}
          onTargetChange={handleReaderTargetChange}
        />
      ) : null}
    </>
  );
}
