import { PRACTICE_PROGRESS_NAMESPACE } from "./course-config";

const PRACTICE_PROGRESS_VERSION = 1;
const PRACTICE_PROGRESS_MAX_AGE = 60 * 60 * 24 * 365;

export const PRACTICE_PROGRESS_CHANGED_EVENT =
  `${PRACTICE_PROGRESS_NAMESPACE}-practice-progress-changed`;

type PracticeProgressCookie = {
  v: number;
  solvedItemIds: string[];
};

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const prefix = `${name}=`;
  const entry = document.cookie.split("; ").find((part) => part.startsWith(prefix));

  return entry ? entry.slice(prefix.length) : null;
}

export function getPracticeProgressCookieKey(chapterId: number): string {
  return `${PRACTICE_PROGRESS_NAMESPACE}_practice_progress_chapter_${chapterId}_v1`;
}

export function readSolvedPracticeItemIds(chapterId: number): string[] {
  const rawValue = getCookieValue(getPracticeProgressCookieKey(chapterId));

  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(rawValue)) as PracticeProgressCookie;

    if (parsed.v !== PRACTICE_PROGRESS_VERSION || !Array.isArray(parsed.solvedItemIds)) {
      return [];
    }

    return [
      ...new Set(
        parsed.solvedItemIds.filter((value): value is string => typeof value === "string")
      ),
    ];
  } catch {
    return [];
  }
}

export function writeSolvedPracticeItemIds(chapterId: number, solvedItemIds: string[]): void {
  if (typeof document === "undefined") {
    return;
  }

  const normalizedIds = [...new Set(solvedItemIds)].sort();

  if (normalizedIds.length === 0) {
    clearSolvedPracticeItemIds(chapterId);
    return;
  }

  const payload: PracticeProgressCookie = {
    v: PRACTICE_PROGRESS_VERSION,
    solvedItemIds: normalizedIds,
  };

  document.cookie = [
    `${getPracticeProgressCookieKey(chapterId)}=${encodeURIComponent(JSON.stringify(payload))}`,
    "Path=/",
    "SameSite=Lax",
    `Max-Age=${PRACTICE_PROGRESS_MAX_AGE}`,
  ].join("; ");

  window.dispatchEvent(
    new CustomEvent(PRACTICE_PROGRESS_CHANGED_EVENT, {
      detail: { chapterId, solvedItemIds: normalizedIds },
    })
  );
}

export function clearSolvedPracticeItemIds(chapterId: number): void {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = [
    `${getPracticeProgressCookieKey(chapterId)}=`,
    "Path=/",
    "SameSite=Lax",
    "Max-Age=0",
  ].join("; ");

  window.dispatchEvent(
    new CustomEvent(PRACTICE_PROGRESS_CHANGED_EVENT, {
      detail: { chapterId, solvedItemIds: [] },
    })
  );
}
