#!/bin/zsh

wrk -t 1 -c 10 -d 30s http://localhost:3000/leak/global-variable