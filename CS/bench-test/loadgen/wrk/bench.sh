#!/usr/bin/env bash
set -euo pipefail

# 기본값
THREADS=${THREADS:-6}
CONNS=${CONNS:-3200}
DURATION=${DURATION:-60s}
URL=${URL:-http://app:3000/}
COMPOSE_FILE=${COMPOSE_FILE:-./docker-compose.yaml}
RESULTS_DIR=${RESULTS_DIR:-results}

mkdir -p "${RESULTS_DIR}"

timestamp() { date +"%Y-%m-%dT%H-%M-%S"; }

to_ms() {
  # 인자: "1.7ms" 또는 "2.3s" → ms 숫자
  local v="$1"
  if [[ "$v" == *ms ]]; then
    echo "${v%ms}"
  elif [[ "$v" == *s ]]; then
    awk "BEGIN{printf \"%.3f\", ${v%s}*1000}"
  else
    echo "$v"
  fi
}

RUN_DIR="${RESULTS_DIR}/$(timestamp)"
mkdir -p "${RUN_DIR}"

echo ">>> wrk: -t${THREADS} -c${CONNS} -d${DURATION} --latency ${URL}"
OUT_FILE="${RUN_DIR}/bench.txt"

# 실행 (TTY 끄고, stderr→stdout 합쳐 tee로 저장)
docker compose -f "${COMPOSE_FILE}" run -T --rm wrk \
  -t"${THREADS}" -c"${CONNS}" -d"${DURATION}" --latency "${URL}" 2>&1 \
  | tee "${OUT_FILE}"

# 파싱
OUT="$(cat "${OUT_FILE}")"

RPS=$(echo "$OUT" | awk '/Requests\/sec:/ {print $2}' | tail -n1)
P50_RAW=$(echo "$OUT" | awk '/^[[:space:]]*50%/ {print $2}' | tail -n1)
P90_RAW=$(echo "$OUT" | awk '/^[[:space:]]*90%/ {print $2}' | tail -n1)
P99_RAW=$(echo "$OUT" | awk '/^[[:space:]]*99%/ {print $2}' | tail -n1)

P50=$(to_ms "${P50_RAW:-0ms}")
P90=$(to_ms "${P90_RAW:-0ms}")
P99=$(to_ms "${P99_RAW:-0ms}")

# 에러(없으면 0으로)
SOCK_ERR_LINE=$(echo "$OUT" | grep -E 'Socket errors:' || true)
if [[ -n "$SOCK_ERR_LINE" ]]; then
  # 예: Socket errors: connect 0, read 0, write 0, timeout 0
  ERR_TOTAL=$(echo "$SOCK_ERR_LINE" | awk '{print $4+$6+$8+$10}' FS='[ ,]+' )
else
  ERR_TOTAL=0
fi

# CSV 요약 누적
CSV="${RESULTS_DIR}/bench.csv"
if [[ ! -s "$CSV" ]]; then
  echo "timestamp,threads,conns,duration,url,rps,p50_ms,p90_ms,p99_ms,errors" > "$CSV"
fi
echo "$(timestamp),${THREADS},${CONNS},${DURATION},${URL},${RPS:-0},${P50},${P90},${P99},${ERR_TOTAL}" >> "$CSV"

# 짧은 요약 출력
echo ">>> SUMMARY: RPS=${RPS:-0} | p50=${P50}ms p90=${P90}ms p99=${P99}ms | errors=${ERR_TOTAL}"
echo "    - raw: ${OUT_FILE}"
echo "    - csv: ${CSV}"