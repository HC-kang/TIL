# Git 관련사항 정리

## Markdown 작성법

### 인용문 작성

예시
> 인용문
> 
```
> 인용문
```
### 링크 연결 방법
예시
> [구글 링크](https://www.google.com)

```
[표시할 내용](링크)
```

### 표 그리기
예시
> |제목|내용|설명|
>|------|---|---|
>|테스트1|테스트2|테스트3|
>|테스트1|테스트2|테스트3|
>|테스트1|테스트2|테스트3|

```
|제목|내용|설명|
|------|---|---|
|테스트1|테스트2|테스트3|
|테스트1|테스트2|테스트3|
|테스트1|테스트2|테스트3|
```

정렬
>|제목|내용|설명|
>|:---|---:|:---:|
>|왼쪽정렬|오른쪽정렬|중앙정렬|
>|왼쪽정렬|오른쪽정렬|중앙정렬|
>|왼쪽정렬|오른쪽정렬|중앙정렬|

```
|제목|내용|설명|
|:---|---:|:---:|
|왼쪽정렬|오른쪽정렬|중앙정렬|
|왼쪽정렬|오른쪽정렬|중앙정렬|
|왼쪽정렬|오른쪽정렬|중앙정렬|
```

---
## 자주 쓰는 명령어


### 초기 설정(글로벌)

```bash
git config --global user.name "YOUR_NAME"
git config --global user.email "YOUR_EMAIL_ADDRESS"
```

### 설정 조회(글로벌)

```bash
git config --global --list
```

### 저장소별 사용자명

```bash
git config user.name "YOUR_NAME"
git config user.email "YOUR_EMAIL_ADDRESS"
```

### 저장소별 설정 조회

```bash
git config --list
```

### git 출력결과 색상 켜기

```bash
git config --global color.ui "auto"
```

### 새 원격 저장소 추가하기

```bash
git remote add <REMOTE_REPO> <REPO_URL>
```

### 스테이징 항목 내리기(add 취소하기)

```bash
git reset HEAD <FILE_NAME>
```

### 마지막 커밋 메시지 바꾸기

```bash
git commit -m "<COMMIT_MESSAGE>" --amend
```

### 커밋 목록 확인

```bash
git log
```

### 커밋 취소하기

```bash
## 1. staged 상태로 커밋 취소
git reset --soft HEAD^

## 2. unstaged 상태로 커밋 취소
git reset HEAD^ # 마지막 커밋 취소
git reset HEAD~2 # 마지막 2개 커밋 취소

## 3. 파일까지 삭제
git reset --hard HEAD^
```

### 새로운 브랜치 생성

```bash
git branch <NEW_BRANCH>
```

### 다른 시작점에서 새로운 브랜치 생성

```bash
git branch <NEW_BRANCH> <START_POINT>
```

### 새로운 브랜치 생성 후 해당 브랜치로 전환

```bash
git checkout -b <NEW_BRANCH>
git switch -c <NEW_BRANCH>
```

### 브랜치 목록 확인

```bash
git branch
```

### 브랜치 목록과 각 브랜치의 최근 커밋 확인

```bash
git branch -v
```

### 브랜치 삭제

```bash
git branch -d <BRANCH_NAME>
git branch -D # 병합하지 않은 경우 강제 삭제
```

### 브랜치 전환

```bash
git switch <BRANCH_NAME>
git checkout <BRANCH_NAME>
```

### 브랜치 이름 변경

```bash
git checkout -m <BRANCH_NAME> <NEW_BRANCH_NAME>
```

### master 브랜치로 dev 브랜치를 병합할 때 (master ← dev)

```bash
git checkout master
git merge dev
```

### 차이점 확인하기

```bash
git diff
```

### commit 하지 않은 작업 임시 저장

```bash
git stash
```

### 저장된 stash 불러오기

```bash
git stash pop