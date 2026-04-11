# edu-course

Multi-project repository for educational course applications and shared deployment ops.

## Projects

- `rh9/`: Russian History 9 interactive course

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
```

## Deployment model

- Traefik is the only stack that binds host ports `80/443`.
- Each project runs in its own Docker Compose stack and joins the shared external Docker network `edge`.
- TLS issuance and renewal for `buddi.ashalin.net`, `rh9.ashalin.net`, and future project domains is handled by Traefik via Let's Encrypt.
