#!/bin/zsh
# Starts the whole monorepo (web + mobile + ui) with Turborepo.
# Kills any process already listening on the dev ports first.

PORTS=(3000 8081 19000 19001 19002)

cd "$(dirname "$0")" || exit 1
source ~/.zprofile 2>/dev/null
source ~/.zshrc 2>/dev/null

kill_port() {
  local pids
  pids=$(lsof -ti tcp:"$1" -sTCP:LISTEN 2>/dev/null)
  if [[ -n "$pids" ]]; then
    echo "Puerto $1 ocupado (PID: ${pids//$'\n'/ }). Matando proceso..."
    kill $pids 2>/dev/null
    sleep 1
    pids=$(lsof -ti tcp:"$1" -sTCP:LISTEN 2>/dev/null)
    [[ -n "$pids" ]] && kill -9 $pids 2>/dev/null
  fi
}

for p in $PORTS; do kill_port $p; done

[[ -d node_modules ]] || pnpm install

echo "Levantando proyecto completo (web: http://localhost:3000, expo: 8081)..."
pnpm dev
