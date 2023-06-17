# M, N = map(int, input().rstrip().split())

# S = []

# def dfs(st):
#     if len(S) == N:
#         print(' '.join(map(str, S)))
#         return
#     for i in range(st, M+1):
#         if i not in S:
#             S.append(i)
#             dfs(i + 1)
#             S.pop()

# dfs(1)

# ----------------------
from itertools import combinations
M, N = map(int, input().rstrip().split())

for c in combinations([str(i) for i in range(1, M+1)], N):
    print(' '.join(c))

