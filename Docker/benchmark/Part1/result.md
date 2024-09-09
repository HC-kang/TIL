# 결과

## 0회차

### Native(Node:18)

- Network

Running 1m test @ http://3.38.115.80:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   103.21ms   55.24ms   1.99s    87.19%
    Req/Sec   109.37     33.46   484.00     83.84%
  203280 requests in 1.00m, 49.05MB read
  Socket errors: connect 0, read 0, write 0, timeout 264
Requests/sec:   3382.11
Transfer/sec:    835.62KB

- Disk I/O

Running 1m test @ http://3.38.115.80:3000/disk-io
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   144.89ms   89.10ms   1.98s    96.29%
    Req/Sec    87.64     21.69   290.00     69.07%
  165204 requests in 1.00m, 40.53MB read
  Socket errors: connect 0, read 0, write 0, timeout 16
Requests/sec:   2749.80
Transfer/sec:    690.81KB

- CPU

Running 1m test @ http://3.38.115.80:3000/cpu
  2 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.07s   194.30ms   2.00s    89.08%
    Req/Sec     1.31      1.31     9.00     52.35%
  171 requests in 1.00m, 44.42KB read
  Socket errors: connect 0, read 0, write 0, timeout 52
Requests/sec:      2.85
Transfer/sec:     756.92B

### Docker container(bridge, Node:18)

- Network

Running 1m test @ http://3.38.115.80:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    97.68ms   28.12ms 405.71ms   87.90%
    Req/Sec   123.38     24.37   237.00     74.69%
  236055 requests in 1.00m, 56.96MB read
Requests/sec:   3928.76
Transfer/sec:      0.95MB

- Disk I/O

Running 1m test @ http://3.38.115.80:3000/disk-io
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   142.54ms   12.93ms 366.73ms   70.49%
    Req/Sec    84.41     23.70   121.00     60.89%
  161499 requests in 1.00m, 39.38MB read
Requests/sec:   2687.19
Transfer/sec:    671.01KB

- CPU

Running 1m test @ http://3.38.115.80:3000/cpu
  2 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.19s   427.46ms   1.94s    66.33%
    Req/Sec     1.61      1.10     5.00     66.33%
  199 requests in 1.00m, 51.69KB read
Requests/sec:      3.32
Transfer/sec:      0.86KB

### Docker container(host, Node:18)

- Network

Running 1m test @ http://3.38.115.80:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    87.59ms   25.42ms 353.91ms   88.24%
    Req/Sec   137.63     30.45   242.00     74.81%
  263171 requests in 1.00m, 63.50MB read
Requests/sec:   4378.28
Transfer/sec:      1.06MB

- Disk I/O

Running 1m test @ http://3.38.115.80:3000/disk-io
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   131.94ms   13.17ms 360.19ms   76.06%
    Req/Sec    91.19     22.63   140.00     68.63%
  174557 requests in 1.00m, 42.53MB read
Requests/sec:   2904.29
Transfer/sec:    724.61KB

- CPU

Running 1m test @ http://3.38.115.80:3000/cpu
  2 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.19s   424.95ms   1.91s    67.00%
    Req/Sec     1.64      1.11     5.00     69.50%
  200 requests in 1.00m, 51.95KB read
Requests/sec:      3.33
Transfer/sec:      0.86KB

## 1회차

### Native(Node:18)

- Network

Running 1m test @ http://3.35.229.151:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    66.10ms   56.80ms   2.00s    98.10%
    Req/Sec   182.27     40.78   640.00     83.82%
  344551 requests in 1.00m, 83.13MB read
  Socket errors: connect 0, read 0, write 0, timeout 220
Requests/sec:   5731.09
Transfer/sec:      1.38MB

- Disk I/O

Running 1m test @ http://3.35.229.151:3000/disk-io
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    90.74ms   42.34ms   1.25s    98.77%
    Req/Sec   136.15     19.61   330.00     78.94%
  260049 requests in 1.00m, 63.99MB read
Requests/sec:   4326.90
Transfer/sec:      1.06MB

- CPU

Running 1m test @ http://3.35.229.151:3000/cpu
  2 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.12s   408.27ms   1.89s    65.24%
    Req/Sec     1.83      1.57    10.00     86.73%
  211 requests in 1.00m, 54.81KB read
  Socket errors: connect 0, read 0, write 0, timeout 1
Requests/sec:      3.51
Transfer/sec:      0.91KB

### Docker container(bridge, Node:18)

- Network

Running 1m test @ http://3.35.229.151:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    54.77ms   18.82ms 186.79ms   76.43%
    Req/Sec   220.22     38.86   363.00     71.20%
  421276 requests in 1.00m, 101.65MB read
Requests/sec:   7008.73
Transfer/sec:      1.69MB

- Disk I/O

Running 1m test @ http://3.35.229.151:3000/disk-io
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    96.63ms   11.09ms 159.61ms   70.56%
    Req/Sec   124.49     20.13   220.00     78.11%
  238371 requests in 1.00m, 60.07MB read
Requests/sec:   3965.71
Transfer/sec:      1.00MB

- CPU

Running 1m test @ http://3.35.229.151:3000/cpu
  2 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   939.77ms  347.27ms   1.84s    62.99%
    Req/Sec     2.27      2.01    10.00     91.57%
  254 requests in 1.00m, 65.98KB read
Requests/sec:      4.23
Transfer/sec:      1.10KB

### Docker container(host, Node:18)

- Network

Running 1m test @ http://3.35.229.151:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    49.73ms   16.94ms 182.20ms   74.37%
    Req/Sec   242.61     41.63   393.00     72.03%
  463950 requests in 1.00m, 111.94MB read
Requests/sec:   7718.26
Transfer/sec:      1.86MB

- Disk I/O

Running 1m test @ http://3.35.229.151:3000/disk-io
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    89.26ms   10.40ms 144.23ms   70.39%
    Req/Sec   134.69     25.19   242.00     77.20%
  257921 requests in 1.00m, 64.34MB read
Requests/sec:   4291.90
Transfer/sec:      1.07MB

- CPU

Running 1m test @ http://3.35.229.151:3000/cpu
  2 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   942.52ms  342.92ms   1.58s    63.64%
    Req/Sec     2.25      2.03    10.00     92.46%
  253 requests in 1.00m, 65.72KB read
Requests/sec:      4.21
Transfer/sec:      1.09KB

## 2회차

### Native(Node:18)

- Network

Running 1m test @ http://3.35.229.151:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    65.94ms   59.52ms   2.00s    98.78%
    Req/Sec   184.11     42.84   580.00     83.89%
  347713 requests in 1.00m, 83.90MB read
  Socket errors: connect 0, read 0, write 0, timeout 209
Requests/sec:   5785.42
Transfer/sec:      1.40MB

- Disk I/O

Running 1m test @ http://3.35.229.151:3000/disk-io
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    88.83ms   45.08ms   1.28s    98.67%
    Req/Sec   139.42     22.02   383.00     83.30%
  266562 requests in 1.00m, 66.11MB read
Requests/sec:   4434.90
Transfer/sec:      1.10MB

- CPU

Running 1m test @ http://3.35.229.151:3000/cpu
  2 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.14s   416.07ms   1.91s    65.22%
    Req/Sec     1.71      1.27    10.00     75.96%
  208 requests in 1.00m, 54.03KB read
  Socket errors: connect 0, read 0, write 0, timeout 1
Requests/sec:      3.46
Transfer/sec:      0.90KB

### Docker container(bridge, Node:18)

- Network

Running 1m test @ http://3.35.229.151:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    55.47ms   19.34ms 263.99ms   77.52%
    Req/Sec   217.59     38.98   480.00     73.85%
  415697 requests in 1.00m, 100.30MB read
  Socket errors: connect 0, read 0, write 0, timeout 239
Requests/sec:   6923.70
Transfer/sec:      1.67MB

- Disk I/O

Running 1m test @ http://3.35.229.151:3000/disk-io
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    96.47ms   10.89ms 165.84ms   71.00%
    Req/Sec   124.67     20.72   230.00     77.39%
  238699 requests in 1.00m, 59.67MB read
Requests/sec:   3971.72
Transfer/sec:      0.99MB

- CPU

Running 1m test @ http://3.35.229.151:3000/cpu
  2 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   951.41ms  344.94ms   1.66s    64.80%
    Req/Sec     2.21      1.90    10.00     94.76%
  250 requests in 1.00m, 64.94KB read
Requests/sec:      4.16
Transfer/sec:      1.08KB

### Docker container(host, Node:18)

- Network

Running 1m test @ http://3.35.229.151:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    51.28ms   18.35ms 189.28ms   75.42%
    Req/Sec   235.40     38.76   470.00     73.24%
  449916 requests in 1.00m, 108.56MB read
Requests/sec:   7485.36
Transfer/sec:      1.81MB

- Disk I/O

Running 1m test @ http://3.35.229.151:3000/disk-io
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    90.48ms   11.01ms 151.53ms   70.39%
    Req/Sec   132.93     25.43   242.00     78.14%
  254553 requests in 1.00m, 63.96MB read
Requests/sec:   4234.98
Transfer/sec:      1.06MB

- CPU

Running 1m test @ http://3.35.229.151:3000/cpu
  2 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   953.19ms  344.10ms   1.64s    67.20%
    Req/Sec     2.17      1.94    10.00     95.16%
  250 requests in 1.00m, 64.94KB read
Requests/sec:      4.16
Transfer/sec:      1.08KB

## 3회차

### Native(Node:18)

- Network

Running 1m test @ http://3.35.229.151:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    67.94ms   58.26ms   2.00s    97.88%
    Req/Sec   178.05     44.60   555.00     85.00%
  334175 requests in 1.00m, 80.63MB read
  Socket errors: connect 0, read 0, write 0, timeout 222
Requests/sec:   5559.80
Transfer/sec:      1.34MB

- Disk I/O

Running 1m test @ http://3.35.229.151:3000/disk-io
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    92.57ms   46.39ms   1.29s    98.09%
    Req/Sec   134.13     22.37   400.00     75.43%
  256174 requests in 1.00m, 63.13MB read
Requests/sec:   4262.51
Transfer/sec:      1.05MB

- CPU

Running 1m test @ http://3.35.229.151:3000/cpu
  2 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.12s   411.76ms   1.87s    65.71%
    Req/Sec     1.77      1.35    10.00     88.63%
  211 requests in 1.00m, 54.81KB read
  Socket errors: connect 0, read 0, write 0, timeout 1
Requests/sec:      3.51
Transfer/sec:      0.91KB

### Docker container(bridge, Node:18)

- Network

Running 1m test @ http://3.35.229.151:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    55.12ms   18.62ms 183.34ms   76.74%
    Req/Sec   218.87     34.82   363.00     73.32%
  418416 requests in 1.00m, 100.96MB read
Requests/sec:   6961.60
Transfer/sec:      1.68MB

- Disk I/O

Running 1m test @ http://3.35.229.151:3000/disk-io
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    97.58ms   11.87ms 277.31ms   72.16%
    Req/Sec   123.25     19.96   222.00     78.43%
  235998 requests in 1.00m, 59.01MB read
Requests/sec:   3926.30
Transfer/sec:      0.98MB

- CPU

Running 1m test @ http://3.35.229.151:3000/cpu
  2 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   953.33ms  348.24ms   1.60s    63.20%
    Req/Sec     2.28      2.25    10.00     92.00%
  250 requests in 1.00m, 64.94KB read
Requests/sec:      4.16
Transfer/sec:      1.08KB

### Docker container(host, Node:18)

- Network

Running 1m test @ http://3.35.229.151:3000/network
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    50.63ms   17.86ms 220.74ms   74.93%
    Req/Sec   238.27     39.97   400.00     70.96%
  455632 requests in 1.00m, 109.93MB read
Requests/sec:   7580.54
Transfer/sec:      1.83MB

- Disk I/O

Running 1m test @ http://3.35.229.151:3000/disk-io
  32 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    88.05ms   10.95ms 203.85ms   72.63%
    Req/Sec   136.57     24.80   242.00     80.18%
  261392 requests in 1.00m, 65.00MB read
Requests/sec:   4349.31
Transfer/sec:      1.08MB

- CPU

Running 1m test @ http://3.35.229.151:3000/cpu
  2 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   929.64ms  338.99ms   1.54s    66.54%
    Req/Sec     2.20      1.92    10.00     94.51%
  255 requests in 1.00m, 66.24KB read
  Socket errors: connect 0, read 0, write 0, timeout 1
Requests/sec:      4.24
Transfer/sec:      1.10KB
