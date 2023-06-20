import sys
import heapq
input = sys.stdin.readline

dx = [1, 0, -1, 0]
dy = [0, 1, 0, -1]
INF = int(1e9)

def dijkstra():
    queue = []
    heapq.heappush(queue, (MAP[0][0], 0, 0))
    rupee[0][0] = 0

    while queue:
        cost, x, y = heapq.heappop(queue)
        
        if x == N - 1 and y == N - 1:
            print(f'Problem {num_cnt}: {rupee[x][y]}')
            break
        
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            
            if 0 <= nx < N and 0 <= ny < N:
                new_cost = cost + MAP[nx][ny]
                
                if new_cost < rupee[nx][ny]:
                    rupee[nx][ny] = new_cost
                    heapq.heappush(queue, (new_cost, nx, ny))

num_cnt = 1

while True:
    N = int(input().rstrip())
    if N == 0:
        break
    MAP = [list(map(int, input().rstrip().split())) for _ in range(N)]
    rupee = [[INF] * N for _ in range(N)]
    dijkstra()
    num_cnt += 1