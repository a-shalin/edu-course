# edu-course

Multi-project repository for educational course applications and shared deployment ops.

## Projects

- `rh9/`: Russian History 9 interactive course
- `rh6/`: Russian History 6 empty course skeleton for the next textbook import

## Shared Ops

- `ops/edge/`: shared Traefik edge stack for `ora.cloudinfosys.ru`
- `ops/ansible/`: Ansible playbook to deploy the shared edge

## Local commands

The root package is a thin wrapper around `rh9`:

```bash
npm run dev
npm run build
npm run lint
npm run e2e
npm run deploy
```

Use the explicit `rh6` commands for the new empty shell:

```bash
npm run dev:rh6
npm run build:rh6
npm run start:rh6
npm run lint:rh6
npm run e2e:rh6
npm run check:rh6
```

## Deployment model

- Traefik is the only stack that binds host ports `80/443`.
- Each project runs in its own Docker Compose stack and joins the shared external Docker network `edge`.
- TLS issuance and renewal for `buddi.ashalin.net`, `rh9.ashalin.net`, and future project domains is handled by Traefik via Let's Encrypt.
- `rh6` is scaffolded for local work only right now; it is not registered in root deploy scripts or edge routes yet.

## Deployment commands

Create the real inventories from the example files first:

```bash
cp ops/ansible/inventory/production.ini.example ops/ansible/inventory/production.ini
cp rh9/ansible/inventory/production.ini.example rh9/ansible/inventory/production.ini
```

Then run:

```bash
npm run deploy:edge
npm run deploy
```

Extra `ansible-playbook` arguments can be passed directly to the script:

```bash
bash ./scripts/deploy.sh rh9 --limit rh9_server
```
