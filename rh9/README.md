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

Deploy the shared edge first from repo root:

```bash
cd ops/ansible
ansible-playbook playbooks/deploy-edge.yml
```

Then deploy RH9:

```bash
cd rh9/ansible
ansible-playbook playbooks/deploy.yml
```
