---
title: 기타 알아둘것들
date: 2022-08-04
tags: [기타 알아둘것들, 하드웨어, 마케팅, 도메인, 용어, 노출, 도달, 빈도, 클릭, CTR, CTA, CPC, CPM, CPT, CPA, 전환, 전환 당 비용, 전환율, 반송, 이탈율, DAU, WAU, MAU, PU, ARPU, ARPPU, MoM, 롤링배너, 리치미디어 광고, 시즈널 키워드, 네이티브 광고, DA, SA, RTB, Vim, Redis, curl, Nginx, Supervisor, Ansible, Terraform, Hey]
alias: [기타 알아둘것들]
---

# 기타 알아둘것들

## 쓸모있는 팁

- 하드웨어 플랫폼 확인
  - uname -m
- 내 IP 확인
  - curl ifconfig.me

## 마케팅 도메인 용어

- 노출(Impression): 콘텐츠가 소비된 횟수(건)
- 도달(Reach): 콘텐츠를 소비한 유저의 수(명)
  - UV(Unique Visitor)
  - PV(Page View)
- 빈도: 노출과 도달의 비율. 본 사람이 또 보는 경우. 늘어날수록 중복 노출
- 클릭: 광고를 클릭하여 랜딩페이지로 이동하는 것.
- CTR(Click-Through Rate): 노출 수 대비 클릭 수
- CTA(Call to Action): 소비자의 반응을 유도하는 행위 또는 요소
- CPC(Cost Per Click): 1회 클릭 당 비용
- CPM(Cost Per Mile): 1,000회 노출 당 비용
- CPT(Cost Per Time): 시간당 비용
- CPA(Cost Per Action): 참여당 과금
- 전환: 사용자가 구매 등 유의미한 행동을 하는 것
- 전환 당 비용: 사용자가 전환하게 만드는 데 드는 비용
- 전환율(CR;Conversion Rate): 전환수 / 유입수 x 100
- 반송: 유저가 페이지를 방문하고 전환 없이 나가는 경우
- 이탈율(BR;Bounce Rate): 방문수 대비 반송수의 비율. 반송수 / 방문수 x 100

- DAU(Daily Active Users): 하루동안 방문한 순수 사용자 수
- WAU(Weekly Active Users): 일주일동안 방문한 순수 사용자 수
- MAU(Monthly Active Users): 한달동안 방문한 순수 사용자 수

- PU(Paying Users): 유료 유저 수(결제한 유저 수)
- ARPU(Average Revenue Per Users): 유저별 평균 매출. 객단가
- ARPPU(Average Revenue Per Paying Users): 유료 유저별 평균 매출. 결제자객단가

- MoM(Month on Month): 전월 대비 증감률

- 롤링배너(Rolling Banner): 2개 이상의 광고가 번갈아 나오는 배너
- 리치미디어 광고(Rich Media Advertising): 새로운 기술을 적용해 풍부한 효과를 주는 형식의 광고 - 상호작용 등

- 체류시간(DT; Duration Time): 사용자가 사이트에 접속해서 머무는 시간. PV(Page View)와 함께 고객 충성도를 가늠하는 지표.

- 타겟팅 광고(Targeting Advertising): 특정 계층만을 상대로 노출하여 효율을 높이는 광고
- 리타겟팅 광고(Retargeting Advertising): 특정 페이지를 열람한 경험이 있는 소비자에게 광고를 보여주는 것.

- 시즈널 키워드(Seasonal Keyword): 명절 등 특정 시기에 따라 조회수와 광고효과가 급상승하는 키워드

- 네이티브 광고(Native Advertising): 언론 기사와 유사하게 보이도록 디자인된 온라인 광고 형태

- DA(Display Advertising): 인터넷을 통해 진행할 수 있는 가장 기본적인 온라인 광고
- 온라인 광고
- SA(vertising): 특정 키워드 검색 시 결과에 노출되는 광고
- RTB(Real Time Bidding): 실시간 광고 입찰 시스템

## Vim

- h, j, k, l
- i(insert), a(append), I, A // 시작, 끝 이동+수정
- 0, $ // 문장 시작, 끝 이동
- w, b // 3w, 3b
- H(high), M(middle), L(low) // 화면상 이동
- gg, G, 10G // 맨위, 맨 아래, 줄번호 지정
- ctrl u, ctrl d // 위아래 스크롤
- {, } // 문단 시작, 끝
- x // 글자 삭제
- dd // 문장 삭제
- yy // 문장 복사
- p // 붙여넣기
- *p // 클립보드

- d + it // delete + inner tags
- command: d, y, c
- object: it, aw, at, ap, as, i", ip, i(, i{,
- object: j, k
- .
- /, ? // 검색

- v // 선택 -> vaw...
- ctrl v //

## Redis

### 설치

```bash
sudo add-apt-repository ppa:redislabs/redis
sudo apt update
sudo apt upgrade
sudo apt install -y redis-server
```

### 버전확인

```bash
redis-server -v
```

### 설정

```bash
sudo vi /etc/redis/redis.conf

# maxmemory 1g
# maxmemory-policy allkeys-lru

sudo systemctl restart redis-server.service # restart
```

- maxmemory: 최대 메모리 크기
- maxmemory-policy: 메모리가 가득찼을 때의 데이터 삭제 정책. volatile-*은 삭제가능한 대상이 없으면 OOM 오류 발생 / ★은 추천 정책
  - noeviction(★): 기존 데이터 삭제 안함. 메모리 한계에 도달하면 OOM 오류 반환하며 새 데이터가 저장되지 않음.
  - allkeys-lru(★): 모든 키 중에서 LRU 기준으로 삭제하여 공간확보
  - allkeys-random: 모든 키 중에서 랜덤으로 삭제하여 공간확보
  - volatile-lru(★):  expire set을 가진 것 중 LRU로 삭제하여 공간확보
  - volatile-ttl(★★): expire set을 가진 것 중 TTL이 짧은 것부터 삭제하여 공간확보
  - volatile-random: expire set을 가진 것 중에서 랜덤으로 삭제하여 공간확보

### 포트 확인

```bash
ps -ef | grep redis
netstat -nlpt | grep 6379
```

### 레디스 삭제

```bash
sudo systemctl stop redis-server
sudo systemctl disable redis-server
sudo apt-get remove redis-server
sudo apt-get purge redis-server
sudo rm -rf /etc/redis /var/lib/redis
```

### 접속

- 사용법 : redis-cli -h [접속 IP] -p [포트] -a [패스워드] -n [DB번호] -c(클러스터)
  - redis-cli -h 127.0.0.1 -p 6379 -a foobared -n 0

### 셋

- 사용법 : SET [Key] [Value]
  - 127.0.0.1:6379> SET redis cacheserver

### 겟

- 사용법 : GET [Key]
  - 127.0.0.1:6379> GET redis

### 삭제

- 사용법 : DEL [Key]
  - 127.0.0.1:6379> DEL redis

### 잔류시간

- 사용법 : TTL [Key]
  - 127.0.0.1:6379> ttl redis -> 사라지지 않으면 -1

### 존재여부

- 127.0.0.1:6379> EXIST [Key]

### 랜덤확인

- 127.0.0.1:6379> RANDOMKEY [Key]

### 타입 확인

- 127.0.0.1:6379> TYPE [Key]

### key의 전체 개수

- 127.0.0.1:6379> DBSIZE [Key]

### 전체조회

- 127.0.0.1:6379> KEYS *  
  *: 다수 문자  
  ?: 하나의 문자

### 모두삭제

- 127.0.0.1:6379> FLUSHALL

### 외부

### 정보 확인

redis-cli -p 1111 info

### 모니터링

redis-cli -p 1111 monitor

참고: [redisgate](http://redisgate.kr/redis/command/common.php)

## curl

- -X : GET, POST 등 method 지정
- -H : header 지정, bearer token 등도 가능
- -d : form 등 데이터. 추가 시 자동으로 POST로 인식

참고: [Software Architect](https://www.lesstif.com/software-architect/curl-http-get-post-rest-api-14745703.html)  

## Nginx

```shell
server {
    listen 80;
    listen [::]:80;

    server_name server1 www.server1.com;

    access_log /var/log/nginx/server1.access.log;
    error_log /aar/log/nginx/server1.error.log;

    location / {
        include /etc/nginx/proxy_params;
        proxy_pass http://127.0.0.1:3000/;
    }
    location / {
        include /etc/nginx/proxy_params;
        proxy_pass http://127.0.0.1:3000/;
    }
    location / {
        root /static/;
        # try_files $uri $uri =404;
    }
}
```

  참고: [멍개님 블로그](https://blog.naver.com/PostView.nhn?blogId=pjt3591oo&logNo=222242046633&parentCategoryNo=&categoryNo=92&viewDate=&isShowPopularPosts=false&from=postView)  

---

## Supervisor

### install

- ubuntu

  ```shell
  sudo apt-get install supervisor
  ```

- centOS

  ```shell
  yum install supervisor
  ```

- python pip

  ```shell
  sudo pip install supervisor
  ```

### Configure

  ```shell
  [program:laravel-worker]
  process_name=%(program_name)s_%(process_num)02d
  command=php /home/forge/app.com/artisan queue:work sqs --sleep=3 --tries=3 --max-time=3600
  autostart=true
  autorestart=true
  stopasgroup=true
  killasgroup=true
  user=forge
  numprocs=8
  redirect_stderr=true
  stdout_logfile=/home/forge/app.com/worker.log
  stopwaitsecs=3600
  ```

- 필요시 sudo -u USER로 유저 변경

- 이후 supervisord.conf에 include 추가

  ```shell
  [include]
  files = /etc/supervisor/laravel-worker.conf
  ```

### Start

```shell
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start laravel-worker:*
```

### Check

```shell
sudo supervisorctl status
```

---

## Ansible

참고: [wikidocs 개발자가 앤시블 시작하기](https://wikidocs.net/book/6350)  

## Terraform

- 프로비저닝 도구

참고: [테라폼이란?](https://www.44bits.io/ko/keyword/terraform)  
참고: [테라폼 튜토리얼](https://www.44bits.io/ko/post/terraform_introduction_infrastrucute_as_code)  

## Hey

- 매우 간단한 웹서버 벤치마킹 툴

```zsh
brew install hey
```

- 옵션
  > -n: Request의 총 개수  
  > -c: Worker의 개수 지정(n >= c)  
  > -z: Duration, 지정 시 n옵션 무시  
  
  ```zsh
  # ex) hey -z 10s -z 3m -c 9 http://localhost:8080/
  ```

## wrk & wrk2

```zsh
wrk -c 10 -d S http://127.0.0.1:8000/random_user
```

```zsh
wrk -c 100 -d S http://127.0.0.1:8000/random_user
```

```zsh
# 좀 더 자세한 결과 확인(latency)
wrk -c 100 -d S --latency http://127.0.0.1:8000/random_user
```

```zsh
wrk2 -c 100 -d 30 -R 100 --latency http://127.0.0.1:8000/random_user
```

참고: [wrk2 github](https://github.com/giltene/wrk2)
참고: [엘리스 코딩](https://www.youtube.com/watch?v=HSNyJnobBws)

---

### 참고하면 좋은 사이트 목록

- [레딧](https://www.reddit.com/r/learnprogramming/)
- [Just Five News](https://www.justfive.news/)
- [AnandTech](https://www.anandtech.com/)
- [Tom's Hardware](https://www.tomshardware.com/)
- [Digital Trends](https://www.digitaltrends.com/)
- [Digital Ocean](https://www.digitalocean.com/community/tutorials)

### 구글 검색 팁

- 따옴표 사용
  - 특정 문구를 반드시 포함하는 검색결과 확인용. 특히 에러코드, 에러메시지 검색 시 용이
  - ex) "python" "django"
- site: 사용
  - 특정 사이트에서만 검색결과 확인용.
  - ex) 사이트 내부 검색, 특정 도메인 검색, 도메인 내 https 미적용 사이트 검색
    - site:stackoverflow.com python django
    - site:*.kbstar.com/
    - site:*.kbstar.com/ -inurl:https
- link: 사용
  - 특정 사이트에서 링크된 페이지 검색결과 확인용.
  - ex) link:stackoverflow.com python django
- \* 사용 (와일드카드)
  - 특정 단어로 시작하는 검색결과 확인용.
  - ex) come *right now* me(비틀즈 노래가사)
- related: 사용
  - 특정 사이트와 관련된 사이트 검색결과 확인용.
  - ex) related:stackoverflow.com python django
- OR 사용 ('|'도 가능)
  - 두 단어 중 하나라도 포함된 검색결과 확인용.
  - ex) python OR django
- .. 사용 (점 두개)
  - 특정 범위의 검색결과 확인용.
  - ex) python 2019..2022
- \- 사용 (대시)
  - 특정 단어를 제외한 검색결과 확인용.
  - ex) python -django
- \+ 사용 (플러스)
  - 특정 단어를 반드시 포함한 검색결과 확인용.
  - ex) python +django
- AROUND(X) 사용
  - 특정 단어를 포함하고, 주변 단어가 X개 이내인 검색결과 확인용.
  - ex) python AROUND(2) django

### VSCode Tips

#### 단축키 목록

1. 다중선택 cmd + d
2. 탐색기 cmd + b
3. 탐색기 포커스 cmd + shift + e
   1. 화살표, 스페이스바
4. 검색 cmd + f
5. 전체검색 cmd + shift + f
6. 분할/포커스 이동 cmd + 1~9
7. 에디터 이동 cmd + shift + [, ]
8. 에디터 종료 cmd + w
9. 새 에디터 cmd + n
10. 에디터 언어 설정 cmd + k, m
11. 포멧팅 cmd + k,f
12. 전체삭제 cmd + k, w
13. 최근 디렉토리 ctrl + r
14. 터미널 cmd + j

#### 커맨드라인 활용

1. 파일검색 cmd + p

2. 실행 cmd + shift + p
   1. Snake ↔ Camel (or Pascal… kebab….)
   2. Developer: Reload Window

3. 심볼 cmd + shift + o || '@' || '@:'

4. 글로벌 심볼 cmd + t || '#'

5. 라인이동 ctrl + g || ':'

***이 모든건 ‘?’ 로 확인 가능***

### Naming Convention

#### 메소드명

- remove vs delete
  - remove
    - 객체를 삭제하는 것이 아니라, 객체를 참조하는 것을 삭제하는 것.
    - **객체 삭제게 실패하면 에러가 발생함**
    - 하나의 아이템을 삭제할 때 DB에 두 번 접근함.
  - delete
    - 객체를 삭제하는 것.

- get vs find - [reference](https://tuhrig.de/find-vs-get/)
  - get
    - 객체 혹은 exception을 반환하는 것.
    - 객체를 가져오는데 짧은 시간이 소요됨
  - find
    - 객체를 반환하되, null일 수 있는 것.
    - 객체를 가져오는데 상대적으로 긴 시간이 소요됨

- create vs new - 별 차이 없음
  - create
    - 객체를 생성하고 초기화 하는것
  - new
    - 객체를 생성하는 것.

---

- add vs append
  - add
    - 객체를 추가하는 것.
  - append
    - 객체를 추가하는 것.

- update vs modify
  - update
    - 객체를 수정하는 것.
  - modify
    - 객체를 수정하는 것.

- set vs put
  - set
    - 객체를 설정하는 것.
  - put
    - 객체를 설정하는 것.

- save vs store
  - save
    - 객체를 저장하는 것.
  - store
    - 객체를 저장하는 것.

- load vs fetch
  - load
    - 객체를 불러오는 것.
  - fetch
    - 객체를 불러오는 것.

- check vs validate
  - check
    - 객체를 검사하는 것.
  - validate
    - 객체를 검사하는 것.

- is vs has
  - is
    - 객체가 어떤 것인지 확인하는 것.
  - has
    - 객체가 어떤 것을 가지고 있는지 확인하는 것.

- count vs length
  - count
    - 객체의 개수를 세는 것.
    - 연결 리스트
  - length
    - 객체의 길이를 세는 것.
    - 어레이

- clear vs reset
  - clear
    - 객체를 초기화하는 것.
  - reset
    - 객체를 초기화하는 것.

- start vs begin
  - start
    - 객체를 시작하는 것.
  - begin
    - 객체를 시작하는 것.

- end vs finish
  - end
    - 객체를 끝내는 것.
  - finish
    - 객체를 끝내는 것.

- stop vs pause
  - stop
    - 객체를 멈추는 것.
  - pause
    - 객체를 멈추는 것.

- resume vs continue
  - resume
    - 객체를 재개하는 것.
  - continue
    - 객체를 재개하는 것.

- open vs close
  - open
    - 객체를 열어주는 것.
  - close
    - 객체를 닫아주는 것.

- show vs hide
  - show
    - 객체를 보여주는 것.
  - hide
    - 객체를 숨겨주는 것.

- enable vs disable
  - enable
    - 객체를 활성화하는 것.
  - disable
    - 객체를 비활성화하는 것.

- select vs choose
  - select
    - 객체를 선택하는 것.
  - choose
    - 객체를 선택하는 것.

- move vs shift
  - move
    - 객체를 이동시키는 것.
  - shift
    - 객체를 이동시키는 것.

- copy vs clone
  - copy
    - 객체를 복사하는 것.
  - clone
    - 객체를 복사하는 것.

- destroy vs kill
  - destroy
    - 객체를 파괴하는 것.
  - kill
    - 객체를 파괴하는 것.

- create vs make
  - create
    - 객체를 만드는 것.
  - make
    - 객체를 만드는 것.

- add vs plus
  - add
    - 객체를 더하는 것.
  - plus
    - 객체를 더하는 것.

- subtract vs minus
  - subtract
    - 객체를 빼는 것.
  - minus
    - 객체를 빼는 것.

- multiply vs times
  - multiply
    - 객체를 곱하는 것.
  - times
    - 객체를 곱하는 것.

- divide vs by
  - divide
    - 객체를 나누는 것.
  - by
    - 객체를 나누는 것.

- increment vs decrement
  - increment
    - 객체를 증가시키는 것.
  - decrement
    - 객체를 감소시키는 것.

- increase vs decrease
  - increase
    - 객체를 증가시키는 것.
  - decrease
    - 객체를 감소시키는 것.

- raise vs lower
  - raise
    - 객체를 높이는 것.
  - lower
    - 객체를 낮추는 것.

- increase vs decrease
  - increase
    - 객체를 증가시키는 것.
  - decrease
    - 객체를 감소시키는 것.

#### 변수명
