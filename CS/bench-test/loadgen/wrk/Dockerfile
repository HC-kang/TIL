FROM alpine:3.20

# 소스 빌드 대신 패키지 설치
RUN apk add --no-cache wrk ca-certificates

# 편의상 워킹 디렉토리만 맞춰둠
WORKDIR /wrk
ENTRYPOINT ["/usr/bin/wrk"]