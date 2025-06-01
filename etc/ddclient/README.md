---
title: ddclient 사용법
date: 2025-01-05
tags: [ddclient, 클라우드플레어, 도메인, 네임서버, 라우팅, 홈서버, 네트워크, 보안]
alias: [ddclient 사용법]
---

# ddclient 사용법

## 1. ddclient 설치
```bash
sudo apt install ddclient
```

## 2. ddclient 설정
```bash
sudo vi /etc/ddclient.conf
```

```conf
# /etc/ddclient.conf
daemon=300                             # 5분마다 업데이트
protocol=cloudflare                    # 클라우드플레어 사용
use=web                                # IP 주소를 웹에서 가져옴
zone={{ROOT_DOMAIN}}                   # 루트 도메인만 지정
login=token                            # 로그인은 토큰으로
password={{YOUR_CLOUDFLARE_API_TOKEN}} # 클라우드플레어 API 토큰
YOUR_SUBDOMAINS                        # 업데이트할 전체 서브도메인
