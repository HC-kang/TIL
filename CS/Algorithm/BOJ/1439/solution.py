# import sys
# input = sys.stdin.readline

# s = input().rstrip()

# if s == '' or '1' not in s or '0' not in s:
#     print(0)
# else:
#     s = list(s)
#     result = 0
#     tmp1 = s.pop()
#     for i in range(len(s)):
#         tmp2 = s.pop()
#         if tmp1 != tmp2:
#             result += 1
#             tmp1 = tmp2
#     print(result//2 + result % 2)

# -------------------------------------------

import sys
s = sys.stdin.readline().strip()
print(max(s.count('01'), s.count('10')))