# import sys
# input = sys.stdin.readline

# N = int(input().rstrip())

# graph = [list(map(int, input().rstrip().split())) for _ in range(N)]

# MAP = {
#     i: [] for i in range(N)
# }

# for i, ele in enumerate(graph):
#     for j, e in enumerate(ele):
#         if e == 1:
#             MAP[i].append(j)
            
# result = []
    
# print(MAP)
# for i in range(N):
#     while True:
#         tmp = i
#         tmpArr = set()
#         tmpArr.add(tmp)
#         if tmp in tmpArr:
#             result.append(tmpArr)
#             break
#         tmp = MAP[i][0]

# print(result)


# ----------------------------
# 플로이드-와샬 알고리즘
# n = int(input())
# graph = [list(map(int, input().split())) for _ in range(n)]
 
# for i in range(n):
#     for j in range(n):
#         for k in range(n):
#             if graph[j][i] and graph[i][k]:
#                 graph[j][k] = 1
                
# for g in graph:
#     print(*g)

# -------------------------
# BFS
# from collections import deque
 
# n = int(input())
# graph = [list(map(int, input().split())) for _ in range(n)]
# visited = [[0]*n for _ in range(n)]
 
# def bfs(x):
#     queue = deque()
#     queue.append(x)
#     check = [0 for _ in range(n)]
 
#     while queue:
#         q = queue.popleft()
 
#         for i in range(n):
#             if check[i] == 0 and graph[q][i] == 1:
#                 queue.append(i)
#                 check[i] = 1
#                 visited[x][i] = 1
 
# for i in range(0, n):
#     bfs(i)
 
# for i in visited:
#     print(*i)
# ------------------------------------

# DFS
n = int(input())
graph = [list(map(int, input().split())) for _ in range(n)]
visited = [0 for _ in range(n)]
 
def dfs(x):
    for i in range(n):
        if graph[x][i] == 1 and visited[i] == 0:
            visited[i] = 1
            dfs(i)
 
visited = [0 for _ in range(n)]
for i in range(n):
    dfs(i)
    for j in range(n):
        if visited[j] == 1:
            print(1, end=' ')
        else:
            print(0, end=' ')
    print()
    visited = [0 for _ in range(n)]