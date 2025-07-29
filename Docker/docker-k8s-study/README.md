# 시작하세요! 도커/쿠버네티스 스터디 로그

## 📅 스터디 개요
- **기간**: 2025.07.28 ~ 2025.08.15 (15일, 워킹데이)
- **목표**: 도커와 쿠버네티스 실무 역량 확보
- **일일 학습시간**: 2시간

---

## Week 1(7/28 ~ 8/1)

### Day 1 (7/28) - 도커 환경 구축
**📖 진도**: 1장 + 2.1
- **핵심 개념**
  - 컨테이너와 VM의 차이점
  - 도커 아키텍처 (daemon, client, registry)
  
- **실습 내용**
  - 해당 없음

### Day 2 (7/29) - 도커 이미지 관리
**📖 진도**: 2.2, 2.3
- **핵심 개념**
  - 도커 이미지와 컨테이너 개념
  - 볼륨과 네트워크
  - 로깅, 자원할당 옵션
  - 이미지의 구조, 레이어 관리
  
- **실습 내용**
  - 도커 컨테이너 다루기
  - 볼륨, 네트워크의 개념
  - 다양한 도커 컨테이너 명령어
    - `docker run -it ubuntu:24.04` 등 기본 커맨드
    - `docker logs <container_id>` 등 로깅 명령어
  - 이미지의 구조, 레이어 관리

- **배운 내용**
  - **몰랐던 유용한 커맨드**
    - `docker create -it ubuntu:24.04`
      - 컨테이너 생성만 하고 실행은 안함
    - `cmd + P, Q`
      - 컨테이너 끄지 않고 나가기
    - `docker attach <container_id>`
      - 컨테이너 접속: 맨날 `exec -it <container_id> bash` 썼었는데.. 이게 있었네..
      - `run` 과 `attach` 커맨드의 차이점
        - <img src="./images/day2/run-vs-attach.png" width="500">
  - **볼륨 컨테이너의 개념**
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

  - **MacOS에서 네트워크 환경**
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
  - **도커의 로깅**
    ```bash
    docker run -it ubuntu:24.04
      --log-opt max-size=10m # 로그 파일 최대 크기
      --log-opt max-file=3 # 로그 파일 최대 개수
      --log-opt compress=true # 로그 파일 압축
    ```

  - **컨테이너 자원 할당 제한**
    ```bash
    docker run -d
      --memory=1g # 메모리 제한
      --memory-swap=2g # 메모리 + 스왑 제한
      --cpu-shares=1024 # CPU 가중치, 1024이면 100% 사용
      --cpuset-cpus=0,1 # CPU 셋, 0번과 1번 코어만 사용
      --cpu-period=100000 # CPU 주기
      --cpu-quota=50000 # CPU 할당량, 주기 중 50% 사용
      --cpus=2 # CPU 제한, 2개 코어 사용
    ```
      - `--cpus` 옵션이 간단하기는 하지만, `--cpuset-cpus` 옵션이 더 유리하다.
        - 이는 CPU를 직접 지정할 수 있으므로 CPU 친화성이 높고, 불필요한 캐시미스, 컨텍스트 스위칭을 방지하여 성능상 이점이 있다.

  - **도커 이미지 관리**
    - `docker save` 명령어로 하나의 파일로 내보낼 수 있다.
      - 간단한 이미지를 바로 OCI 저장소에 올릴 수 있을듯.
    - 반대로 `docker load` 명령어로 이미지를 불러올 수 있다.

- **적용해볼 내용**
  - `docker save` 명령어로, 사내에서 테스트에 사용할 골든 이미지 업로드 가능한지 적용해보기
  - 홈 서버용 사설 레지스트리 구축 및 적용 해보기
