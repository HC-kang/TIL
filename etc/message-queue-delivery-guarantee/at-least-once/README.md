# message-queue

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev
```

## 결과 예시

```bash
Redis에 연결되었습니다.
소비자 그룹이 이미 존재합니다.
메시지가 전송되었습니다. 애플리케이션 ID: 3436c530-490f-40af-9245-d032414281b3, Stream ID: 1740667397832-0
[Producer] Produced message: green
[consumer-1] Processing message: 3436c530-490f-40af-9245-d032414281b3 green
메시지가 전송되었습니다. 애플리케이션 ID: 380b4f10-de46-4269-b1e7-67f7ea59aa3a, Stream ID: 1740667397843-0
[Producer] Produced message: purple

...

메시지 확인됨 - 애플리케이션 ID: 8bec6613-eaa2-4bd1-9223-49959d232d3e, Stream ID: 1740667406420-0
[consumer-1] Checking for pending messages...
[consumer-2] Checking for pending messages...
[consumer-1] No pending messages found
[consumer-2] No pending messages found
[consumer-1] Checking for pending messages...
[consumer-1] No pending messages found
[consumer-2] Checking for pending messages...
[consumer-2] No pending messages found
[consumer-1] Checking for pending messages...
[consumer-1] No pending messages found
[consumer-2] Checking for pending messages...
[consumer-2] No pending messages found
최종 메시지 처리 상태:
생산: 100, 소비: 112, 유실: 17, 실패: 7
Redis 연결이 종료되었습니다.
Redis 연결이 종료되었습니다.
Redis 연결이 종료되었습니다.

===== 메시지 처리 결과 분석 =====

[1] 생성되었지만 소비되지 않은 메시지:
  없음 (모든 생성된 메시지가 처리됨)

[2] 소비되었지만 생성되지 않은 메시지 (비정상):
  없음 (정상)

[3] 중복 처리된 메시지 (at-least-once 특성):
  총 12개 메시지가 중복 처리됨:
  - 메시지 ID: 3d2cf458-265b-4c67-9d4d-a0c6bd488721, 처리 횟수: 2회
  - 메시지 ID: 9e0c1ad8-e28b-4084-b894-7c478fb72d02, 처리 횟수: 2회
  - 메시지 ID: d1bef3bb-35c8-4da9-9828-9bc65d0b9d0e, 처리 횟수: 2회
  - 메시지 ID: 23dda07e-9781-459e-824d-135b561107d1, 처리 횟수: 2회
  - 메시지 ID: afc38076-2148-4e65-9ace-c6786ac82655, 처리 횟수: 2회
  - 메시지 ID: 312e0b43-d995-440a-83d3-375cddbb3b28, 처리 횟수: 2회
  - 메시지 ID: 5fe2ec27-6b68-44d2-ba6e-5e924a8d5e34, 처리 횟수: 2회
  - 메시지 ID: a9adad7d-0b36-4bb8-82e3-50d43ced119c, 처리 횟수: 2회
  - 메시지 ID: ac412dcb-e644-4b9b-ab81-e7449e5c81a4, 처리 횟수: 2회
  - 메시지 ID: 83b44d22-a193-419e-8974-2ad82b6abf35, 처리 횟수: 2회
  - 메시지 ID: 85867ef7-f22e-4b73-b92f-101ae74ed162, 처리 횟수: 2회
  - 메시지 ID: c82e6dc0-deda-4131-bd2c-55b3b8f44aab, 처리 횟수: 2회

[4] 전체 처리 통계:
  - 생산된 메시지 수: 100개
  - 처리된 고유 메시지 수: 100개
  - 중복 처리된 메시지 수: 12개
  - 총 처리 횟수: 112회

[5] 최종 검증 결과:
  ✅ 성공: 모든 메시지가 최소 1회 이상 처리되었습니다.

===============================

Done
```
