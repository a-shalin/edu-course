"use client";

import { useEffect } from "react";
import type { BookSection, BookTarget } from "@/lib/book-data";
import { buildBookReaderHref, getBookSection } from "@/lib/book-data";

interface BookReaderProps {
  open: boolean;
  sections: BookSection[];
  activeTarget: BookTarget | null;
  onToggle: () => void;
  onTargetChange: (target: BookTarget) => void;
}

function ReaderToggle({
  open,
  onClick,
  attached,
}: {
  open: boolean;
  onClick: () => void;
  attached: boolean;
}) {
  const positionClass = attached
    ? "absolute left-0 top-1/2 -translate-x-full -translate-y-1/2"
    : "fixed right-0 top-1/2 z-40 -translate-y-1/2";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${positionClass} rounded-l-[1.2rem] border border-r-0 border-border bg-burgundy px-3 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_14px_36px_rgba(92,34,29,0.28)] transition-colors hover:bg-accent`}
      aria-label={open ? "Скрыть учебник" : "Показать учебник"}
    >
      <span className="block [writing-mode:vertical-rl] rotate-180">Учебник</span>
    </button>
  );
}

export function BookReader({
  open,
  sections,
  activeTarget,
  onToggle,
  onTargetChange,
}: BookReaderProps) {
  const fallbackSection = sections[0];
  const activeSection = activeTarget ? getBookSection(activeTarget.sectionId) ?? fallbackSection : fallbackSection;
  const readerHref = buildBookReaderHref(activeSection ? {
    sectionId: activeSection.id,
    anchorId: activeTarget?.sectionId === activeSection.id ? activeTarget.anchorId : undefined,
  } : null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }

      const data = event.data as { type?: string; sourcePath?: string } | null;

      if (!data || data.type !== "course-book:navigated" || !data.sourcePath) {
        return;
      }

      const matchedSection = sections.find((section) => section.sourcePath === data.sourcePath);

      if (!matchedSection) {
        return;
      }

      onTargetChange({ sectionId: matchedSection.id });
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onTargetChange, sections]);

  if (sections.length === 0) {
    return null;
  }

  return (
    <>
      {!open ? <ReaderToggle open={false} onClick={onToggle} attached={false} /> : null}
      {open ? (
        <>
          <div className="fixed inset-0 z-40 bg-black/20 xl:hidden" onClick={onToggle} />
          <aside className="fixed top-0 right-0 z-50 flex h-screen w-full max-w-[42rem] flex-col border-l border-border bg-background shadow-[-20px_0_60px_rgba(59,37,26,0.16)] xl:w-[36rem]">
            <ReaderToggle open onClick={onToggle} attached />

            <div className="flex items-center justify-between border-b border-border bg-card px-5 py-4">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted">Книга</div>
                <h3 className="font-serif text-2xl font-bold text-foreground">Учебник</h3>
              </div>
              <button
                type="button"
                onClick={onToggle}
                className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:border-accent hover:text-accent"
              >
                Скрыть
              </button>
            </div>

            <div className="border-b border-border bg-paper px-4 py-4">
              <div className="max-h-60 space-y-2 overflow-y-auto pr-1">
                {sections.map((section) => {
                  const active = activeSection?.id === section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => onTargetChange({ sectionId: section.id })}
                      className={`flex w-full items-center justify-between rounded-[1rem] border px-4 py-3 text-left transition-colors ${
                        active
                          ? "border-accent bg-accent/8 text-foreground"
                          : "border-border bg-card text-foreground hover:border-accent/40"
                      }`}
                    >
                      <span className="pr-4 text-sm leading-6">{section.title}</span>
                      <span className="text-lg text-muted">{active ? "−" : "+"}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="min-h-0 flex-1 bg-card p-4">
              <div className="flex h-full flex-col overflow-hidden rounded-[1.2rem] border border-border bg-paper">
                <div className="border-b border-border px-4 py-3 text-sm font-medium text-foreground">
                  {activeSection?.title}
                </div>
                {readerHref ? (
                  <iframe
                    key={readerHref}
                    src={readerHref}
                    title={activeSection?.title ?? "Учебник"}
                    className="h-full w-full border-0 bg-white"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-6 text-sm leading-7 text-foreground/78">
                    Не удалось открыть выбранный раздел учебника.
                  </div>
                )}
              </div>
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
}
