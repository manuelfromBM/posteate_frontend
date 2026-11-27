#!/bin/zsh
# Starts only the web app (Next.js) and its workspace dependencies.
# Kills any process already listening on the web port first.

PORT=3000

cd "$(dirname "$0")" || exit 1
source ~/.zprofile 2>/dev/null
source ~/.zshrc 2>/dev/null

pids=$(lsof -ti tcp:$PORT -sTCP:LISTEN 2>/dev/null)
if [[ -n "$pids" ]]; then
  echo "Puerto $PORT ocupado (PID: ${pids//$'\n'/ }). Matando proceso..."
  kill $pids 2>/dev/null
  sleep 1
  pids=$(lsof -ti tcp:$PORT -sTCP:LISTEN 2>/dev/null)
  [[ -n "$pids" ]] && kill -9 $pids 2>/dev/null
fi

[[ -d node_modules ]] || pnpm install

echo "Levantando web en http://localhost:$PORT ..."
pnpm turbo run dev --filter=web
