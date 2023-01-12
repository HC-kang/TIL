# SQL

## MySQL

### 자주쓰는 커맨드

- 컬럼정보 수정

    ```SQL
    ALTER TABLE 테이블명 MODIFY COLUMN 컬럼명 자료형 AFTER 다른컬럼;
    ```

- 컬럼 추가

    ```SQL
    ALTER TABLE 테이블명 ADD 컬럼명 자료형 AFTER 다른컬럼;
    ```

- 컬럼 삭제

    ```SQL
    ALTER TABLE 테이블명 DROP COLUMN 컬럼명;
    ```
