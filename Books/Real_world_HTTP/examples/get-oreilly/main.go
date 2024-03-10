package main

import ( "io/ioutil"
	"log"
	"net/http"
)

func main() {
	resp, _ := http.Get("http://www.oreilly.co.jp/catalog/soon.xml")
	body, _ := ioutil.ReadAll(resp.Body)
	log.Print(string(body))
	resp.Body.Close()
}
