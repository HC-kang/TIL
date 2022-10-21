# ElasticSearch

## ES와 RDBMS 비교

1. 기본개념
    |ES|RDBMS|
    |------|---|
    |Index|Database|
    |Shard|Partition|
    |Type|Table|
    |Document|Row|
    |Field|Column|
    |Mapping|Schema|
    |Query DSL|SQL|
2. 메소드
    |ES|RDBMS|
    |------|---|
    |GET|SELECT|
    |PUT|INSERT|
    |POST|UPDATE, SELECT|
    |DELETE|DELETE|
    |HEAD(인덱스 정보 확인)|-|

## ES

1. 특징
    1. NoSQL의 일종
    2. 분산처리로 빠른 검색 가능
2. 장단점
    1. 장점
        1. 기능별, 언어별 전문검색 가능
        2. Kibana와 연계한 통계분석
        3. Schemaless
        4. RESTful API
        5. Multi-tenancy: 필드명이 같으면 다른 인덱스끼리도 검색 가능
    2. 단점
        1. 내부적인 commit, flush 과정으로 인해, 완전한 실시간은 아님.
        2. Transaction, Rollback을 지원하지 않음.
        3. Update를 지원하지 않음: Update 메소드는 기존 문서를 삭제하고 새 문서를 등록하는 것. - Immutable
3. 기본 용어
    ![image](https://miro.medium.com/max/1400/0*p6W7hmlErtczICVW.png)
    - Lucene: 검색엔진의 시초 이후 아파치 솔라(Solr), ES 순으로 등장
    1. Index
        - 데이터 저장공간
        - 하나의 물리 노드에 여러 논리 인덱스 생성
        - 하나의 인덱스가 여러 노드에 분산 저장(M:N)
    2. Shard(=Partition)
        - 색인된 데이터는 여러개의 파티션으로 나뉘어 구성
    3. Type
        - 인덱스의 논리적 구조
        - 인덱스당 하나의 타입만 설정 가능
    4. Document
        - 데이터가 저장되는 최소단위
        - JSON 포멧
        - RDB의 row에 해당.
    5. Field
        - 문서를 구성하기 위한 속성
        - DB의 컬럼과 비교
        - *다수의 데이터타입을 가질 수 있음*
    6. Mapping
        - 스키마 정의

## 자주쓰는 명령어

### Pending task 확인

- 일반적인 상황에서는 empty list 반환
- pending 되어 있는 작업이 있는 경우 그 리스트 반환

```json
GET _cluster/pending_tasks
```

### hot threads 확인

- GC가 비정상적이거나 CPU가 높거나 검색이 밀리는 등 대부분의 문제의 원인을 유추할 수 있음

```json
GET _nodes/hot_threads?pretty

GET _nodes/node-01/hot_threads
GET _nodes/node-02/hot_threads
GET _nodes/node-03/hot_threads
```

### Cluster & Node 상태 확인

```json
GET _cluster/health
GET /_cat/nodes

# curl 명령어
# 인증서 미적용
curl -i http://x.x.x.x:9202
curl -XGET "x.x.x.x:9202/_cat/nodes?v"
curl http://x.x.x.x:9202/_cluster/health

# 인증서 적용시
curl -i -k -u elastic https://x.x.x.x:9202
curl -k -u elastic -XGET "https://x.x.x.x:9202/_cat/nodes?v"
curl -k -u elastic https://x.x.x.x:9202/_cluster/health?pretty
```

### Index 정보 확인

```json
# 모든 인덱스 확인
GET _cat/indices?v&s=index

# 특정 인덱스 확인
GET _cat/indices/hunet-app-b2b-2019-*?v&s=index

# 인덱스 health 확인
GET _cat/indices?health=yellow

# 인덱스 생성
PUT travel-log
{
  "settings": {
    "index": {
      "number_of_shards": "3",
      "number_of_replicas": "1"
    }
  },
  "mappings": {
    "properties": {
      "start_date": {
        "type": "keyword"
      },
      "end_date": {
        "type": "keyword"
      },
      "place": {
        "type": "keyword"
      },
      "word": {
        "type": "keyword"
      }
    }
  }
}

# 인덱스 내 데이터 검색
GET travel-log/_search
{
  "query": {
    "bool": {
      "should": [
        { "match_phrase": { "word": "여행" } },
        { "match_phrase": { "word": "제주도" } },   
        { "match_phrase": { "word": "바다" } }
      ]
    }
  }
}

# 인덱스 내 데이터 삭제
POST travel-log/_delete_by_query?wait_for_completion=true
{
  "query": {
    "bool": {
      "should": [
        { "match_phrase": { "word": "여행" } },
        { "match_phrase": { "word": "제주도" } },   
        { "match_phrase": { "word": "바다" } }
      ]
    }
  }
}
```

### template 정보 확인

```json
# 전체 template 확인
GET _cat/templates?v&s=name

# 특정 template 상세정보
GET _template/travel-log-template

# default template 확인
GET _template/default

# template 삭제
DELETE _template/travel-log-template
l
# template 생성
PUT _template/travel-log-template
{
  "order": 2,
  "index_patterns": [
    "travel-log-*"
  ],
  "settings": {
    "index": {
      "number_of_shards": "3",
      "number_of_replicas": "1"
    }
  },
  "mappings": {
    "dynamic_templates": [
      {
        "strings_as_keywords": {
          "mapping": {
            "type": "keyword"
          },
          "match_mapping_type": "string"
        }
      }
    ]
  },
  "aliases": {}
}

# ilm template 생성
PUT _template/daily-log-template
{
  "order": 2,
  "index_patterns": [
    "daily-log-*"
  ],
  "settings": {
    "index": {
      "number_of_shards": "3",
      "number_of_replicas": "1",
      "lifecycle": {
        "name": "daily-log-lim",
        "rollover_alias": "daily-log"
      }
    }
  },
  "mappings": {
    "dynamic_templates": [
      {
        "strings_as_keywords": {
          "mapping": {
            "type": "keyword"
          },
          "match_mapping_type": "string"
        }
      }
    ]
  }
}
```

### 샤드 할당 확인 및 강제 할당

```json
GET /_cluster/allocation/explain

POST /_cluster/reroute?retry_failed=true
```

### 스냅샷

```
# 스냅샷 확인
GET /_snapshot
GET /_snapshot/*20210612
GET /_snapshot/_all

# 스냅샷 리스트 및 스냅샷 시작/종료시간 확인
GET _snapshot/all_backup/all_backup_20210513

# 스냅샷 진행 상태
GET _snapshot/all_backup/all_backup_20210513/_status

# 스냅샷 삭제(종료)
DELETE _snapshot/all_backup/all_backup_20210513

# 스냅샷 확인
GET _snapshot/travel-log-20210714/_all

# 복원
POST _snapshot/travel-log-20210714/travel-log-2021.07.28/_restore?wait_for_completion=false
{
  "indices": ["travel-2021.07.28"]
}

# 복원 확인
GET _cat/recovery/lms-app-logging-audit-2020.07.28?v
```

### Task

```json
# 실행중인 Task 확인
GET _tasks
GET _cat/tasks?v
GET _tasks?nodes=node-1, node-2
GET _tasks/vIYMDSJ3TGCGFtcu3Btp6w:521843726
GET _cat/tasks?detailed
GET _tasks?actions=*reindex
GET _tasks?actions=*reindex&wait_for_completion=true&timeout=10s

# Task 취소
POST _tasks/vIYMDSJ3TGCGFtcu3Btp6w:521843726/_cancel
Task Management API | Elasticsearch Reference [6.8] | Elastic
```

### Index open & close

- 서버 검색성능을 위해 사용하지 않는 인덱스를 언제든 열고닫을 수 있음.

```json
POST travel-log/_close
POST travel-log/_open
```

---

참고: [Elastic 가이드북](https://esbook.kimjmin.net/05-search/5.2-bool)  
참고: [elasic docs](https://www.elastic.co/guide/kr/elasticsearch/reference/current/getting-started.html)  
참고: [Jaemun Jung님 블로그](https://jaemunbro.medium.com/elastic-search-%EA%B8%B0%EC%B4%88-%EC%8A%A4%ED%84%B0%EB%94%94-ff01870094f0)
참고: [data-traveler님 블로그](https://velog.io/@data-traveler/Elasticsearch-%EC%9E%90%EC%A3%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%AA%85%EB%A0%B9%EC%96%B4)
참고: [soyeon207님 블로그](https://velog.io/@soyeon207/ES-5.-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B2%80%EC%83%89%ED%95%98%EA%B8%B0)
