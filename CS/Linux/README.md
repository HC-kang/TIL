# 자주 쓰는 명령어

```None
# Dollar symbol: normal user
# # hash: administrator(root)
# | 파이프: 이전 커맨드의 결과를 이후 커맨드에 사용
# > 앵글 브래킷: 이전 커맨드를 다음 파일에 쓰기
# >> 앵글 브래킷x2: 이전 커맨드를 다음 파일에 추가
```

## 프로세스 확인

```zsh
ps ef | grep django

grep '기준이되는문자열'
grep -v '제외시킬 문자열'
grep -e '기준문자열1||기준문자열2'
grep -A 3 -B 1 '기준이되는문자열' : -A(after) 기준문자열 뒤로 3줄 -B(before) 이전 1줄까지 출력
cat '파일' | grep '파일내에 찾을 문자열'
```

## 간단한 파일 쓰기

```zsh
echo "hello" > README.md
echo "hello2" >> README.md

# echo "alias _별명_='_원래 명령어_'" >> ~/.zshrc
echo "alias gb='git branch'" >> ~/.zshrc
echo "alias gpu='git push'" >> ~/.zshrc
echo "alias gpl='git pull'" >> ~/.zshrc
echo "alias gs='git status'" >> ~/.zshrc
echo "alias gd='git diff'" >> ~/.zshrc
echo "alias gc='git checkout'" >> ~/.zshrc
echo "alias ga='git add'" >> ~/.zshrc
echo "alias gcm='git commit'" >> ~/.zshrc
echo "alias gl='git log'" >> ~/.zshrc
```

## 세션 종료 후에도 실행 유지 ... 백그라운드로 실행

```zsh
nohup ... &
```

## 파일 읽기 ... 실시간 모니터링

```zsh
tail ... -f / head
```

## 1초 단위 모니터링(nvidia-smi)

```zsh
watch -d -n 1 nvidia-smi
```

## 메모리 상태 확인

```zsh
free -h
```

## 디스크 상태 확인

```zsh
df -h
```

## CPU 사용량, 프로세스, 스레드 상태 등 확인

```zsh
top
```

## 파일 권한 변경

```zsh
chmod 600 <FILE_NAME>
```

## 파일 소유자 변경

```zsh
chown <USER> <FILE_NAME>
```

## user 추가, 권한 변경

```zsh
sudo useradd docker
sudo usermod -aG docker $USER
```

## 통신상태 확인

```zsh
ping <IP_ADDRESS or DOMAIN>
```

## 네트워크 상태 확인

```zsh
ifconfig
```

## 게이트웨이, 라우팅테이블 확인

```zsh
netstat -rn # Mac, Ubuntu
route # Ubuntu
```

## 찾기

```zsh
find <LOCATION> "FILE_NAME*"
```

## 프로세스 강제종료

```zsh
kill -9 <PID>
```

## 해당 프로세스 전체 종료

```zsh
killall <PROCESS_NAME>
```

## alias 설정

```zsh
alias vi="vim"
```

## 방화벽 확인

```zsh
firewalld # CentOS
ufw # Ubuntu
```

## 위치 찾기

```zsh
which
where
whereis
```

## service 상태 확인

```zsh
service sshd status
```

## 파일 속성 확인/관리

```zsh
lsattr [ -RVadv ] {target_file}
# ex) lsattr -R / | grep +i
chattr [ options ] [+/-/=] [ property ] {target_file}
# ex) charrt +i test.txt
```

|Flag|속성|설명|
|-|-|-|
|A|No atime Update|- atime 레코드가 수정되지 않음|
|a|Append only|- 파일을 append mode로만 열 수 있기 때문에, 파일을 쓰는 것은 가능하지만 삭제할 수는 없음
|c|Compressed|- 파일이 커널에 의해 자동적으로 압축됨<br>- 파일을 읽을 때는 압축을 해제하여 보여주며, 쓰기 작업 시에는 디스크에 저장하기 전에 압축부터 진행
|D|Synchronous directory updates|- 디렉터리의 변경 사항이 디스크에 동기식으로 저장됨
|d|No dump|- dump 프로그램을 실행 중일 때에는 해당 파일이 백업되지 않음
|E|Compression error|- Experimental compression patch에 사용되며, 압축된 데이터가 오류를 가지고 있음을 의미
|e|Extent format|- 파일이 디스크 블록에 매핑될 때 Extents를 사용
|I|Indexed directory|- 디렉터리가 htree(Hashed tree)로 인덱싱 중
|h|Huge file|- 파일을 저장할 때 섹터 단위 대신에 블록사이즈 단위로 저장<br>- 또한 파일이 2TB 이상의 크기를 가지고 있음을 의미
|i|Immutable|- 파일을 수정할 수 없음 - 쓰기, 삭제, 이름변경은 물론 링크를 생성할 수도 없음
|j|Data journaling|- 파일에 데이터를 쓰기 전에 ext3 journal에 먼저 씀
|s|Secure deletion|- 파일을 제거했을 때 해당 블록은 zeroed되며, 디스크에 쓰여짐
|S|Synchronous updates|- 파일의 변경 사항이 디스크에 동기식으로 저장됨
|T|Top of directory hierarchy|- T 속성이 부여된 디렉터리는 가장 상위 디렉터리로 여겨짐<br>- Home 디렉터리에 설정하면 좋음
|t|No tail-merging|- 파일에 Partial block fragmentation이 발생하지 않음 (tail-merging이 발생하지 않음)
|u|Undeletable|- 파일이 삭제되더라도 내용은 저장되어 있으며, 복구 가능
|X|Compression raw access|- Experimental compression patch에 사용되며, 압축된 파일의 실제 내용을 직접 접근할 수 있음을 의미
|Z|Compressed dirty file|- Experimental compression patch에 사용되며, 압축된 데이터가 손상되었음을 의미

## telnet, nc

```zsh
- nc -z localhost 8080
```

- 옵션
  > -u : UDP 모드
  > -z : zero-I/O 모드(스캔용)
  > -p port : 로컬포트 지정
  > -l : 서버 열기
  > -v : verbose 모드

- 멀티포트 스캔

```zsh
- nc -z localhost 80 81 82
```
