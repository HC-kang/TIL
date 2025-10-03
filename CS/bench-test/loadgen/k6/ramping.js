import http from 'k6/http';
import { check } from 'k6';

export const options = {
  discardResponseBodies: true,              // 클라이언트 오버헤드 최소화
  summaryTrendStats: ['avg','med','p(90)','p(99)','min','max'],
  scenarios: {
    ramp_rate: {
      executor: 'ramping-arrival-rate',
      startRate: 20000,                     // 시작 RPS
      timeUnit: '1s',
      preAllocatedVUs: 2000,                // k6 내부 워커 풀 (충분히 크게)
      maxVUs: 20000,                        // 상한 (필요시 더 키움)
      stages: [
        { target: 40000, duration: '30s' },
        { target: 80000, duration: '30s' },
        { target: 120000, duration: '30s' },
        { target: 0,      duration: '10s' },
      ],
    },
  },
  // HTTP 튜닝 (필요시)
  // insecureSkipTLSVerify: true,
};

export default function () {
  const res = http.get('http://app:3000/');
  check(res, { '200': (r) => r.status === 200 });
}