#!/bin/bash

DURATION="1m"
THREADS=32
CONNECTIONS=400

echo "Benchmarking native environment..."

wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://3.38.115.80:3000/network > ./native/native_network.txt
echo "Network benchmark completed."

wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://3.38.115.80:3000/disk-io > ./native/native_disk_io.txt
echo "Disk I/O benchmark completed."

DURATION="1m"
THREADS=2
CONNECTIONS=4

wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://3.38.115.80:3000/cpu > ./native/native_cpu.txt
echo "CPU benchmark completed."

echo "Benchmark completed. Results saved to native_network.txt, native_disk_io.txt, native_cpu.txt."
