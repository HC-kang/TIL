'''
1. 아이디어
- 값이 1, 방문X인 노드를 BFS로 탐색
- 위 과정을 반복하면서 방문한 노드는 방문 처리 

2. 시간복잡도
- BFS: O(V+E)
- V: 노드의 개수 = 500 * 500
- E: 간선의 개수 = 4 * 500 * 500
- O(500 * 500 + 4 * 500 * 500) = O(1,250,000)
- 1,250,000 << 200,000,000 - 시간 초과 X

3. 자료구조
- 그래프 전체 지도 : 2차원 배열 - int[][]
- 방문 지도: 2차원 배열 - boolean[][]
- Queue(BFS)
'''

import sys
input = sys.stdin.readline

n, m = map(int, input().split())
map = [list(map(int, input().split())) for _ in range(n)]
chk = [[False] * m for _ in range(n)]

dy = [0, 1, 0, -1]
dx = [1, 0, -1, 0]

def bfs(y, x):
    rs = 1
    q = [(y, x)]
    while q:
        ey, ex = q.pop()
        for k in range(4):
            ny = ey + dy[k]
            nx = ex + dx[k]
            if 0 <= ny < n and 0 <= nx < m:
                if map[ny][nx] == 1 and chk[ny][nx] == False:
                    rs += 1
                    chk[ny][nx] = True
                    q.append((ny, nx))
    return rs
                    

cnt = 0
maxValue = 0
for j in range(n):
    for i in range(m):
        if map[j][i] == 1 and chk[j][i] == False:
            # 방문 표시
            chk[j][i] = True
            # 지난 경로 수 +1
            cnt += 1
            # 1로 표기된 크기 +1
            maxValue = max(maxValue, bfs(j, i))
            # 최댓값 갱신

print(cnt)
print(maxValue)

# -----------------------------------------------
from collections import deque

import sys
input = sys.stdin.readline

n,m = map(int, input().split())
map = [list(map(int, input().split())) for _ in range(n)]
chk = [[False] * m for _ in range(n)]

dy = [0,1,0,-1]
dx = [1,0,-1,0]

def bfs(y, x):
    rs = 1
    q = deque()
    q.append((y, x))
    while q:
        ey, ex = q.popleft()
        for k in range(4):
            ny = ey + dy[k]
            nx = ex + dx[k]
            if 0 <= ny < n and 0 <= nx < m:
                if map[ny][nx] == 1 and chk[ny][nx] == False:
                    rs += 1
                    chk[ny][nx] = True
                    q.append((ny,nx))
    return rs

cnt = 0
maxValue = 0
for j in range(n):
    for i in range(m):
        if map[j][i] == 1 and chk[j][i] == False:
            chk[j][i] = True
            cnt += 1
            maxValue = max(maxValue, bfs(j,i))

print(cnt)
print(maxValue)