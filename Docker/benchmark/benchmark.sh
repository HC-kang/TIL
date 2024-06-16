#!/bin/bash

run_benchmark() {
    local base_url=$1
    local output_prefix=$2

    DURATION="1m"
    THREADS_NETWORK_DISK=32
    CONNECTIONS_NETWORK_DISK=400
    THREADS_CPU=2
    CONNECTIONS_CPU=4

    OUTPUT_DIR="./${output_prefix}"
    mkdir -p $OUTPUT_DIR

    echo "Benchmarking ${output_prefix} environment..."

    wrk -t$THREADS_NETWORK_DISK -c$CONNECTIONS_NETWORK_DISK -d$DURATION ${base_url}/network > $OUTPUT_DIR/${output_prefix}_network.txt
    echo "Network benchmark completed."

    wrk -t$THREADS_NETWORK_DISK -c$CONNECTIONS_NETWORK_DISK -d$DURATION ${base_url}/disk-io > $OUTPUT_DIR/${output_prefix}_disk_io.txt
    echo "Disk I/O benchmark completed."

    wrk -t$THREADS_CPU -c$CONNECTIONS_CPU -d$DURATION ${base_url}/cpu > $OUTPUT_DIR/${output_prefix}_cpu.txt
    echo "CPU benchmark completed."

    echo "Benchmark completed. Results saved to ${output_prefix}_network.txt, ${output_prefix}_disk_io.txt, ${output_prefix}_cpu.txt."
}

echo "Select the benchmark environment:"
echo "1) Native"
echo "2) Host"
echo "3) Bridge"
read -p "Enter choice [1-3]: " choice

case $choice in
    1)
        BASE_URL="http://127.0.0.1:3000"
        run_benchmark $BASE_URL "native"
        ;;
    2)
        BASE_URL="http://host.docker.internal:3000"
        run_benchmark $BASE_URL "host"
        ;;
    3)
        BASE_URL="http://bridge.docker.internal:3000"
        run_benchmark $BASE_URL "bridge"
        ;;
    *)
        echo "Invalid choice. Please enter 1, 2, or 3."
        ;;
esac
