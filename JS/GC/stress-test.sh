#!/bin/zsh

wrk -t 1 -c 1 -d 30s http://localhost:3000/register/10mb-objects