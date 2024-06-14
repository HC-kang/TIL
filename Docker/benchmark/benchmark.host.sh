#!/bin/bash

DURATION="1m"
THREADS=32
CONNECTIONS=400

echo "Benchmarking host environment..."

wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://3.38.115.80:3000/network > ./host/host_network.txt
echo "Network benchmark completed."

wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://3.38.115.80:3000/disk-io > ./host/host_disk_io.txt
echo "Disk I/O benchmark completed."

DURATION="1m"
THREADS=2
CONNECTIONS=4

wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://3.38.115.80:3000/cpu > ./host/host_cpu.txt
echo "CPU benchmark completed."

echo "Benchmark completed. Results saved to host_network.txt, host_disk_io.txt, host_cpu.txt."
