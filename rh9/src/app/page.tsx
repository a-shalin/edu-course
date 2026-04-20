import Link from "next/link";
import {
  chapters,
  getReadyChapterCount,
  getStudyCardsByChapter,
} from "@/lib/course-data";
import { getPracticeItemCount, getPracticeItemsByChapter } from "@/lib/practice";

function ChapterCard({ chapter }: { chapter: (typeof chapters)[number] }) {
  const studyCardCount = getStudyCardsByChapter(chapter.id).length;
  const practiceCount = getPracticeItemsByChapter(chapter.id).length;
  const isReady = chapter.status === "ready";

  return (
    <Link
      href={`/chapter/${chapter.id}`}
      data-testid={`home-chapter-link-${chapter.id}`}
      className="group rounded-[1.8rem] border border-border bg-card p-6 shadow-[0_20px_60px_rgba(59,37,26,0.08)] transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_26px_80px_rgba(122,46,42,0.14)]"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-serif text-xl font-bold text-accent">
          {chapter.id}
        </div>
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
            isReady ? "bg-success-soft text-success" : "bg-paper text-muted"
          }`}
        >
          {isReady ? "Готово" : "Скоро"}
        </span>
      </div>
      <div className="mb-2 text-xs uppercase tracking-[0.22em] text-muted">
        {chapter.label}
      </div>
      <h2 className="mb-3 font-serif text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-accent">
        {chapter.title}
      </h2>
      <p className="mb-5 text-sm leading-7 text-foreground/75">{chapter.summary}</p>
      <div className="mb-5 flex flex-wrap gap-2">
        <span className="rounded-full border border-border bg-paper px-3 py-1 text-xs text-muted">
          {chapter.periodLabel}
        </span>
        <span className="rounded-full border border-border bg-paper px-3 py-1 text-xs text-muted">
          {studyCardCount} опорных карточек
        </span>
        <span className="rounded-full border border-border bg-paper px-3 py-1 text-xs text-muted">
          {practiceCount} вопросов
        </span>
      </div>
      <div className="text-xs uppercase tracking-[0.18em] text-accent">Открыть главу</div>
    </Link>
  );
}

export default function Home() {
  const totalStudyCards = chapters.reduce(
    (sum, chapter) => sum + getStudyCardsByChapter(chapter.id).length,
    0
  );
  const totalPractice = getPracticeItemCount();
  const readyChapters = getReadyChapterCount();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
      <section className="mb-12 grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
        <div className="relative overflow-hidden rounded-[2.2rem] border border-border bg-card px-8 py-10 shadow-[0_24px_90px_rgba(59,37,26,0.12)] lg:px-10 lg:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(199,156,66,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(122,46,42,0.16),transparent_28%)]" />
          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-accent/20 bg-accent/8 px-4 py-2 text-xs uppercase tracking-[0.24em] text-accent">
              Интерактивный курс
            </div>
            <h1 className="mb-4 max-w-3xl font-serif text-4xl font-bold tracking-tight text-foreground lg:text-6xl">
              История России, 9 класс
            </h1>
            <p className="max-w-2xl text-base leading-8 text-foreground/78 lg:text-lg">
              Курс соединяет хронологический обзор главы, опорные карточки по учебнику и
              практические задания по контрольным работам. Первая глава уже собрана как полный
              учебный модуль с обзором, карточками и перемешиваемой практикой.
            </p>
          </div>
        </div>

        <div className="rounded-[2.2rem] border border-border bg-burgundy px-8 py-10 text-white shadow-[0_24px_90px_rgba(92,34,29,0.24)]">
          <div className="mb-6 text-xs uppercase tracking-[0.24em] text-white/70">
            Состояние курса
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="font-serif text-4xl font-bold">{chapters.length}</div>
              <div className="mt-1 text-sm text-white/72">глав</div>
            </div>
            <div>
              <div className="font-serif text-4xl font-bold">{readyChapters}</div>
              <div className="mt-1 text-sm text-white/72">готова</div>
            </div>
            <div>
              <div className="font-serif text-4xl font-bold">{totalStudyCards}</div>
              <div className="mt-1 text-sm text-white/72">карточек</div>
            </div>
            <div>
              <div className="font-serif text-4xl font-bold">{totalPractice}</div>
              <div className="mt-1 text-sm text-white/72">вопросов</div>
            </div>
          </div>
          <div className="mt-8 rounded-[1.5rem] border border-white/12 bg-white/8 p-5 text-sm leading-7 text-white/78">
            Для каждой готовой главы курс хранит хронологическую канву, фактические опорные
            карточки и практику, построенную из исходных заданий.
          </div>
        </div>
      </section>

      <section className="mb-14">
        <div className="mb-6">
          <div className="mb-2 text-xs uppercase tracking-[0.24em] text-muted">Структура</div>
          <h2 className="font-serif text-3xl font-bold text-foreground">Главы курса</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.8rem] border border-border bg-card p-7 shadow-[0_20px_60px_rgba(59,37,26,0.08)]">
          <div className="mb-3 text-xs uppercase tracking-[0.24em] text-muted">Как устроен курс</div>
          <h3 className="mb-4 font-serif text-2xl font-bold text-foreground">Глава как модуль</h3>
          <p className="text-sm leading-7 text-foreground/78">
            Каждая готовая глава начинается со скрытого по умолчанию обзора по датам, затем идут
            опорные карточки в хронологическом порядке, а после них — практические вопросы,
            построенные по заданиям контрольной работы.
          </p>
        </div>

        <div className="rounded-[1.8rem] border border-border bg-card p-7 shadow-[0_20px_60px_rgba(59,37,26,0.08)]">
          <h3 className="mb-4 font-serif text-2xl font-bold text-foreground">Повторение структуры</h3>
          <p className="text-sm leading-7 text-foreground/78">
            Следующие главы будут собираться по той же схеме: полный набор практических заданий,
            опорные карточки с фактами для ответа и общий обзор главы, чтобы сохранялась единая
            логика изучения материала.
          </p>
        </div>
      </section>
    </div>
  );
}
