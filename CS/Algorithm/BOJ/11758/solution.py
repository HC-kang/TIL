# import sys
# input = sys.stdin.readline

# p1 = list(map(int, input().rstrip().split()))
# p2 = list(map(int, input().rstrip().split()))
# p3 = list(map(int, input().rstrip().split()))
    
# def solution(p1, p2, p3):
#     if (p2[0]-p1[0]) == 0:
#         if (p2[1]-p1[1]) > 0:
#             if (p3[0] > p1[0]):
#                 return -1
#             elif (p3[0] > p3[0]):
#                 return 1
#             else:
#                 return 0
#         else:
#             if (p3[0] > p1[0]):
#                 return 1
#             elif (p3[0] > p3[0]):
#                 return -1
#             else:
#                 return 0
#     else:
#         dp1 = (p2[1]-p1[1]) / (p2[0]-p1[0])
#     c1 = p1[1] - dp1 * p1[0]
#     c2 = p3[1] - dp1 * p3[0]
#     if c1 == c2:
#         return 0
#     elif c1 > c2:
#         return -1
#     else:
#         return 1
    
# print(solution(p1, p2, p3))

# ------------------------------------------------------

import sys
input = sys.stdin.readline

p1 = list(map(int, input().rstrip().split()))
p2 = list(map(int, input().rstrip().split()))
p3 = list(map(int, input().rstrip().split()))
    
def solution(p1, p2, p3):
    return (p1[0] * p2[1] + p2[0] * p3[1] + p3[0] * p1[1] - (p2[0] * p1[1] + p3[0] * p2[1] + p1[0] * p3[1]))

result = solution(p1, p2, p3)
 
if result > 0:
    print(1)
elif result < 0:
    print(-1)
else:
    print(0)