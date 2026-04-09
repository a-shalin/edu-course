"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";
import { chapters, getReadyChapterCount, studyCards } from "@/lib/course-data";
import { getPracticeItemCount } from "@/lib/practice";

function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

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
                IX
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-foreground">История России</div>
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
            {chapters.map((chapter) => {
              const isActive = pathname === `/chapter/${chapter.id}`;
              return (
                <Link
                  key={chapter.id}
                  href={`/chapter/${chapter.id}`}
                  onClick={onClose}
                  className={`mb-1 block rounded-[1.2rem] px-4 py-3 text-sm transition-colors ${
                    isActive ? "bg-burgundy text-white" : "text-foreground hover:bg-paper"
                  }`}
                >
                  <div className="mb-1 text-[11px] uppercase tracking-[0.22em] opacity-70">
                    {chapter.label}
                  </div>
                  <div className="line-clamp-2 leading-snug">{chapter.title}</div>
                  <div className="mt-2 text-xs opacity-70">{chapter.periodLabel}</div>
                </Link>
              );
            })}

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
        <title>История России, 9 класс</title>
        <meta
          name="description"
          content="Интерактивный курс по истории России для 9 класса на основе учебника и контрольных работ."
        />
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
              IX
            </div>
            <div className="ml-3">
              <div className="font-serif text-base font-bold text-foreground">История России</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted">9 класс</div>
            </div>
          </header>

          <main className="min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
