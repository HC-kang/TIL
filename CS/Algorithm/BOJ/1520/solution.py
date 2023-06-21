# Timeout
# import sys
# input = sys.stdin.readline

# dx = [1, 0, -1, 0]
# dy = [0, 1, 0, -1]

# M, N = map(int, input().rstrip().split())

# MAP = [list(map(int, input().rstrip().split())) for _ in range(M)]
# visited = [[0] * N for _ in range(M)]

# cnt = 0

# def dfs(x, y):
#     global cnt
#     visited[y][x] = 1
#     if x == N-1 and y == M-1:
#         cnt += 1
#         visited[y][x] = 0
#         return
#     for i in range(4):
#         nx = x + dx[i]
#         ny = y + dy[i]
        
#         if 0 <= nx < N and 0 <= ny < M and not visited[ny][nx]:
#             if MAP[ny][nx] < MAP[y][x]:
#                 dfs(nx, ny)
#     visited[y][x] = 0
#     return

# dfs(0,0)
# print(cnt)

# ----------------------------------------

# import sys
# input = sys.stdin.readline

# dx = [1, 0, -1, 0]
# dy = [0, 1, 0, -1]

# M, N = map(int, input().rstrip().split())

# MAP = [list(map(int, input().rstrip().split())) for _ in range(M)]
# visited = [[0] * N for _ in range(M)]

# cnt = 0

# def dfs(x, y):
#     global cnt
#     visited[y][x] = 1
#     if x == N-1 and y == M-1:
#         cnt += 1
#         visited[y][x] = 0
#         return
#     for i in range(4):
#         nx = x + dx[i]
#         ny = y + dy[i]
        
#         if 0 <= nx < N \
#             and 0 <= ny < M \
#             and not visited[ny][nx]:
#             if MAP[ny][nx] < MAP[y][x]:
#                 dfs(nx, ny)
#     visited[y][x] = 0
#     return

# dfs(0,0)
# print(cnt)


# ----------------------------------------

import sys
input = sys.stdin.readline

M, N = map(int, input().rstrip().split())
dp = [[-1] * N for _ in range(M)]
MAP = [list(map(int, input().rstrip().split())) for _ in range(M)]
dx, dy = [1, 0, -1, 0], [0, 1, 0, -1]

def dfs(x, y):
    if x == N-1 and y == M-1:
        return 1
    if dp[y][x] != -1:
        return dp[y][x]
    dp[y][x] = 0
    for i in range(4):
        nx = x + dx[i]
        ny = y + dy[i]
        if 0 <= nx < N and 0 <= ny < M:
            if MAP[ny][nx] < MAP[y][x]:
                dp[y][x] += dfs(nx, ny)
    return dp[y][x]

print(dfs(0, 0))
