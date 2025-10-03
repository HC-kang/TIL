#!/usr/bin/env bash
set -euo pipefail

# ==== 기본값 (환경변수로 덮어쓰기 가능) ====
COMPOSE_FILE=${COMPOSE_FILE:-./docker-compose.yaml} # k6 서비스가 들어있는 compose
SCRIPT_PATH=${SCRIPT_PATH:-/ramping.js}              # 컨테이너 내 경로
RESULTS_DIR=${RESULTS_DIR:-results}                  # 결과 저장 루트
K6_OPTS=${K6_OPTS:---summary-trend-stats=avg,med,p(90),p(99),min,max}
# 예) K6_OPTS='--summary-trend-stats=avg,med,p(90),p(99) -e FOO=bar'

mkdir -p "${RESULTS_DIR}"

timestamp() { date +"%Y-%m-%dT%H-%M-%S"; }

to_ms() {
  # 인자: "123ms" 또는 "1.23s" -> ms 숫자
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
OUT_FILE="${RUN_DIR}/k6.txt"

echo ">>> k6: run ${SCRIPT_PATH} (${K6_OPTS})"
# TTY 끄고(stderr 합쳐) 파일로 저장
docker compose -f "${COMPOSE_FILE}" run -T --rm k6 \
  run ${K6_OPTS} "${SCRIPT_PATH}" 2>&1 | tee "${OUT_FILE}"

OUT="$(cat "${OUT_FILE}")"

# ---- 파싱 ----
# http_reqs 라인 예)
# http_reqs.............: 12915843  215216.63/s
REQS_LINE="$(echo "${OUT}" | awk '/^[[:space:]]*http_reqs[.[:space:]]*:/ {print; exit}')"
TOTAL_REQS="$(echo "${REQS_LINE}" | sed -E 's/.*:[[:space:]]*([0-9]+).*/\1/')"
RPS="$(echo "${REQS_LINE}" | sed -E 's#.*/s##' | awk '{print $NF}')"

# http_req_duration 라인 예)
# http_req_duration.....: avg=1.87ms min=... med=1.70ms max=... p(90)=2.42ms p(99)=3.25ms
DUR_LINE="$(echo "${OUT}" | awk '/^[[:space:]]*http_req_duration[.[:space:]]*:/ {print; exit}')"

AVG_RAW="$(echo "${DUR_LINE}" | sed -E 's/.*avg=([^[:space:]]+).*/\1/')"
P50_RAW="$(echo "${DUR_LINE}" | sed -E 's/.*med=([^[:space:]]+).*/\1/')"
P90_RAW="$(echo "${DUR_LINE}" | sed -E 's/.*p\(90\)=([^[:space:]]+).*/\1/')"
P99_RAW="$(echo "${DUR_LINE}" | sed -E 's/.*p\(99\)=([^[:space:]]+).*/\1/')"

AVG_MS="$(to_ms "${AVG_RAW:-0ms}")"
P50_MS="$(to_ms "${P50_RAW:-0ms}")"
P90_MS="$(to_ms "${P90_RAW:-0ms}")"
P99_MS="$(to_ms "${P99_RAW:-0ms}")"

# 에러(없으면 0)
# checks...............: 100.00% ✓ 12345 ✗ 0  (이건 성공률)
# 실패 요청은 http_req_failed가 별도 지표로 찍히므로 그것도 보자.
FAILED_RATE_LINE="$(echo "${OUT}" | awk '/^[[:space:]]*http_req_failed[.[:space:]]*:/ {print; exit}')"
# http_req_failed......: 0.00% ✓ 0 ✗ 0
FAILED_PCT="$(echo "${FAILED_RATE_LINE}" | sed -E 's/.*:[[:space:]]*([0-9.]+)%.*/\1/')"
FAILED_PCT="${FAILED_PCT:-0}"

# CSV 누적
CSV="${RESULTS_DIR}/k6.csv"
if [[ ! -s "${CSV}" ]]; then
  echo "timestamp,script,total_reqs,rps,http_req_duration_avg_ms,p50_ms,p90_ms,p99_ms,failed_pct" > "${CSV}"
fi
echo "$(timestamp),${SCRIPT_PATH},${TOTAL_REQS:-0},${RPS:-0},${AVG_MS},${P50_MS},${P90_MS},${P99_MS},${FAILED_PCT}" >> "${CSV}"

# 요약 출력
echo ">>> SUMMARY: total=${TOTAL_REQS:-0} | rps=${RPS:-0} | avg=${AVG_MS}ms p50=${P50_MS}ms p90=${P90_MS}ms p99=${P99_MS}ms | failed=${FAILED_PCT}%"
echo "    - raw: ${OUT_FILE}"
echo "    - csv: ${CSV}"