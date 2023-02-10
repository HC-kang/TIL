# Docker Study

이전에 공부했던 도커 관련 자료들과, 파일 예제들입니다.

## 자주 쓰는 명령어

```shell
sudo service docker start

sudo usermod -aG docker ${USER}

sudo chmod 777 /var/run/docker.sock
```

## Syntax

- FROM: 사용할 이미지
- RUN: 이미지 구성에서 사용할 명령
- WORKDIR: cd. 경로 이동
- EXPOSE: 포트 설정
- CMD: 컨테이너가 켜질 때 실행되어야 할 명령

## Portainer

- Docker를 좀 더 편하게 사용 할 수 있게 해 주는 GUI 툴

```shell
docker volume create portainer_data
```

```shell
docker run -d -p 8000:8000 -p 9443:9443 --name portainer \
    --restart=always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v portainer_data:/data \
    portainer/portainer-ce:2.9.3
```

## 기타 명령어 정리

### 1. search

```docker search [image]```  
원하는 이미지를 검색해 볼 수 있음

### 2. pull

```docker pull [image]:[tag](latest)```  
원하는 이미지를 다운받을 수 있음

### 3. images

```docker images```  
로컬에 저장된 이미지들을 확인할 수 있음

### 4. ps

```docker ps```  
```docker ps -a```  
실행중인(-a옵션은 모든 컨테이너) 컨테이너를 확인할 수 있음

### 5. run

```docker run [option] [image] [start file]```  
이미지를 이용해 새로운 컨테이너를 만들 수 있음
5-1 자주 사용하는 option 정리
    -d : 데몬모드라고 부르며 컨테이너가 백그라운드로 실행
    -i : 표준입력을 활성화하며 컨테이너와 연결되어 있지 않더라도 표준입력을 유지. bash쉘에 명령을 입력할때 자주 사용
    -p : 호스트에 연결된 컨테이너의 특정 포트를 외부로 노출시킴 웹서비스를 할 때 사용
    -t : tty모드를 사용. bash쉘을 사용할 수 있도록 화면에 표시
    --name : 컨테이너의 이름을 지정
    -v : 컨테이너 내부 디렉터리나 파일을 호스트의 파일이나 디렉터리로 지정
    -m : 컨테이너의 최대 메모리를 설정
    --memory, --memory-swap, --memory-reservation
    --cpus : 컨테이너의 최대 cpu를 설정
    -e "options" : 컨테이너의 환경변수 설정(설정값이나 비밀번호 전달)
    --link="[container]:[tag]" : 컨테이너 끼리 연결

### 6. start

```docker start [container]```  
생성한 컨테이너를 실행(run으로 만들 경우 자동실행됨)

### 7. attach

```docker attach [container]```  
컨테이너에 접속
(start file이 /bin/bash로 설정된 것이 아니라면 그냥 커서만 깜박임)
이때는 ctrl + p, ctrl + q 를 통해 호스트로 돌아올 수 있음
ctr + d 는 컨테이너 정지
bash쉘에서 exit로 종료하면 컨테이너까지 종료됨

### 8. exec

```docker exec [container] [command] [value]```  
attach 명령어를 사용하지 않고 외부에서 컨테이너 내부 명령어를 사용
```docker exec -it [container name] /bin/bash```  
위 명령어로 bash쉘로 컨테이너에 접속 가능
attach와는 다르게 exit로 종료해도 컨테이너는 종료되지 않음

### 9. stop

```docker stop [container]```  
실행중인 컨테이너를 종료

### 10. rm

```docker rm [container]```  
해당 컨테이너를 삭제

### 11. rmi

```docker rmi [image]:[tag]```  
해당 이미지를 삭제

### 12. history

```docker history [image]:[tag]```  
해당 이미지의 생성 이력을 확인할 수 있음

### 13. cp

```docker cp [container]:[file route] [host route]```  
컨테이너에 있는 데이터를 호스트로 가져올 수 있음

### 14. commit

```docker commit [option] [container] [image]:[tag]```  
해당 컨테이너를 이미지로 제작 할 수 있음

### 15. diff

```docker diff [container]```  
컨테이너가 실행되면서 변경된 파일들의 목록을 출력
A추가 C변경 D삭제

### 16. inspect

```docker inspect [image] || [container]```  
이미지와 컨테이너의 세부 정보를 출력

### 17. build

```docker build [options] [path]```  
dockerfile 을 이용해서 이미지를 생성
    -t : 이미지 이름과 태그를 설정할 수 있음
    이때, docker hub에 push해서 사용하기 위해서는, tag명을 <dockerID>/tag:version 형식으로 지정해주어야 함

### 18. network

```docker network create [network name]```  
docker내부 네트워크망 생성

```docker network connect [network name] [container]```  
컨테이너를 내부 네트워크망에 연결

```docker network disconnect[network name] [container]```  
컨테이너를 내부 네트워크망에서 해제

```docker network inspect [network name]```  
내부 네트워크의 세부 정보 확인(어떤 컨테이너가 연결된지 확인 가능)

```docker network ls```  
내부 네트워크 리스트 출력

```docker network rm [network name]```  
내부 네트워크를 삭제

### 19. update

```docker update [option] [container]```  
실행중인 컨테이너의 옵션을 바꿀때 사용

옵션은 크게 다음의 2가지로 줄 수 있음 -m(--memory), --cpus
```docker update --memory-swap="300m" -m 300m container```  

### 20. save

```docker save [option] [image]```  
docker 이미지를 로컬에 저장(보통 tar_data로 저장)

옵션은 -o(--output)
저장 경로를 지정할 수 있음

```docker save -o [file_name] [image]```  
```docker save [image] > [filename]```  

### 21. load

```docker load [option] [tar_data]```  
로컬에 저장된 docker 이미지를 이미지화

옵션은 -i(--input)
파일을 지정해서 불러올 수 있음

```docker load -i [file_name]```  
docker load < [filename] 으로도 사용(-q 옵션을 줘도 됨)

### 22. export

```docker export [option] [container]```  
실행중인 컨테이너를 로컬에 저장

옵션은 -o(--output)
저장 경로를 지정할 수 있음

```docker export -o [file_name] [container]```  
```docker export [container] > [file_name]```  

### 23. import

```docker import [option] [file_name] [image]:[tag]```  
로컬에 저장된 컨테이너를 이미지화

옵션은  
    -c(--change) 생성된 이미지에 Dockerfile에서 사용하는 명령어를 적용
    -m(--message) 생성된 이미지에 의견을 달 수 있음

```docker import [file_name] [image]:[tag]```  
```docker import -c "ENV DEBUG true" [file_name] [image]:[tag]```  
```docker import -m "leave message" [file_name] [image]:[tag]```  

---

## dockerfile 생성

### FROM

The base image for building a new image. This command must be on top of the dockerfile.

### MAINTAINER

Optional, it contains the name of the maintainer of the image.

### RUN

Used to execute a command during the build process of the docker image.

### ADD

Copy a file from the host machine to the new docker image. There is an option to use an URL for the file, docker will then download that file to the destination directory.

### ENV

Define an environment variable.

### CMD

Used for executing commands when we build a new container from the docker image.

### ENTRYPOINT

Define the default command that will be executed when the container is running.

### WORKDIR

This is directive for CMD command to be executed.

### USER

Set the user or UID for the container created with the image.

### VOLUME

Enable access/linked directory between the container and the host machine.

---

## 참고  

[portainer docs](https://docs.portainer.io/)

---

## docker buildx

docker buildx는 docker build 명령어를 확장한 명령어로, 다양한 플랫폼에서 이미지를 빌드할 수 있게 해준다.

docker buildx를 사용하기 위해서는 docker 19.03 버전 이상이 필요하고,(실험적))
docker 20 버전부터 정식으로 포함되어 배포되었고, arm64 계열에서 도커를 사용하기 위해 사용한다.

docker buildx create --use 명령어를 통해 빌드 플랫폼을 먼저 만들어야 한다.

이후
docker buildx inspect --bootstrap
를 통해 가능한 플랫폼을 확인 할 수 있다.

플랫폼이 생성되었다면,

docker buildx build . --platform=linux/amd64,linux/arm64 --tag <도커 계정>/<이미지 이름>:<태그 버전> --push
위 명령어를 통해 빌드 후, 도커 허브로 바로 푸시가 가능하다

## 참고

[구루미님 블로그](https://gurumee92.tistory.com/311)
