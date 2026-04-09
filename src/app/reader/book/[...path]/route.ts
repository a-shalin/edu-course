import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT_DIR = path.resolve(process.cwd(), "books/russian-history-9");

const CONTENT_TYPES: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function getContentType(filePath: string): string {
  if (filePath.endsWith(".php.html")) {
    return CONTENT_TYPES[".html"];
  }

  const ext = path.extname(filePath).toLowerCase();
  return CONTENT_TYPES[ext] ?? "application/octet-stream";
}

function injectReaderEnhancements(html: string, sourcePath: string): string {
  const styles = `
<style>
span[data-course-anchor="true"] {
  display: block;
  height: 0;
  visibility: hidden;
}
.course-reader-highlight {
  border-radius: 0.8rem;
  box-shadow: 0 0 0 0.35rem rgba(199, 156, 66, 0.16);
  background: rgba(199, 156, 66, 0.12) !important;
  transition: box-shadow 0.3s ease, background 0.3s ease;
}
.nk-page-nav-3 {
  display: none !important;
}
</style>`;

  const script = `
<script>
(function () {
  var sourcePath = ${JSON.stringify(sourcePath)};

  function notifyParent() {
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: "course-book:navigated", sourcePath: sourcePath }, window.location.origin);
      }
    } catch (error) {
      // Ignore cross-frame notification issues.
    }
  }

  function highlightTarget() {
    var previous = document.querySelectorAll(".course-reader-highlight");
    previous.forEach(function (node) {
      node.classList.remove("course-reader-highlight");
    });

    var anchorId = decodeURIComponent(window.location.hash.replace(/^#/, "")).trim();

    if (!anchorId) {
      return;
    }

    var anchor = document.getElementById(anchorId);

    if (!anchor) {
      return;
    }

    var target = anchor.nextElementSibling || anchor.parentElement;

    if (target && target.classList) {
      target.classList.add("course-reader-highlight");
      target.scrollIntoView({ block: "start" });
    }
  }

  window.addEventListener("hashchange", function () {
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(highlightTarget);
    });
  });

  window.addEventListener("load", function () {
    notifyParent();
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(highlightTarget);
    });
  });

  notifyParent();
})();
</script>`;

  return html
    .replace("</head>", `${styles}</head>`)
    .replace("</body>", `${script}</body>`);
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path: requestedSegments } = await context.params;
  const relativePath = requestedSegments.join("/");
  const absolutePath = path.resolve(ROOT_DIR, relativePath);

  if (!absolutePath.startsWith(ROOT_DIR)) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const fileBuffer = await readFile(absolutePath);
    const contentType = getContentType(absolutePath);

    if (contentType.startsWith("text/html")) {
      const html = injectReaderEnhancements(fileBuffer.toString("utf8"), relativePath);
      return new Response(html, {
        headers: {
          "content-type": contentType,
        },
      });
    }

    return new Response(fileBuffer, {
      headers: {
        "content-type": contentType,
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
