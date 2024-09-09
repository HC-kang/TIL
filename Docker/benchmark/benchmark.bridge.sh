#!/bin/bash

DURATION="1m"
THREADS=32
CONNECTIONS=400

echo "Benchmarking bridge network..."

wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://0.0.0.0:3000/network > ./bridge/bridge_network.txt
echo "Network benchmark completed."

wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://0.0.0.0:3000/disk-io > ./bridge/bridge_disk_io.txt
echo "Disk I/O benchmark completed."

DURATION="1m"
THREADS=2
CONNECTIONS=4

wrk -t$THREADS -c$CONNECTIONS -d$DURATION http://0.0.0.0:3000/cpu > ./bridge/bridge_cpu.txt
echo "CPU benchmark completed."

echo "Benchmark completed. Results saved to bridge_network.txt, bridge_disk_io.txt, bridge_cpu.txt."
