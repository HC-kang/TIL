package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	// HTTP/2를 지원하는 서버 설정
	server := &http.Server{
		Addr: ":3004",
		Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			fmt.Fprintf(w, "Hello, HTTP/2!")
		}),
	}

	// 인증서 파일이 존재하는지 확인
	if _, err := os.Stat("server.crt"); os.IsNotExist(err) {
		log.Fatalf("server.crt not found")
	}
	if _, err := os.Stat("server.key"); os.IsNotExist(err) {
		log.Fatalf("server.key not found")
	}

	// HTTP/2 활성화
	log.Println("Starting HTTP/2 server on :3004")
	if err := server.ListenAndServeTLS("server.crt", "server.key"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
