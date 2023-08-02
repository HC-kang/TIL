# import sys
# input = sys.stdin.readline

# n = int(input())
# lst = list(map(int, input().split()))
# arr = [0]

# for l in lst:
#     if arr[-1]<l:
#         arr.append(l)
#     else:
#         left = 0
#         right = len(arr)

#         while left<right:
#             mid = (right+left)//2
#             if arr[mid]<l:
#                 left = mid+1
#             else:
#                 right = mid
#         arr[right] = l

# print(len(arr)-1)

# ---------------------------------------------

# import sys
# input = sys.stdin.readline

# n = int(input())
# lst = list(map(int, input().split()))
# arr = [0]

# for i in range(n):
#     left = 0
#     right = len(arr) - 1
#     while left <= right:
#         mid = (left + right) // 2
#         if arr[mid] < lst[i]:
#             left = mid + 1
#         else:
#             right = mid - 1
#     if left >= len(arr):
#         arr.append(lst[i])
#     else:
#         arr[left] = lst[i]

# print(len(arr) - 1)

# ---------------------------------------------

import sys
input = sys.stdin.readline
from bisect import bisect_left

n = int(input())
lst = list(map(int, input().split()))
arr = [0]

for a in lst:
    if arr[-1] < a:
        arr.append(a)
    else:
        arr[bisect_left(arr, a)] = a

print(len(arr) - 1)