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

## test

---

참고: [Elastic 가이드북](https://esbook.kimjmin.net/05-search/5.2-bool)  
참고: [elasic docs](https://www.elastic.co/guide/kr/elasticsearch/reference/current/getting-started.html)  
참고: [Jaemun Jung님 블로그](https://jaemunbro.medium.com/elastic-search-%EA%B8%B0%EC%B4%88-%EC%8A%A4%ED%84%B0%EB%94%94-ff01870094f0)
