# import sys
# input = sys.stdin.readline

# dwarfs = [int(input().rstrip()) for _ in range(9)]
# diff = sum(dwarfs) - 100
# for i in range(8):
#     for j in range(i+1, 9):
#         if dwarfs[i] + dwarfs[j] == diff:
#             targets =[j, i]

# dwarfs.pop(targets[0])
# dwarfs.pop(targets[1])
# for d in dwarfs:
#     print(d)

# ---------------------------------------------------
from itertools import combinations

dwarfs = [int(input().rstrip()) for _ in range(9)]

for ids in combinations(range(9), 7):
    if sum(dwarfs[i] for i in ids) == 100:
        for i in ids:
            print(dwarfs[i])
        break