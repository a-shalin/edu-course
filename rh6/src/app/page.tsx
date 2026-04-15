import Link from "next/link";
import {
  COURSE_BADGE,
  COURSE_TITLE,
  TEXTBOOK_ROOT_PATH,
} from "@/lib/course-config";
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
  const hasChapters = chapters.length > 0;
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
              {COURSE_BADGE}
            </div>
            <h1 className="mb-4 max-w-3xl font-serif text-4xl font-bold tracking-tight text-foreground lg:text-6xl">
              {COURSE_TITLE}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-foreground/78 lg:text-lg">
              Курс собран по структуре RH9: каждая глава даёт хронологическую канву,
              опорные карточки по учебнику и задания из контрольной работы, которые можно
              решать с переходом к связанному месту в тексте.
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
              <div className="mt-1 text-sm text-white/72">готово</div>
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
            Учебник открыт в ридере по главам, а практика опирается только на те задания,
            которые напрямую закрываются карточками курса и не оставляют пробелов.
          </div>
        </div>
      </section>

      {hasChapters ? (
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
      ) : (
        <section
          data-testid="home-empty-state"
          className="mb-14 rounded-[2rem] border border-dashed border-border bg-card p-8 shadow-[0_20px_80px_rgba(59,37,26,0.08)] lg:p-10"
        >
          <div className="mb-3 text-xs uppercase tracking-[0.24em] text-muted">Пустой каркас</div>
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
            Учебник для RH6 пока не импортирован
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-foreground/78">
            Добавьте новый источник в файловую структуру курса, а затем можно будет наполнять
            главы по той же схеме, что и в RH9.
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-[1.4rem] border border-border bg-paper p-5">
              <div className="mb-2 text-xs uppercase tracking-[0.18em] text-muted">
                Учебник
              </div>
              <div className="font-mono text-sm text-foreground">
                {TEXTBOOK_ROOT_PATH}/books/russian-history/part-1
              </div>
            </div>
            <div className="rounded-[1.4rem] border border-border bg-paper p-5">
              <div className="mb-2 text-xs uppercase tracking-[0.18em] text-muted">
                Продолжение учебника
              </div>
              <div className="font-mono text-sm text-foreground">
                {TEXTBOOK_ROOT_PATH}/books/russian-history/part-2
              </div>
            </div>
            <div className="rounded-[1.4rem] border border-border bg-paper p-5">
              <div className="mb-2 text-xs uppercase tracking-[0.18em] text-muted">
                Контрольные работы
              </div>
              <div className="font-mono text-sm text-foreground">
                {TEXTBOOK_ROOT_PATH}/books/russian-history/control-work
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.8rem] border border-border bg-card p-7 shadow-[0_20px_60px_rgba(59,37,26,0.08)]">
          <div className="mb-3 text-xs uppercase tracking-[0.24em] text-muted">
            Что будет дальше
          </div>
          <h3 className="mb-4 font-serif text-2xl font-bold text-foreground">
            Глава как модуль
          </h3>
          <p className="text-sm leading-7 text-foreground/78">
            В каждой главе сначала скрытый обзор по датам, затем карточки в
            хронологическом порядке, а после них — подборка заданий, привязанных к этим
            карточкам и к конкретным местам учебника.
          </p>
        </div>

        <div className="rounded-[1.8rem] border border-border bg-card p-7 shadow-[0_20px_60px_rgba(59,37,26,0.08)]">
          <div className="mb-3 text-xs uppercase tracking-[0.24em] text-muted">
            Как устроена практика
          </div>
          <h3 className="mb-4 font-serif text-2xl font-bold text-foreground">
            Только связанные задания
          </h3>
          <p className="text-sm leading-7 text-foreground/78">
            Вопросы из контрольной работы отобраны не полностью: в курс попали только те,
            которые опираются на главные события главы и отвечаются по одной-трём карточкам
            без догадок.
          </p>
        </div>
      </section>
    </div>
  );
}
