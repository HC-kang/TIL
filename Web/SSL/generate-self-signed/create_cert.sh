#!/bin/bash

# 기본값 설정
DOMAIN="example.com"
COUNTRY="KR"
STATE="Seoul"
CITY="Seoul"
ORGANIZATION="MyCompany"
ORG_UNIT="IT"
ROOT_CA_CN="Self signed CA"
CERT_CN="SAN Certificate"

# 인증서를 저장할 디렉토리를 생성합니다.
CERT_DIR="./$DOMAIN"
mkdir -p "$CERT_DIR"
cd "$CERT_DIR"

# 단계 1: 루트 CA 생성

# 루트 CA 개인키 생성
openssl genrsa -out root.key 2048

# 루트 CA 인증 요청서 생성
openssl req -new -key root.key -out root.csr -subj "/C=$COUNTRY/ST=$STATE/L=$CITY/O=$ORGANIZATION/OU=$ORG_UNIT/CN=$ROOT_CA_CN"

# 루트 CA 설정파일 생성
echo "basicConstraints=CA:TRUE" > root.conf

# 루트 CA 인증서 생성
openssl x509 -req -sha256 -days 3650 -signkey root.key -in root.csr -extfile root.conf -out root.crt

# 단계 2: 도메인 인증서 생성

# 도메인 인증서용 개인키 생성
openssl genrsa -out cert.key 2048

# 도메인 인증 요청서 생성
openssl req -new -key cert.key -out cert.csr -subj "/C=$COUNTRY/ST=$STATE/L=$CITY/O=$ORGANIZATION/OU=$ORG_UNIT/CN=$CERT_CN"

# 도메인 인증서 설정파일 생성
cat > cert.conf << EOF
basicConstraints=CA:FALSE
subjectAltName=@SAN
[SAN]
DNS.1=$DOMAIN
DNS.2=*.$DOMAIN
EOF

# 도메인 인증서 생성 및 서명
openssl x509 -req -sha256 -days 365 -in cert.csr -CA root.crt -CAkey root.key -CAcreateserial -extfile cert.conf -out cert.crt

# 생성된 파일 확인
echo "Generated files:"
ls -l "$CERT_DIR"

# 인증서 정보 출력
openssl x509 -in cert.crt -text -noout
