# RH6

Russian History 6 empty course skeleton built with Next.js.

## Local development

```bash
npm install
npm run dev
```

From the repo root you can use the wrapper commands:

```bash
npm run dev:rh6
npm run lint:rh6
npm run e2e:rh6
npm run check:rh6
```

The app shell is ready, but the textbook and practice content are intentionally empty until the new source book is downloaded into `books/russian-history-6/`.

## Structure

- `books/russian-history-6/books/russian-history/part-1/`: textbook HTML for part 1
- `books/russian-history-6/books/russian-history/part-2/`: textbook HTML for part 2
- `books/russian-history-6/books/russian-history/control-work/`: control-work HTML
- `books/russian-history-6/assets`, `css`, `img`: accompanying assets from the downloaded source

## Docker / Deploy Placeholders

Build the production image from the `rh6/` directory:

```bash
docker build -f docker/Dockerfile -t rh6 .
```

The production container must include `books/` because the in-app textbook reader serves those files through a Next.js route.

Deployment scaffolding is present only as a placeholder:

- `docker/`: Docker image and Compose template ready to be wired later
- `ansible/`: inventory and playbook placeholders that must be updated before any real deployment

`rh6` is not registered in the repo root deploy scripts or shared edge routes yet.
