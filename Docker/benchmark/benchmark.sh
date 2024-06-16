#!/bin/bash

run_benchmark() {
    local base_url=$1
    local output_prefix=$2

    DURATION="1m"

    OUTPUT_DIR="./Part2/${output_prefix}"
    mkdir -p $OUTPUT_DIR

    echo "Benchmarking ${output_prefix} environment..."

    THREADS=32
    CONNECTIONS=400

    wrk -t$THREADS -c$CONNECTIONS -d$DURATION ${base_url}/network > $OUTPUT_DIR/${output_prefix}_network.txt
    echo "Network benchmark completed."

    THREADS=3
    CONNECTIONS=4

    wrk -t$THREADS -c$CONNECTIONS -d$DURATION ${base_url}/disk-io > $OUTPUT_DIR/${output_prefix}_disk_io.txt
    echo "Disk I/O benchmark completed."

    THREADS=5
    CONNECTIONS=5

    wrk -t$THREADS -c$CONNECTIONS -d$DURATION ${base_url}/cpu > $OUTPUT_DIR/${output_prefix}_cpu.txt
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
        BASE_URL="http://3.36.78.116:3000"
        run_benchmark $BASE_URL "native"
        ;;
    2)
        BASE_URL="http://3.36.78.116:3000"
        run_benchmark $BASE_URL "host"
        ;;
    3)
        BASE_URL="http://3.36.78.116:3000"
        run_benchmark $BASE_URL "bridge"
        ;;
    *)
        echo "Invalid choice. Please enter 1, 2, or 3."
        ;;
esac
