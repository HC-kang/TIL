#!/bin/bash

DURATION="30s"
THREADS=2
CONNECTIONS=10

# Docker 환경 테스트
echo "Running benchmark on Docker environment..."

# Docker Compose로 Node.js 서버 실행
# docker-compose up -d

# # 서버가 시작될 시간을 줌
# sleep 5

# # 네트워크 엔드포인트
# wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://localhost:3000/network > ./benchmark-docker/docker_network.txt
# echo "Network benchmark completed."

# wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://localhost:3000/disk-io > ./benchmark-docker/docker_disk_io.txt
# echo "Disk I/O benchmark completed."

# wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://localhost:3000/cpu > ./benchmark-docker/docker_cpu.txt
# echo "CPU benchmark completed."

# # Docker Compose 종료
# docker-compose down

# Docker in Docker (호스트 모드) 환경 테스트
echo "Running benchmark on Docker in Docker (host mode) environment..."

# Docker Compose로 DinD (호스트 모드) 실행
docker-compose -f docker-compose-dind-host.yml up -d

# 서버가 시작될 시간을 줌
sleep 10

wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://localhost:3000/network > ./benchmark-dind-host/dind_host_network.txt
echo "Network benchmark completed."

wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://localhost:3000/disk-io > ./benchmark-dind-host/dind_host_disk_io.txt
echo "Disk I/O benchmark completed."

wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://localhost:3000/cpu > ./benchmark-dind-host/dind_host_cpu.txt
echo "CPU benchmark completed."

# Docker Compose 종료
docker-compose -f docker-compose-dind-host.yml down

# Docker in Docker (일반 모드) 환경 테스트
echo "Running benchmark on Docker in Docker environment..."

# Docker Compose로 DinD 실행
docker-compose -f docker-compose-dind.yml up -d

# 서버가 시작될 시간을 줌
sleep 10

wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://localhost:3000/network > ./benchmark-dind/dind_network.txt
echo "Network benchmark completed."

wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://localhost:3000/disk-io > ./benchmark-dind/dind_disk_io.txt
echo "Disk I/O benchmark completed."

wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://localhost:3000/cpu > ./benchmark-dind/dind_cpu.txt
echo "CPU benchmark completed."

# Docker Compose 종료
docker-compose -f docker-compose-dind.yml down

echo "Benchmark completed. Results saved to ./benchmark-docker/, ./benchmark-dind-host/, and ./benchmark-dind/."
