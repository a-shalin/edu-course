#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "${script_dir}/.." && pwd)"

target="${1:-rh9}"
if [[ $# -gt 0 ]]; then
  shift
fi

case "${target}" in
  rh9)
    ansible_dir="${repo_root}/rh9/ansible"
    playbook="playbooks/deploy.yml"
    example_inventory="${ansible_dir}/inventory/production.ini.example"
    ;;
  edge)
    ansible_dir="${repo_root}/ops/ansible"
    playbook="playbooks/deploy-edge.yml"
    example_inventory="${ansible_dir}/inventory/production.ini.example"
    ;;
  *)
    echo "Unknown deploy target: ${target}" >&2
    echo "Usage: scripts/deploy.sh [rh9|edge] [additional ansible-playbook args...]" >&2
    exit 1
    ;;
esac

if ! command -v ansible-playbook >/dev/null 2>&1; then
  echo "ansible-playbook is not installed or not in PATH." >&2
  exit 1
fi

inventory_file="${ansible_dir}/inventory/production.ini"
if [[ ! -f "${inventory_file}" ]]; then
  echo "Missing inventory file: ${inventory_file}" >&2
  echo "Create it from: ${example_inventory}" >&2
  exit 1
fi

cd "${ansible_dir}"
exec ansible-playbook "${playbook}" "$@"
