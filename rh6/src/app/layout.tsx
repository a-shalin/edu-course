"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";
import {
  COURSE_CLASS_LABEL,
  COURSE_DESCRIPTION,
  COURSE_MONOGRAM,
  COURSE_SHORT_TITLE,
  COURSE_TITLE,
} from "@/lib/course-config";
import { chapters, getReadyChapterCount, studyCards } from "@/lib/course-data";
import {
  getPracticeItemCount,
  getPracticeItemsByChapter,
  getScorablePracticeItemCount,
} from "@/lib/practice";
import {
  PRACTICE_PROGRESS_CHANGED_EVENT,
  readSolvedPracticeItemIds,
} from "@/lib/practice-progress";

function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const chapterPracticeMeta = useMemo(
    () =>
      chapters.map((chapter) => {
        const items = getPracticeItemsByChapter(chapter.id);
        return {
          chapterId: chapter.id,
          totalCount: getScorablePracticeItemCount(items),
          validItemIds: new Set(items.map((item) => item.id)),
        };
      }),
    []
  );
  const emptyProgressSnapshot = useMemo(
    () =>
      JSON.stringify(
        Object.fromEntries(chapterPracticeMeta.map(({ chapterId }) => [chapterId, 0]))
      ),
    [chapterPracticeMeta]
  );

  const getServerSnapshot = useCallback(
    () => emptyProgressSnapshot,
    [emptyProgressSnapshot]
  );

  const getSnapshot = useCallback(
    () =>
      JSON.stringify(
        Object.fromEntries(
          chapterPracticeMeta.map(({ chapterId, validItemIds }) => {
            const solvedCount = readSolvedPracticeItemIds(chapterId).filter((itemId) =>
              validItemIds.has(itemId)
            ).length;
            return [chapterId, solvedCount];
          })
        )
      ),
    [chapterPracticeMeta]
  );

  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener(PRACTICE_PROGRESS_CHANGED_EVENT, onStoreChange);

    return () => {
      window.removeEventListener(PRACTICE_PROGRESS_CHANGED_EVENT, onStoreChange);
    };
  }, []);

  const progressSnapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const solvedCountsByChapter = useMemo(
    () => JSON.parse(progressSnapshot) as Record<number, number>,
    [progressSnapshot]
  );

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/20 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-80 border-r border-border bg-card transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <Link href="/" className="border-b border-border px-6 py-6" onClick={onClose}>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/20 bg-accent/10 font-serif text-lg font-bold text-accent">
                {COURSE_MONOGRAM}
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-foreground">
                  {COURSE_SHORT_TITLE}
                </div>
                <div className="text-xs uppercase tracking-[0.22em] text-muted">
                  Интерактивный курс
                </div>
              </div>
            </div>
          </Link>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="mb-2 px-3 text-xs font-medium uppercase tracking-[0.22em] text-muted">
              Главы
            </div>
            {chapters.length === 0 ? (
              <div
                data-testid="sidebar-empty-chapters"
                className="mx-3 rounded-[1.2rem] border border-dashed border-border bg-paper px-4 py-4 text-sm leading-7 text-foreground/78"
              >
                Главы появятся после загрузки нового учебника и разметки первой структуры курса.
              </div>
            ) : (
              chapters.map((chapter) => {
                const isActive = pathname === `/chapter/${chapter.id}`;
                const chapterProgress =
                  chapterPracticeMeta.find(({ chapterId }) => chapterId === chapter.id) ?? null;
                const solvedCount = solvedCountsByChapter[chapter.id] ?? 0;
                const totalCount = chapterProgress?.totalCount ?? 0;
                return (
                  <Link
                    key={chapter.id}
                    href={`/chapter/${chapter.id}`}
                    data-testid={`sidebar-chapter-link-${chapter.id}`}
                    onClick={onClose}
                    className={`mb-1 block rounded-[1.2rem] px-4 py-3 text-sm transition-colors ${
                      isActive ? "bg-burgundy text-white" : "text-foreground hover:bg-paper"
                    }`}
                  >
                    <div className="mb-1 flex items-start justify-between gap-3 text-[11px] uppercase tracking-[0.22em] opacity-70">
                      <span>{chapter.label}</span>
                      <span className="shrink-0">
                        {totalCount > 0 ? `${solvedCount}/${totalCount}` : "0/0"}
                      </span>
                    </div>
                    <div className="line-clamp-2 leading-snug">{chapter.title}</div>
                    <div className="mt-2 text-xs opacity-70">{chapter.periodLabel}</div>
                  </Link>
                );
              })
            )}

            <div className="mt-8 mb-2 px-3 text-xs font-medium uppercase tracking-[0.22em] text-muted">
              Текущее наполнение
            </div>
            <div className="space-y-2 px-3 text-xs text-muted">
              <div className="flex justify-between">
                <span>Готовые главы</span>
                <span className="text-foreground">{getReadyChapterCount()}</span>
              </div>
              <div className="flex justify-between">
                <span>Карточки</span>
                <span className="text-foreground">{studyCards.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Практика</span>
                <span className="text-foreground">{getPracticeItemCount()}</span>
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="ru">
      <head>
        <title>{COURSE_TITLE}</title>
        <meta name="description" content={COURSE_DESCRIPTION} />
      </head>
      <body className="antialiased">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="lg:pl-80">
          <header className="sticky top-0 z-20 flex h-16 items-center border-b border-border bg-background/90 px-4 backdrop-blur-sm lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-full p-2 text-muted hover:bg-paper hover:text-foreground"
              aria-label="Open sidebar"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 5h14M3 10h14M3 15h14" />
              </svg>
            </button>
            <div className="ml-3 flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-accent/10 font-serif text-sm font-bold text-accent">
              {COURSE_MONOGRAM}
            </div>
            <div className="ml-3">
              <div className="font-serif text-base font-bold text-foreground">
                {COURSE_SHORT_TITLE}
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted">
                {COURSE_CLASS_LABEL}
              </div>
            </div>
          </header>

          <main className="min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
