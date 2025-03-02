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
[consumer-1] Processing message: 8864d5db-158b-4ed1-9771-c8e60f4adb2b blue
메시지가 전송되었습니다. 애플리케이션 ID: 8864d5db-158b-4ed1-9771-c8e60f4adb2b, Stream ID: 1740896558296-0
[Producer] Produced message: blue

...

메시지 확인됨 - 애플리케이션 ID: f64cbf48-aaf4-4adf-bbf0-dcf92b70bbf3, Stream ID: 1740896562693-0
[consumer-2] Checking for pending messages...
[consumer-2] No pending messages found
[consumer-1] No pending messages found
[consumer-1] Checking for pending messages...
[consumer-2] Checking for pending messages...
[consumer-1] No pending messages found
[consumer-2] No pending messages found
최종 메시지 처리 상태:
생산: 100, 소비: 118, 유실: 23, 실패: 11
Redis 연결이 종료되었습니다.
Redis 연결이 종료되었습니다.
Redis 연결이 종료되었습니다.

===== 메시지 처리 결과 분석 =====

[1] 생성되었지만 소비되지 않은 메시지:
  없음 (모든 생성된 메시지가 처리됨)

[2] 소비되었지만 생성되지 않은 메시지 (비정상):
  없음 (정상)

[3] 중복 시도되었지만 처리되지 않은 메시지 (exactly-once 특성):
  총 18개 메시지가 중복 처리됨:
  - 메시지 ID: 9e27d2bd-72f3-47ec-acf7-74bf34b246d1, 처리 횟수: 2회
  - 메시지 ID: d36d3945-43bf-4990-b687-972c02f09f32, 처리 횟수: 2회
  - 메시지 ID: c6dc4172-ad56-4832-b8c6-7e91ec431c87, 처리 횟수: 2회
  - 메시지 ID: 0b3d0d18-3ec6-491e-b0c2-81fb0545a69b, 처리 횟수: 2회
  - 메시지 ID: 566d51fa-979e-4905-ba5b-3a6ecfb6e1e4, 처리 횟수: 2회
  - 메시지 ID: 3f50e5ff-6468-4077-ae54-6e29d7e5b1b1, 처리 횟수: 2회
  - 메시지 ID: c2fdd304-9aef-4da5-aedc-9df2a56a3a8b, 처리 횟수: 2회
  - 메시지 ID: 4c13b289-e96d-4eca-a57d-b18ff65e64a7, 처리 횟수: 2회
  - 메시지 ID: 7e74b4b7-b107-484c-bca5-85c266c692f5, 처리 횟수: 2회
  - 메시지 ID: 05d9ae82-12da-4267-af2c-8080d5893bc7, 처리 횟수: 2회
  - 메시지 ID: d79369e2-2805-4d1d-8d96-9bd2ae4be803, 처리 횟수: 2회
  - 메시지 ID: 4763ae5c-975a-4ac8-8699-61913b657a8b, 처리 횟수: 2회
  - 메시지 ID: 47dc07e8-a48f-499f-8d06-3c8b4f366bd3, 처리 횟수: 2회
  - 메시지 ID: 8370151a-5e86-43d9-b138-ac4e7422a359, 처리 횟수: 2회
  - 메시지 ID: e3ab8b0e-22b9-418f-8ba7-22eba986c2d0, 처리 횟수: 2회
  - 메시지 ID: fd8e1306-4bfc-4bc3-8faa-f04089c14341, 처리 횟수: 2회
  - 메시지 ID: fc438cc3-1b7c-4225-88f0-8e9329e88ce5, 처리 횟수: 2회
  - 메시지 ID: f0513523-31e8-446d-b1bc-9ad91fab9eed, 처리 횟수: 2회

[4] 전체 처리 통계:
  - 생산된 메시지 수: 100개
  - 처리된 고유 메시지 수: 100개
  - 중복 처리된 메시지 수: 18개
  - 총 처리 횟수: 118회

[5] 최종 검증 결과:
  ✅ 성공: 모든 메시지가 정확히 1회 처리되었습니다.

===============================

Done
```
