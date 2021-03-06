# 자주 쓰는 명령어

```
# $ Dollar symbol: normal user
# # hash: administrator(root)
# | 파이프: 이전 커맨드의 결과를 이후 커맨드에 사용
# > 앵글 브래킷: 이전 커맨드를 다음 파일에 쓰기
# >> 앵글 브래킷x2: 이전 커맨드를 다음 파일에 추가
```

### 프로세스 확인
```
ps ef | grep django

grep '기준이되는문자열'
grep -v '제외시킬 문자열'
grep -e '기준문자열1||기준문자열2'
grep -A 3 -B 1 '기준이되는문자열' : -A(after) 기준문자열 뒤로 3줄 -B(before) 이전 1줄까지 출력
cat '파일' | grep '파일내에 찾을 문자열'
```

### 간단한 파일 쓰기
```
echo "hello" > README.md
echo "hello2" >> README.md
```

### 세션 종료 후에도 실행 유지 ... 백그라운드로 실행

```
nohup ... &
```

### 파일 읽기 ... 실시간 모니터링

```
tail ... -f / head
```

### 1초 단위 모니터링(nvidia-smi)

```
watch -d -n 1 nvidia-smi
```

### 메모리 상태 확인

```
free -h
```

### 디스크 상태 확인

```
df -h
```

### CPU 사용량, 프로세스, 스레드 상태 등 확인

```
top
```

### 파일 권한 변경

```
chmod 600 <FILE_NAME>
```

### 파일 소유자 변경

```
chown <USER> <FILE_NAME>
```

### user 추가, 권한 변경

```
sudo useradd docker
sudo usermod -aG docker $USER
```

### 통신상태 확인

```
ping <IP_ADDRESS or DOMAIN>
```

### 네트워크 상태 확인

```
ifconfig
```

### 게이트웨이, 라우팅테이블 확인

```
netstat -rn # Mac, Ubuntu
route # Ubuntu
```

### 찾기

```
find <LOCATION> "FILE_NAME*"
```

### 프로세스 강제종료

```
kill -9 <PID>
```

### 해당 프로세스 전체 종료

```
killall <PROCESS_NAME>
```

### alias 설정

```
alias vi="vim"
```

### 방화벽 확인

```
firewalld # CentOS
ufw # Ubuntu
```

### 위치 찾기

```
which
where
whereis
```

### service 상태 확인

```
service sshd status
```