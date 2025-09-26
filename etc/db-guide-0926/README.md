# 사고치지 않는 신입 개발자를 위한 DB 생존 가이드

- DBA 이재환님

## 목차

- 강의 목적
- 안전한 CRUD
- 인덱스
- 무중단 ALTER
- 응급처치
- DB 선택

## 강의 목적

## 안전한 CRUD

### Create

- INSERT는 특성상 가능한 튜닝이 많지 않음.
- 배치인서트 사용 권장
  - 단일 인서트 사용시 커밋 비용이 상당히 큼
  - 배치 인서트만으로도 트래픽을 줄일 수 있음.
  - 종종 단건 인서트로 인한 스파이크도 발생
  - 그래서 몇 건? 500~2,000건
    - 한번에 너무 큰 값이 가도 DB가 터질 수 있다.
  
- 정리
  |구분 | 장점 | 단점 |
  |---|---|---|
  |단일 인서트| 이해 및 구현이 간단 | 대량 삽입 시 네트워크 왕복 오버헤드 발생 |
  |배치 인서트| - 쿼리별 트랜잭션 제어 용이<br>- 네트워크 왕복 횟수 줄여 성능 향상<br>- 대량 데이터 처리에 효율적 | - 성능저하 가능성<br>- 거래 단위가 한번에 묶여 복구시 세밀한 제어 어려움<br>- 너무 큰 배치로 인한 부하 유발 가능 |

### Read

#### SELECT의 트래픽 분산: Read-Only 계정의 전략

- 기본 세트는 마스터 1, 슬레이브 1
  - Master DB
    - INSERT, UPDATE, DELETE.
    - 쓰기 트래픽 전담
    - 마스터에서 셀렉트 하지 말기.
      - 그러나 피할 수 없는 상황이 있음.
        - 둘 사이의 타임랙
        - 혹은 트랜젝션이 묶이는 경우 등
  - Slave DB(Replica)
    - SELECT 조회
    - 읽기 트래픽 전담
    - 복제에서 SELECT도 장애가 날 수 있음... 그래도 그나마 낫지
- 장점
  - 부하 분산
  - 데이터 안전성

#### SELECT *는 금물

- 솔직히 select *가 편하긴 함.. 그런데 만약 쓰더라도 limit은 꼭 써야함.
  - 특히 JSON, BLOB등 있으면..
- 커버링 인덱스 활용 불가
  - 인덱스 만으로 데이터를 조회 할 수 없음
  - 결국 테이블을 풀 스캔 해야함
  - 이는 디스크 IO가 매우 큼
- 유지보수성이 떨어짐
  - 컬럼 추가 시 버그 발생 가능성 증가
  - 명시적으로 컬럼 목록을 지정하는 것이 유지보수성이 높음

### Update

#### Rollback을 대비하자

- `START TRANSACTION`으로 트랜잭션 열고 시작하기
- 틀린 경우 `ROLLBACK`으로 롤백
- 그러나 명령어로서의 롤백뿐 아니라, 뭔가 작업 할 때 꼭 뒤로 돌아갈 수 있게 하자

#### 트랜잭션을 구분하자(Offset, Limit) -> Cursor를 사용하자

- 예시. 그러나 Offset, Limit은 쓰지 말자.
  - offset은 쌓이면 조회 성능이 느려지고, 부하가 된다.

```sql
SET @batch_size = 5000;
SET @offset = 0;
SET @total_rows = (SELECT COUNT(*) FROM test_users WHERE user_id > 0);

WHILE @offset < @total_rows DO

    START TRANSACTION;
    UPDATE test_users
    SET email = REPLACE(email, 'example.com', 'example.org')
    WHERE user_id in (
        SELECT user_id FROM test_users WHERE user_id > @offset LIMIT @batch_size
    );

    COMMIT;

    SET @offset = @offset + @batch_size;
END WHILE;
COMMIT;
```

```sql
...
```

### Delete

#### 트랜잭션을 구분하자(Offset, Limit) -> Cursor를 사용하자

- 동일

## 인덱스

- 인덱스를 반드시 고려해야 하는 곳
  - WHERE 절
  - JOIN 절
  - ORDER BY 절

- 실행계획 사용하기(explain)
  - 실제 데이터를 읽는게 아닌, 통계만 사용하기에 부하가 적음
  - rows(MySQL이 검색해야 하는 예상 행 수) 확인: 적을 수록 인덱스가 효과적으로 사용된 것
  - type(데이터를 검색하는 방식) 분석. All이 느리고, Index는 풀스캔이므로 주의
  - extra 정보 확인. 쿼리 실행시 추가 작업이 필요한 경우
    - Using filesort: 데이터를 메모리에 정렬하는 것. 느림
    - Using temporary: 임시 테이블을 사용하는 것. 느림
      - 임시 테이블은 GROUP BY, ORDER BY 등에서 데이터가 너무 큰 경우 생성됨

- 복합 인덱스
  - 장점
    - 여러 컬럼을 동시에 검색할 때 성능 우수
    - 하나의 복합 인덱스로 여러 단일 인덱스 대체 가능
  - 단점
    - 선행 컬럼 없이는 인덱스가 옵티마이저의 선택 받기 어려움
    - 하나의 컬럼이 수정되더라도 모든 인덱스가 수정되어야 함

## 무중단 ALTER

- [참고](https://dev.mysql.com/doc/refman/8.4/en/innodb-online-ddl-operations.html)
- [pt-osc](https://docs.percona.com/percona-toolkit/pt-online-schema-change.html)

- ALTER 종류에 따라 락이 걸릴 수 있음
- ALGORITHM=INPLACE
  - 테이블 복사 없이 메타데이터만 변경
  - 빠르고 IO 부하 적음
  - 레코드 재정렬시 쓰기 블록
- ALGORITHM=COPY
  - 변경된 스키마로 테이블 전체 복사
  - 안정적인 방법
  - 쓰기가 중단되고, 시간/디스크 소모 큼
- LOCK=NONE
  - DDL 중에도 읽기/쓰기 모두 허용
  - 서비스 영향이 가장 적지만, 가능한 알고리즘과 작업 종류가 제한적
- LOCK=SHARED
  - 읽기만 가능
  - 쓰기 락이 걸리지 않음
- LOCK=EXCLUSIVE
  - 쓰기만 가능
  - 읽기 락이 걸리지 않음

- (경험적) 보통 1G에 2분 가량 걸림

- pt-osc
  - 옵션
    - chunk-size:
    - sleep
    - no-drop-old-table: 롤백 준비
  - 경험적 최고의 조합은 chunk-size=5000, sleep=0.01

## 응급처치

- 막연한 DB 이상 제보시
  - 접속이 가능하다면 `SHOW FULL PROCESSLIST` 확인
    - 대부분 Time이 오래 묶여있는 경우가 있음.
      - Sending data, Copying to tmp table...
  - 접속이 불가능하다면 `SHOW ENGINE INNODB STATUS` 확인
    - 중요한 정보가 있음
      - Current buffer pool size: 버퍼 풀 크기
      - Buffer pool hit rate: 버퍼 풀 히트율
      - Buffer pool size: 버퍼 풀 크기
      - Buffer pool size: 버퍼 풀 크기
- 가독성 높이기: `pager less -S`
- 작업 기록하기: `tee`

- DB 모니터링 지표 4종
  - CPU & Memory: top, vmstat
  - Slow Log: long_query_time=1
  - Error Log: InnoDB deadlock, aborted connection
  - CloudWatch & Grafana: QPS, TPS, Replication Lag, Connection...

- 주요 지표
  - Uptime
  - QPS
  - ...

## DB 선택

- 목적에 맞는것.
- 손에 익은 것.
- 팀원의 숙련도가 높은것.
