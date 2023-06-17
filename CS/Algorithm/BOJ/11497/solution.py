# import sys
# from collections import deque
# input = sys.stdin.readline

# T = int(input().rstrip())

# def sol(lst):
#     lst.sort()
#     newLst = deque()
#     if len(lst) == 1:
#         return 0
#     if len(set(lst)) == 1:
#         return 0
#     if len(lst) == 2:
#         return lst[1] - lst[0]
#     for i, l in enumerate(lst):
#         if i % 2 == 0:
#             newLst.appendleft(l)
#         else:
#             newLst.append(l)
#     newLst = list(newLst)
#     return max([abs(newLst[i] - newLst[i+1]) for i in range(len(newLst)-1)])

# result = []

# for _ in range(T):
#     _ = int(input().rstrip())
#     lst = list(map(int, input().rstrip().split()))
#     result.append(sol(lst))

# for i in result:
#     print(i)


# '''
# 7 4 2 5 9
# 5 4 2 7 9

# 13 10 12 11 10 11 12
# 10 10 11 11 12 12 13

# 12 11 10 10 11 12 13
# '''

# -----------------------------

import sys
input=sys.stdin.readline

for _ in range(int(input())):
    N = int(input())
    lst = sorted(list(map(int, input().split())))
    print(max([lst[i+2]-lst[i] for i in range(N-2)]))