# 시작하세요! 도커/쿠버네티스 스터디 로그

## 📅 스터디 개요
- **기간**: 2025.07.28 ~ 2025.08.15 (15일, 워킹데이)
- **목표**: 도커와 쿠버네티스 실무 역량 확보
- **일일 학습시간**: 2시간

---

## Week 1(7/28 ~ 8/1)

### Day 1 (7/28) - 도커 환경 구축

**📖 진도**: 1장 + 2.1 / 1~20p

- **핵심 개념**
  - 컨테이너와 VM의 차이점
  - 도커 아키텍처 (daemon, client, registry)
  
- **실습 내용**
  - 해당 없음

### Day 2 (7/29) - 도커 이미지 관리

**📖 진도**: 2.2, 2.3 / 21~109p

#### **핵심 개념**

- 도커 이미지와 컨테이너 개념
- 볼륨과 네트워크
- 로깅, 자원할당 옵션
- 이미지의 구조, 레이어 관리

#### **실습 내용**

- 도커 컨테이너 다루기
- 볼륨, 네트워크의 개념
- 다양한 도커 컨테이너 명령어
  - `docker run -it ubuntu:24.04` 등 기본 커맨드
  - `docker logs <container_id>` 등 로깅 명령어
- 이미지의 구조, 레이어 관리

#### **배운 내용**

##### **몰랐던 유용한 커맨드**

- `docker create -it ubuntu:24.04`
  - 컨테이너 생성만 하고 실행은 안함
- `cmd + P, Q`
  - 컨테이너 끄지 않고 나가기
- `docker attach <container_id>`
  - 컨테이너 접속: 맨날 `exec -it <container_id> bash` 썼었는데.. 이게 있었네..
  - **다만 `Ctrl + C` 로 컨테이너를 종료하면 메인 프로세스가 종료될 수 있음.**
  - 따라서 사실 `exec` 가 **더 안전**하다.
  - `run` 과 `attach` 커맨드의 차이점
    - <img src="./images/day2/run-vs-attach.png" width="500">

##### **볼륨 컨테이너의 개념**

- 볼륨만 전담하는 컨테이너 사용방식이 존재한다.
  - 그런데 왜? docker에서 관리하는 단순 볼륨 사용과 차이점은?
    - 사실 볼륨 컨테이너는 레거시 패턴이다.
      - Docker 1.9 이후 `named volumes` 도입으로 대부분 불필요해졌다.
      - 대체 사용법
          ```bash
          # 이전 방식 (볼륨 컨테이너)
          docker create -v /data --name dbdata busybox
          docker run --volumes-from dbdata postgres

          # 현재 권장 방식
          docker volume create dbdata
          docker run -v dbdata:/var/lib/postgresql/data postgres
          ```

##### **MacOS에서 네트워크 환경**

- MacOS에서는 도커가 VM 환경에서 실행되기 때문에 네트워크 환경이 다르다.
- 도서에서는 호스트의 `veth0`을 통해 컨테이너와 브리지 네트워크를 연결한다고 하였으나, MacOS에서는 이보다 좀 더 복잡한 과정을 거친다.
  - 실제 구성
    ```
    macOS 호스트
        ↓
    bridge102 (192.168.215.0/24) ← Docker VM이 사용하는 브릿지
        ↓
    vmenet2 ← VM과 통신하는 가상 네트워크 인터페이스
        ↓
    Docker Desktop VM (Linux)
        ↓
    docker0 bridge
        ↓
    veth pairs (여기에 실제로 존재!)
        ↓
    컨테이너 (192.168.215.2)
    ```
- 도커의 브리지 네트워크
  - `subnet`, `gateway`, `ip-range` 등 세부 설정 가능
    - '공유기'를 가상으로 만들 수 있다.
- `--net-alias` 옵션
  - 도커 내부 DNS 서버에 별칭을 추가로 부여할 수 있다.
  - RR(Round-Robin) 방식만 가능
  - 그러나 헬스체크 등 주요 기능이 없으므로, 간단한 서비스에 사용하는 것이 좋다.
  - 고급 기능 사용시에는 `haproxy`, `traefik` 등 외부 네트워크 프로그램을 사용하는 것이 좋다.

##### **도커의 로깅**

```bash
docker run -it ubuntu:24.04
  --log-opt max-size=10m # 로그 파일 최대 크기
  --log-opt max-file=3 # 로그 파일 최대 개수
  --log-opt compress=true # 로그 파일 압축
```

##### **컨테이너 자원 할당 제한**

```bash
docker run -d
  --memory=1g # 메모리 제한
  --memory-swap=2g # 메모리 + 스왑 제한
  --cpu-shares=1024 # 상대적 CPU 가중치, 1024이 최대
  --cpuset-cpus=0,1 # CPU 셋, 0번과 1번 코어만 사용
  --cpu-period=100000 # CPU 주기
  --cpu-quota=50000 # CPU 할당량, 주기 중 50% 사용
  --cpus=2 # CPU 제한, 2개 코어 사용
```
  - `--cpus` 옵션이 간단하기는 하지만, `--cpuset-cpus` 옵션이 더 유리하다.
    - 이는 CPU를 직접 지정할 수 있으므로 CPU 친화성이 높고, 불필요한 캐시미스, 컨텍스트 스위칭을 방지하여 성능상 이점이 있다.

##### **도커 이미지 관리**

- `docker save` 명령어로 이미지를 하나의 파일로 내보낼 수 있다.
  - 간단한 이미지를 바로 OCI 저장소에 올릴 수 있을듯.
- 반대로 `docker load` 명령어로 파일을 이미지로 불러올 수 있다.
- `docker export`, `docker import` 명령어로 컨테이너 <-> 이미지로 변환할 수 있다.

#### **적용해볼 내용**

- `docker save` 명령어로, 사내에서 테스트에 사용할 골든 이미지 업로드 가능한지 적용해보기
- 홈 서버용 사설 레지스트리 구축 및 적용 해보기

### Day 3 (7/30) - 도커파일과 도커 데몬

**📖 진도**: 2.4, 2.5 / 110~167p

#### **핵심 개념**

- Dockerfile 작성법과 주요 명령어
- Dockerfile 사용시 주의사항
- 도커의 구조
  - 도커 데몬과 도커 클라이언트
  - <img src="./images/day3/docker-structure.png" width="500">
- 도커 데몬 모니터링

#### **실습 내용**

- Dockerfile 작성
  - 주요 명령어
    - `FROM`, `RUN`, `COPY`, `ADD`, `CMD`, `ENTRYPOINT`, `EXPOSE`, `ENV`, `VOLUME`, `USER`, `WORKDIR`, `STOPSIGNAL`, `HEALTHCHECK`, `ONBUILD`
  - 명령어 단위 레이어 생성 및 캐싱 활용
- 도커 클라이언트와 데몬 연결
  - 소켓을 사용한 연결(기본값)
  - API를 사용한 원격 연결
- 도커 데몬 모니터링

#### **배운 내용**

##### **Dockerfile 명령어의 올바른 사용**

- `LABEL` 명령어를 사용해 이미지에 메타데이터를 추가할 수 있음. 이를 통해 `docker images --filter label=SOME_LABEL` 와 같은 필터링이 가능하다. 관리가 보다 용이해진다.
- `COPY` 와 `ADD` 명령어의 차이점
  - `COPY` 명령어는 파일을 복사한다.
  - `ADD` 명령어는 1. 파일을 복사하기도 하고, 2. 파일을 다운로드(URL) 받기도 하며, 3. 압축파일을 풀어서 복사하기도 한다.
    - 따라서 혼란을 유발하거나, 의도치 않은 변경된 리소스(URL)을 복사할 수 있다.
  - 결론적으로, 어지간하면 `COPY` 명령어를 사용하자.

##### **멀티 스테이지 빌드를 통한 이미지 크기 줄이기**

- 멀티 스테이지 빌드를 통해, 빌드 환경과 실행 환경을 분리 할 수 있다.
  - 이를 통해 실행 환경의 이미지를 더 가볍게 만들 수 있다.
    ```dockerfile
    # 빌드 환경 1 - 빌드를 위한 golang 이미지(대용량) 사용
    FROM golang
    ADD main.go /root
    WORKDIR /root
    RUN go build -o /root/mainApp /root/main.go

    # 빌드 환경 2
    FROM golang as builder2 # 이름을 지정해서 사용할 수도 있다.
    ADD main2.go /root
    WORKDIR /root
    RUN go build -o /root/mainApp2 /root/main2.go

    # 실행 환경 - alpine 이미지에 빌드된 파일만 복사
    FROM alpine:latest
    WORKDIR /root
    COPY --from=0 /root/mainApp . # 빌드 환경 1의 결과물 복사(인덱스 0)
    COPY --from=builder2 /root/mainApp2 . # 빌드 환경 2의 결과물 복사(이름 지정)
    CMD ["SOME_CMD"]
    ```

##### **컨테이너 보안이 중요한 이유**

- 컨테이너의 내부 사용자를 `root`로 사용하는 것을 피해야 하는 이유는, 볼륨이 공유된 경우 내부 사용자가 `root`로서 호스트의 파일 시스템에 접근할 수 있기 때문

##### **STOPSIGNAL 명령어**

- 컨테이너 종료 시 보내는 시그널을 설정한다.
  - `STOPSIGNAL SIGKILL` 과 같이 설정할 수 있다.
- `STOPSIGNAL` 기본값은 `SIGTERM`이며, 실제로 종료가 안전하게 되려면 애플리케이션이 해당 시그널을 수신하고 정리 작업을 수행할 수 있어야 한다.
  - 특히 Node.js 등에서는 `process.on('SIGTERM')` 등의 핸들러 구현이 필요하다.

##### **CMD와 ENTRYPOINT 명령어**

- `CMD`와 `ENTRYPOINT` 명령어의 차이점
  - `CMD`는 컨테이너 실행 시 실행되는 명령어를 설정한다.
  - `ENTRYPOINT`는 `CMD`를 인자로 사용할 수 있는 스크립트의 역할을 할 수 있다.

- 이에 유의하지 않으면 컨테이너의 상태 관측에 문제가 생길 수 있다.
  - 컨테이너는 **PID 1** 프로세스를 기준으로 컨테이너의 상태를 판단한다.
    - 따라서 어떤 프로세스가 **PID 1**을 차지하느냐가 신호 처리 및 종료 처리의 핵심이다.
  - `ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]`처럼 쉘을 통해 실제 실행 파일을 감싸면, **bash가 PID 1을 점유**하고 `/entrypoint.sh`는 그 하위 프로세스가 된다.
    - 이 경우 시그널이 애플리케이션까지 전달되지 않아 graceful shutdown이 실패할 수 있으며, `exec "$@"`로 실행을 위임하는 방식이 필요하다.
    - 따라서 복잡한 초기화 스크립트를 사용해야 하는 경우가 아니라면 **애플리케이션 바이너리나 런타임(node 등)을 직접 ENTRYPOINT로 설정**하는 것이 컨테이너 상태 추적 측면에서 가장 안전하다.
  - 반면 `ENTRYPOINT ["node", "index.js"]`처럼 직접 실행할 경우, `node`가 PID 1이 되며 **signal, exit code, 상태 모니터링 등에서 문제가 생기지 않는다.**
  - 이러한 이유로, 복잡한 초기화 스크립트를 사용해야 하는 경우가 아니라면 **애플리케이션 바이너리나 런타임(node 등)을 직접 ENTRYPOINT로 설정**하는 것이 컨테이너 상태 추적 측면에서 가장 안전하다.

- `CMD`와 `ENTRYPOINT`는 조합해서 사용 가능하며, 그 조합은 다음과 같이 동작한다:
  ```dockerfile
  ENTRYPOINT ["/bin/bash"]
  CMD ["entrypoint.sh"]
  ```
  → 실행 결과: `/bin/bash entrypoint.sh`  
  → 이 경우도 마찬가지로 `bash`가 PID 1이며 `entrypoint.sh`는 하위 프로세스로 동작한다.

##### **도커 데몬 제어**

- 도커 데몬은 기본적으로 소켓을 통해 클라이언트와 통신한다. 따라서 아래의 두 명령어는 같은 의미이다.

  ```bash
  dockerd
  dockerd -H unix:///var/run/docker.sock
  ```

- 이처럼 IP와 포트를 통해서도 도커 데몬과 통신할 수 있다. 다만 unix 소켓을 병기하지 않으면 도커 CLI를 통한 명령어 실행이 불가능하다.

  ```bash
  dockerd -H tcp://0.0.0.0:2375 --tls=false
  ```

- 도커 데몬 모니터링
  - 도커 데몬을 모니터링 하거나, 문제가 생겼을 때, 가장 간단한 방법은 `dockerd -D`로 디버깅 모드를 활성화하는 것이다.
  - 그 외에도 `docker events`, `docker stats`, `docker system df` 등 다양한 명령어를 통해 도커 데몬을 모니터링 할 수 있다.

#### **적용해볼 내용**

- 사용중인 도커 이미지에 `LABEL` 사용해서 관리 용이성 개선하기
- 멀티 스테이지 빌드로, 사내 활용중인 이미지의 설치 빌드 분리하여 이미지 크기 줄이기
