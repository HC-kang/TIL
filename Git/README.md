# 자주 쓰는 명령어


### 초기 설정(글로벌)

```
git config --global user.name "YOUR_NAME"
git config --global user.email "YOUR_EMAIL_ADDRESS"
```

### 설정 조회(글로벌)

```
git config --global --list
```

### 저장소별 사용자명

```
git config user.name "YOUR_NAME"
git config user.email "YOUR_EMAIL_ADDRESS"
```

### 저장소별 설정 조회

```
git config --list
```

### git 출력결과 색상 켜기

```
git config --global color.ui "auto"
```

### 새 원격 저장소 추가하기

```
git remote add <REMOTE_REPO> <REPO_URL>
```

### 스테이징 항목 내리기(add 취소하기)

```
git reset HEAD <FILE_NAME>
```

### 마지막 커밋 메시지 바꾸기

```
git commit -m "<COMMIT_MESSAGE>" --amend
```

### 커밋 목록 확인

```
git log
```

### 커밋 취소하기

```
## 1. staged 상태로 커밋 취소
git reset --soft HEAD^

## 2. unstaged 상태로 커밋 취소
git reset HEAD^ # 마지막 커밋 취소
git reset HEAD~2 # 마지막 2개 커밋 취소

## 3. 파일까지 삭제
git reset --hard HEAD^
```

### 새로운 브랜치 생성

```
git branch <NEW_BRANCH>
```

### 다른 시작점에서 새로운 브랜치 생성

```
git branch <NEW_BRANCH> <START_POINT>
```

### 새로운 브랜치 생성 후 해당 브랜치로 전환

```
git checkout -b <NEW_BRANCH>
git switch -c <NEW_BRANCH>
```

### 브랜치 목록 확인

```
git branch
```

### 브랜치 목록과 각 브랜치의 최근 커밋 확인

```
git branch -v
```

### 브랜치 삭제

```
git branch -d <BRANCH_NAME>
git branch -D # 병합하지 않은 경우 강제 삭제
```

### 브랜치 전환

```
git switch <BRANCH_NAME>
git checkout <BRANCH_NAME>
```

### 브랜치 이름 변경

```
git checkout -m <BRANCH_NAME> <NEW_BRANCH_NAME>
```

### master 브랜치로 dev 브랜치를 병합할 때 (master ← dev)

```
git checkout master
git merge dev
```

### 차이점 확인하기

```
git diff
```

### commit 하지 않은 작업 임시 저장

```
git stash
```

### 저장된 stash 불러오기

```
git stash pop