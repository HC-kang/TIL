# import sys
# input = sys.stdin.readline

# T = int(input().rstrip())
# for _ in range(T):
#     N = int(input().rstrip())
#     coins = list(map(int, input().rstrip().split()))
#     coins.insert(0, 0)
#     M = int(input().rstrip())
    
#     dp = [[0] * (M+1) for i in range(N+1)]
#     for i in range(N+1):
#         dp[i][0] = 1
        
#     for j in range(1, N+1):
#         for i in range(1, M+1):
#             dp[j][i] = dp[j-1][i]
#             if i - coins[j] >= 0:
#                 dp[j][i] += dp[j][i-coins[j]]
#     print(dp[N][M])
    
# -----------------------------------------------

import sys
input = sys.stdin.readline

T = int(input().rstrip())
for _ in range(T):
    N = int(input().rstrip())
    coins = list(map(int, input().rstrip().split()))
    coins.insert(0, 0)
    M = int(input().rstrip())
    
    dp = [0] * (M+1)
    dp[0] = 1
    for coin in coins:
        for i in range(1, M+1):
            if i >= coin:
                dp[i] += dp[i-coin]
    print(dp[M])