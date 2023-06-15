# import sys
# input = sys.stdin.readline

# N = int(input())

# lst = [input().strip() for _ in range(N)]

# lst.sort(key=lambda x: (int(x.split()[1]),int(x.split()[0])))

# for l in lst:
#     print(l)

# ------------------------------------
def aSort(string):
    a, b = string.split()
    return int(a) + int(b) * 1000000
N = int(input())
lst = [input() for _ in range(N)]
lst.sort(key=lambda x: aSort(x))
print('\n'.join(lst))