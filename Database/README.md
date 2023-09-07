# MySQL

## 자주 쓰는 명령어

### 접속

```bash
mysql -u root -p --port 3306
```

### DB, 테이블 조회

```bash
show databases;
show tables;
```

### DB 백업

```bash
mysqldump -u <USER> -p <DATABASE_NAME> > <DB_FILE_NAME>.sql
```

### 테이블 백업

```bash
mysqldump -u <USER> -p <DATABASE_NAME> <TABLE_NAME> > <DB_FILE_NAME>.sql
```

### DB, 테이블 복원

```bash
mysql -u <USER> -p <DATABASE_NAME> < <DB_FILE_NAME>.sql
```

### 모든 DB 백업

```bash
mysqldump --all-databases -u <USER> -p --default-character-set=euckr < <DB_FILE_NAME>.sql
```

### 모든 DB 복원

```bash
mysql --all-databases -u <USER> -p < <DB_FILE_NAME>.sql
```


## 참고사항

### 로컬에 설치한 DB를 다른 컴퓨터에서 접속하려면?

1. 로컬에서 설치한 MySQL의 `bind-address`를 `0.0.0.0`(target)으로 변경한다.

    ```bash
    sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
    ```

    ```bash
    # bind-address = 127.0.0.1
    bind-address = 0.0.0.0
    ```

    ```bash
    sudo service mysql restart
    ```
