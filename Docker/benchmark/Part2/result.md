# 결과

## 1회차

### Native(Node v20.13.1)

- Network

Running 1m test @ http://3.36.78.116:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    72.98ms   60.91ms   1.98s    97.98%
    Req/Sec   169.97     33.18   590.00     84.28%
  322019 requests in 1.00m, 77.70MB read
  Socket errors: connect 0, read 0, write 0, timeout 194
Requests/sec:   5360.21
Transfer/sec:      1.29MB

- Disk I/O

Running 1m test @ http://3.36.78.116:3000/disk-io
  3 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.07s   294.11ms   1.74s    70.24%
    Req/Sec     0.37      0.55     2.00     66.67%
  168 requests in 1.00m, 49.29KB read
  Non-2xx or 3xx responses: 70
Requests/sec:      2.80
Transfer/sec:     840.51B

- CPU

Running 1m test @ http://3.36.78.116:3000/cpu
  5 threads and 5 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.16s   411.15ms   1.96s    74.60%
    Req/Sec     0.50      0.51     2.00     99.61%
  254 requests in 1.00m, 65.98KB read
  Socket errors: connect 0, read 0, write 0, timeout 2
Requests/sec:      4.23
Transfer/sec:      1.10KB

### Docker container(bridge, Node v20.13.1)

- Network

Running 1m test @ http://3.36.78.116:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    72.50ms   59.35ms   1.99s    96.60%
    Req/Sec   167.57     46.00   670.00     85.31%
  312025 requests in 1.00m, 75.29MB read
  Socket errors: connect 0, read 0, write 0, timeout 216
Requests/sec:   5195.34
Transfer/sec:      1.25MB

- Disk I/O

Running 1m test @ http://3.36.78.116:3000/disk-io
  3 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.06s   225.64ms   1.64s    76.79%
    Req/Sec     0.24      0.50     2.00     78.57%
  168 requests in 1.00m, 49.85KB read
  Non-2xx or 3xx responses: 87
Requests/sec:      2.80
Transfer/sec:     849.59B

- CPU

Running 1m test @ http://3.36.78.116:3000/cpu
  5 threads and 5 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.15s   406.02ms   1.97s    73.98%
    Req/Sec     0.43      0.50     2.00     57.54%
  252 requests in 1.00m, 65.46KB read
  Socket errors: connect 0, read 0, write 0, timeout 6
Requests/sec:      4.19
Transfer/sec:      1.09KB


### Docker container(host, Node v20.13.1)

- Network

Running 1m test @ http://3.36.78.116:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    69.85ms   59.13ms   2.00s    97.66%
    Req/Sec   172.12     40.07   540.00     81.76%
  325643 requests in 1.00m, 78.57MB read
  Socket errors: connect 0, read 0, write 0, timeout 212
Requests/sec:   5417.84
Transfer/sec:      1.31MB

- Disk I/O

Running 1m test @ http://3.36.78.116:3000/disk-io
  3 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.07s   233.42ms   1.84s    75.61%
    Req/Sec     0.19      0.44     2.00     83.03%
  165 requests in 1.00m, 48.83KB read
  Socket errors: connect 0, read 0, write 0, timeout 1
  Non-2xx or 3xx responses: 81
Requests/sec:      2.75
Transfer/sec:     831.90B

- CPU

Running 1m test @ http://3.36.78.116:3000/cpu
  5 threads and 5 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.15s   411.90ms   1.98s    74.30%
    Req/Sec     0.50      0.52     2.00     99.21%
  253 requests in 1.00m, 65.72KB read
  Socket errors: connect 0, read 0, write 0, timeout 4
Requests/sec:      4.21
Transfer/sec:      1.09KB


## 2회차

### Native(Node v20.13.1)

- Network

Running 1m test @ http://3.36.78.116:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    75.17ms   63.65ms   1.99s    93.50%
    Req/Sec   162.16     62.75   646.00     76.15%
  302112 requests in 1.00m, 72.89MB read
  Socket errors: connect 0, read 0, write 0, timeout 220
Requests/sec:   5026.70
Transfer/sec:      1.21MB

- Disk I/O

Running 1m test @ http://3.36.78.116:3000/disk-io
  3 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.09s   148.04ms   1.54s    85.98%
    Req/Sec     0.11      0.33     2.00     89.63%
  164 requests in 1.00m, 49.10KB read
  Non-2xx or 3xx responses: 99
Requests/sec:      2.73
Transfer/sec:     836.69B

- CPU

Running 1m test @ http://3.36.78.116:3000/cpu
  5 threads and 5 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.18s   415.98ms   1.98s    74.58%
    Req/Sec     0.36      0.51     3.00     65.04%
  246 requests in 1.00m, 63.90KB read
  Socket errors: connect 0, read 0, write 0, timeout 6
Requests/sec:      4.10
Transfer/sec:      1.06KB

### Docker container(bridge, Node v20.13.1)

- Network

Running 1m test @ http://3.36.78.116:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    72.66ms   59.56ms   2.00s    96.81%
    Req/Sec   165.61     41.75   620.00     78.22%
  313290 requests in 1.00m, 75.59MB read
  Socket errors: connect 0, read 0, write 0, timeout 207
Requests/sec:   5212.29
Transfer/sec:      1.26MB

- Disk I/O

Running 1m test @ http://3.36.78.116:3000/disk-io
  3 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.08s   245.10ms   1.82s    72.29%
    Req/Sec     0.23      0.45     2.00     78.31%
  166 requests in 1.00m, 48.86KB read
  Non-2xx or 3xx responses: 73
Requests/sec:      2.76
Transfer/sec:     832.42B

- CPU

Running 1m test @ http://3.36.78.116:3000/cpu
  5 threads and 5 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.17s   413.03ms   1.96s    74.39%
    Req/Sec     0.44      0.51     2.00     56.40%
  250 requests in 1.00m, 64.94KB read
  Socket errors: connect 0, read 0, write 0, timeout 4
Requests/sec:      4.16
Transfer/sec:      1.08KB

### Docker container(host, Node v20.13.1)

- Network

Running 1m test @ http://3.36.78.116:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    72.49ms   61.32ms   1.99s    97.69%
    Req/Sec   165.85     40.42   610.00     82.31%
  312176 requests in 1.00m, 75.32MB read
  Socket errors: connect 0, read 0, write 0, timeout 222
Requests/sec:   5193.76
Transfer/sec:      1.25MB

- Disk I/O

Running 1m test @ http://3.36.78.116:3000/disk-io
  3 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.12s   162.61ms   1.57s    86.25%
    Req/Sec     0.09      0.32     2.00     92.50%
  160 requests in 1.00m, 47.96KB read
  Non-2xx or 3xx responses: 98
Requests/sec:      2.66
Transfer/sec:     817.52B

- CPU

Running 1m test @ http://3.36.78.116:3000/cpu
  5 threads and 5 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.16s   402.12ms   2.00s    75.93%
    Req/Sec     0.42      0.52     3.00     58.63%
  249 requests in 1.00m, 64.68KB read
  Socket errors: connect 0, read 0, write 0, timeout 8
Requests/sec:      4.14
Transfer/sec:      1.08KB

## 3회차

### Native(Node v20.13.1)

- Network

Running 1m test @ http://3.36.78.116:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    70.20ms   60.75ms   2.00s    97.80%
    Req/Sec   172.12     43.30   646.00     83.83%
  323936 requests in 1.00m, 78.16MB read
  Socket errors: connect 0, read 0, write 0, timeout 218
Requests/sec:   5389.39
Transfer/sec:      1.30MB

- Disk I/O

Running 1m test @ http://3.36.78.116:3000/disk-io
  3 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.12s   148.81ms   1.56s    89.24%
    Req/Sec     0.06      0.26     2.00     94.94%
  158 requests in 1.00m, 47.40KB read
  Non-2xx or 3xx responses: 98
Requests/sec:      2.63
Transfer/sec:     807.68B

- CPU

Running 1m test @ http://3.36.78.116:3000/cpu
  5 threads and 5 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.16s   394.49ms   2.00s    77.63%
    Req/Sec     0.32      0.49     3.00     69.26%
  244 requests in 1.00m, 63.38KB read
  Socket errors: connect 0, read 0, write 0, timeout 16
Requests/sec:      4.06
Transfer/sec:      1.06KB

### Docker container(bridge, Node v20.13.1)

- Network

Running 1m test @ http://3.36.78.116:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    73.57ms   60.37ms   1.99s    96.42%
    Req/Sec   163.58     43.37   525.00     80.08%
  306514 requests in 1.00m, 73.96MB read
  Socket errors: connect 0, read 0, write 0, timeout 223
Requests/sec:   5100.49
Transfer/sec:      1.23MB

- Disk I/O

Running 1m test @ http://3.36.78.116:3000/disk-io
  3 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.12s   218.99ms   1.64s    83.12%
    Req/Sec     0.15      0.38     2.00     85.62%
  160 requests in 1.00m, 47.78KB read
  Non-2xx or 3xx responses: 93
Requests/sec:      2.66
Transfer/sec:     814.22B

- CPU

Running 1m test @ http://3.36.78.116:3000/cpu
  5 threads and 5 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.15s   410.43ms   1.99s    74.00%
    Req/Sec     0.48      0.53     3.00     99.21%
  254 requests in 1.00m, 65.98KB read
  Socket errors: connect 0, read 0, write 0, timeout 4
Requests/sec:      4.23
Transfer/sec:      1.10KB

### Docker container(host, Node v20.13.1)

- Network

Running 1m test @ http://3.36.78.116:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    69.09ms   58.73ms   1.98s    97.89%
    Req/Sec   175.58     43.15   670.00     84.97%
  330119 requests in 1.00m, 79.65MB read
  Socket errors: connect 0, read 0, write 0, timeout 208
Requests/sec:   5492.70
Transfer/sec:      1.33MB

- Disk I/O

Running 1m test @ http://3.36.78.116:3000/disk-io
  3 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.13s   208.55ms   1.64s    82.39%
    Req/Sec     0.13      0.41     3.00     88.68%
  159 requests in 1.00m, 47.57KB read
  Non-2xx or 3xx responses: 95
Requests/sec:      2.65
Transfer/sec:     810.99B

- CPU

Running 1m test @ http://3.36.78.116:3000/cpu
  5 threads and 5 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.17s   413.67ms   1.99s    74.09%
    Req/Sec     0.44      0.51     2.00     56.00%
  250 requests in 1.00m, 64.94KB read
  Socket errors: connect 0, read 0, write 0, timeout 3
Requests/sec:      4.16
Transfer/sec:      1.08KB
