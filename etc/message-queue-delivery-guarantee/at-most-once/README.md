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
[Producer] Produced message: red
[Producer] Produced message: pink
[consumer-2] Processing message: 1ad36f4b-960d-416f-8f50-ee02d660bcfb red
[consumer-2] Processed message: 1ad36f4b-960d-416f-8f50-ee02d660bcfb red
[Produced: 2, Consumed: 1, Lost: 0, Failed: 0, Total: 1]

...

[consumer-2] Processing message: 7c4c64ed-a8cd-4263-a84b-b9d6fee60691 purple
[consumer-2] Processed message: 7c4c64ed-a8cd-4263-a84b-b9d6fee60691 purple
[Produced: 100, Consumed: 74, Lost: 22, Failed: 4, Total: 100]
Done
```