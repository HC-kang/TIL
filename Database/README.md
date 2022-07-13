# MySQL

## 자주 쓰는 명령어

### 접속

```
mysql -u root -p --port 3306
```

### DB, 테이블 조회

```
show databases;
show tables;
```

### DB 백업

```
mysqldump -u <USER> -p <DATABASE_NAME> > <DB_FILE_NAME>.sql
```

### 테이블 백업

```
mysqldump -u <USER> -p <DATABASE_NAME> <TABLE_NAME> > <DB_FILE_NAME>.sql
```

### DB, 테이블 복원

```
mysql -u <USER> -p <DATABASE_NAME> < <DB_FILE_NAME>.sql
```

### 모든 DB 백업

```
mysqldump --all-databases -u <USER> -p --default-character-set=euckr < <DB_FILE_NAME>.sql
```

### 모든 DB 복원

```
mysql --all-databases -u <USER> -p < <DB_FILE_NAME>.sql
