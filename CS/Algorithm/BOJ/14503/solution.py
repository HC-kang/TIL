# import sys
# input = sys.stdin.readline

# dr = [-1,0,1,0]
# dc = [0,1,0,-1]

# N, M = map(int, input().split())
# r, c, d = map(int, input().split())
# visited = [[0] * M for _ in range(N)]
# MAP = [list(map(int, input().split())) for _ in range(N)]

# visited[r][c] = 1
# result = 1

# while True:
#     # 왼쪽부터 4방향 탐색
#     flag = 0
#     for _ in range(4):
#         d = (d-1) % 4
#         nr = r + dr[d]
#         nc = c + dc[d]
#         # 청소가 가능하고, 필요한 곳이면 작업 시작
#         if 0 <= nr < N and 0 <= nc < M and MAP[nr][nc] == 0:
#             if visited[nr][nc] == 0:
#                 visited[nr][nc] = 1
#                 result += 1
#                 r = nr
#                 c = nc
#                 flag = 1
#                 break
#     # 탐색결과 모두 청소가 되어있는 경우
#     if flag == 0:
#         if MAP[r - dr[d]][c - dc[d]] == 1:
#             print(result)
#             break
#         else:
#             r, c = r - dr[d], c - dc[d]

# ----------------------------------------------------

# N, M = map(int, input().split())
# r, c, d = map(int, input().split())
# MAP = [list(map(int, input().split())) for _ in range(N)]
# dr = [-1, 0, 1, 0]
# dc = [0, 1, 0, -1]

# def robot(r, c, d):
#     cnt = 1
#     MAP[r][c] = 2
#     while True:
#         for _ in range(4):
#             d = (d - 1) % 4
#             nr, nc = r + dr[d], c + dc[d]
#             if MAP[nr][nc] == 0:
#                 MAP[nr][nc] = 2
#                 cnt += 1
#                 r, c = nr, nc
#                 break
#         else:
#             r, c = r - dr[d], c - dc[d]
#             if MAP[r][c] == 1:
#                 return cnt

# print(robot(r, c, d))

# ---------------------------------------------
def dfs(r, c, d):
    global result
    if MAP[r][c] == 0:
        result += 1
        MAP[r][c] = 2
    for _ in range(4):
        nd = (d - 1) % 4
        nx = r + dx[nd]
        ny = c + dy[nd]
        if MAP[nx][ny] == 0:
            dfs(nx, ny, nd)
            return
        d = nd
    nx = r - dx[d]
    ny = c - dy[d]
    if MAP[nx][ny] == 1: return
    dfs(nx, ny, d)

dx = [-1, 0, 1, 0]
dy = [0, 1, 0, -1]
N, M = map(int, input().split())
r, c, d = map(int, input().split())
MAP = [list(map(int, input().split())) for _ in range(N)]
result = 0

dfs(r, c, d)
print(result)