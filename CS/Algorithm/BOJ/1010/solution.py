from sys import stdin
input = stdin.readline

num = int(input())
for _ in range(num):
    N, M = map(int, input().split())
    ans = 1
    for i in range(1, M+1):
        ans *= i
    for j in range(1, N+1):
        ans //= j
    for k in range(1, M-N+1):
        ans //= k
    print(int(ans))