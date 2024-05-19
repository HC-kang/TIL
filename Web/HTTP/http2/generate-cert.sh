#!/bin/bash
openssl req  -nodes -new -x509  \
    -keyout ./cert/localhost-privkey.pem \
    -out ./cert/localhost-cert.pem \
    -subj "/C=US/ST=State/L=City/O=company/OU=Com/CN=www.testserver.local"