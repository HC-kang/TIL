# import sys
# input = sys.stdin.readline

# N, D = map(int, input().rstrip().split())
# shorts = [list(map(int, input().rstrip().split())) for _ in range(N)]

# # print(shorts)
# real_shorts = list(filter(lambda x: x[2] < x[1]-x[0], shorts))
# # print(real_shorts)

# location = 0
# distance = 0
# entrances = [r[0] for r in real_shorts]
# exits = [r[1] for r in real_shorts]
# distances = [r[2] for r in real_shorts]

# while True:
#     if location in entrances:
#     if location == D:
#         break
#     location += 1
#     distance += 1

# --------------------------
import sys

N, D = map(int, sys.stdin.readline().split())
shorts = [list(map(int, input().split())) for _ in range(N)]
dis = [i for i in range(D+1)]

# 0 부터 고속도로의 길이까지 반복하여 확인
for i in range(D+1):

    # 지름길로 간 거리와 고속도로로 간 거리를 비교
    dis[i] = min(dis[i], dis[i-1]+1)

    # 지름길을 반복하여 최단 거리를 찾는다.
    for start, end, shortcut in shorts:
        if i == start and end <= D and dis[i]+shortcut < dis[end]:
            print(start, end, shortcut)
            # print('dis[i]+shortcut and dis[end]:', dis[i]+shortcut, dis[end])
            dis[end] = dis[i]+shortcut
        # elif i == start and end <= D:
            # print('elif:', start, end, shortcut)
            # print('dis[i]+shortcut and dis[end]:', dis[i]+shortcut, dis[end])

# 고속도로의 끝에 도착했을 때까지 걸린 거리를 출력
print(dis[D])

# ---------------------------------
# import heapq
# import sys
# input = sys.stdin.readline

# INF = int(1e9)

# def dijkstra(start):
#     q = []
#     heapq.heappush(q,(0,start))
#     distance[start] = 0
#     while q:
#         dist, now = heapq.heappop(q)

#         #지금 힙큐에서 뺀게 now까지 가는데 최소비용이 아닐수도 있으니 체크
#         if dist > distance[now]:
#             continue

#         for i in graph[now]:
#             cost = dist + i[1]
#             if cost < distance[i[0]]:
#                 distance[i[0]] = cost
#                 heapq.heappush(q,(cost, i[0]))


# n , d = map(int,input().split())
# graph = [[] for _ in range(d+1)]
# distance = [INF] * (d+1)

# #일단 거리 1로 초기화.
# for i in range(d):
#     graph[i].append((i+1, 1))

# #지름길 있는 경우에 업데이트
# for _ in range(n):
#     s, e, l = map(int,input().split())
#     if e > d:# 고려 안해도 됨.
#         continue
#     graph[s].append((e,l))

# dijkstra(0)
# print(distance[d])