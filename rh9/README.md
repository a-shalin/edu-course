# RH9

Russian History 9 interactive course built with Next.js.

## Local development

```bash
npm install
npm run dev
```

From the repo root you can use the wrapper commands:

```bash
npm run dev
npm run lint
npm run e2e
npm run deploy
```

## Docker

Build the production image from the `rh9/` directory:

```bash
docker build -f docker/Dockerfile -t rh9 .
```

The production container must include `books/` because the in-app textbook reader serves those files through a Next.js route.

## Deployment

- `docker/`: Docker image and Compose template for the `rh9.ashalin.net` app stack
- `ansible/`: Ansible inventory example and playbook for deploying RH9 behind the shared Traefik edge

Create the real inventory files from the examples first:

```bash
cp ops/ansible/inventory/production.ini.example ops/ansible/inventory/production.ini
cp rh9/ansible/inventory/production.ini.example rh9/ansible/inventory/production.ini
```

Deploy the shared edge first from repo root:

```bash
npm run deploy:edge
```

Then deploy RH9:

```bash
npm run deploy
```

From `rh9/` itself you can also run:

```bash
npm run deploy
```

Extra `ansible-playbook` arguments can be passed through the script directly, for example:

```bash
bash ../scripts/deploy.sh rh9 --limit rh9_server
```
