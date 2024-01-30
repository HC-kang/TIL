# SSL/TLS

## SSL/TLS란?

## self-signed 인증서 생성

### 1. 인증 기관(CA)의 인증서 및 키 생성

#### 1. CA의 비밀 키 생성:

```shell
openssl genrsa -out ca.key 4096
```

#### 2. CA의 자체 서명된 인증서 생성:

```shell
openssl req -new -x509 -days 3650 -key ca.key -out ca.pem
```

- 여기서 -days 3650은 인증서의 유효 기간이며, 필요에 따라 조정할 수 있습니다. 이 명령을 실행하면 여러분의 정보(국가, 조직 등)를 입력하라는 프롬프트가 나타납니다.

### 2. 서버 인증서 및 키 생성

#### 1. 서버의 비밀 키 생성:

```shell
openssl genrsa -out certkey.pem 4096
```


#### 2. 인증 요청(CSR) 생성:

```shell
openssl req -new -key certkey.pem -out cert.csr
```

- 이 단계에서도 여러분의 정보를 입력하라는 프롬프트가 나타납니다.

#### 3. CA를 사용하여 서버 인증서 서명:

```shell
openssl x509 -req -days 365 -in cert.csr -CA ca.pem -CAkey ca.key -CAcreateserial -out cert.pem
```

여기서 -days 365는 서버 인증서의 유효 기간입니다.