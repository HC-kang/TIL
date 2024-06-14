# Docker Container Benchmarking

## 개요

- Docker 컨테이너 벤치마킹을 위한 프로젝트입니다.
- Node.js를 사용하여 각 요청에 대한 처리 시간을 측정합니다.

## 세부사항

### 서버 스펙

- AWS EC2 t2.xlarge(4 vCPU, 16GB RAM), Ubuntu 24.04 LTS

### 테스트 엔드포인트

- '/network': 네트워크 성능 측정
- '/cpu': CPU 성능 측정
- '/disk-io': 디스크 I/O 성능 측정

### 테스트 조건

- 동일한 Node.js 코드를 각각 Native, Docker container(bridge, host)에서 실행
- wrk를 사용하여 각 엔드포인트에 대한 요청을 1분간 8개 스레드, 100개 커넥션으로 수행
  - 커맨드
    - 

### 예상 결과

- 네트워크 성능: Native ≈ Docker container(host) > Docker container(bridge)
- CPU 성능: Native ≈ Docker container(host) ≈ Docker container(bridge)
- 디스크 I/O 성능: Native ≈ Docker container(host) ≈ Docker container(bridge)

## 실행 방법

1. Native
  - node app.js

2. Docker container(bridge)
  - docker run --rm -v /home/ubuntu:/usr/src/app -w /usr/src/app -p 3000:3000 node:18 node app.js

3. Docker container(host)
  - docker run --rm -v /home/ubuntu:/usr/src/app -w /usr/src/app --network host node:18 node app.js

## 결과

- 1회차
  - 실행순서: Native -> Docker container(bridge) -> Docker container(host)
