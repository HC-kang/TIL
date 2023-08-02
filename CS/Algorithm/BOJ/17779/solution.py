# import sys
# input = sys.stdin.readline


# def solution(r, c, d1, d2):
#     population = [0 for i in range(5)]
#     elec = [[0] * (N + 1) for i in range(N + 1)]

#     for i in range(d1 + 1):
#         elec[r + i][c - i] = 5
#         elec[r + d2 + i][c + d2 - i] = 5
#     for i in range(d2 + 1):
#         elec[r + i][c + i] = 5
#         elec[r + d1 + i][c - d1 + i] = 5

#     for i in range(r + 1, r + d1 + d2):
#         flag = False

#         for j in range(1, N + 1):
#             if elec[i][j] == 5:
#               flag = not flag
#             if flag:
#               elec[i][j] = 5

#     for row in range(1, N + 1):
#         for col in range(1, N + 1):
#             if row < r + d1 and col <= c and elec[row][col] == 0:
#               population[0] += MAP[row][col]
#             elif row <= r + d2 and c < col and elec[row][col] == 0:
#               population[1] += MAP[row][col]
#             elif r + d1 <= row and col < c - d1 + d2 and elec[row][col] == 0:
#               population[2] += MAP[row][col]
#             elif r + d2 < row and c - d1 + d2 <= col and elec[row][col] == 0:
#               population[3] += MAP[row][col]
#             elif elec[row][col] == 5:
#               population[4] += MAP[row][col]
#     return max(population) - min(population)


# N = int(input().rstrip())

# MAP = [[]]
# result = 1e9
# for i in range(N):
#   MAP.append([0] + list(map(int, input().split())))

# result = int(1e9)

# for r in range(1, N + 1):
#     for c in range(1, N + 1):
#         for d1 in range(1, N + 1):
#             for d2 in range(1, N + 1):
#                 if 1 <= r < r + d1 + d2 <= N and 1 <= c - d1 < c < c + d2 <= N:
#                     result = min(result, solution(r, c, d1, d2))

# print(result)


# --------------------------------------------------------
INF = int(1e9)
def solve(x, y, d1, d2):
    temp = [[0] * (n + 1) for _ in range(n + 1)]
    # 2번 조건
    temp[x][y] = 5
    for i in range(1, d1 + 1):
        temp[x + i][y - i] = 5
    for i in range(1, d2 + 1):
        temp[x + i][y + i] = 5
    for i in range(1, d2 + 1):
        temp[x + d1 + i][y - d1 + i] = 5
    for i in range(1, d1 + 1):
        temp[x + d2 + i][y + d2 - i] = 5

    people = [0] * 5
    # 1번 선거구
    for r in range(1, x + d1):
        for c in range(1, y + 1):
            if temp[r][c] == 5:
                break
            else:
                people[0] += maps[r][c]

    # 2번 선거구
    for r in range(1, x + d2 + 1):
        for c in range(n, y, -1):
            if temp[r][c] == 5:
                break
            else:
                people[1] += maps[r][c]

    # 3번 선거구
    for r in range(x + d1, n + 1):
        for c in range(1, y - d1 + d2):
            if temp[r][c] == 5:
                break
            else:
                people[2] += maps[r][c]

    # 4번 선거구
    for r in range(x + d2 + 1, n + 1):
        for c in range(n, y - d1 + d2 - 1, -1):
            if temp[r][c] == 5:
                break
            else:
                people[3] += maps[r][c]

    # 5번 선거구
    people[4] = total - sum(people)
    return max(people) - min(people)


n = int(input())
maps = [[0] * (n + 1)] + [[0] + list(map(int, input().split())) for _ in range(n)]

total = 0
for i in range(1, n + 1):
    total += sum(maps[i])

answer = INF
for x in range(1, n + 1):
    for y in range(1, n + 1):
        for d1 in range(1, n + 1):
            for d2 in range(1, n + 1):
                # 1번 조건
                if x + d1 + d2 > n:
                    continue
                if y - d1 < 1:
                    continue
                if y + d2 > n:
                    continue

                answer = min(answer, solve(x, y, d1, d2))

print(answer)