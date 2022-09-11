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


출처: https://docs.portainer.io/v/ce-2.9/start/install/server/docker/linux