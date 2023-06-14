'''
세 각의 크기가 모두 60이면, Equilateral
세 각의 합이 180이고, 두 각이 같은 경우에는 Isosceles
세 각의 합이 180이고, 같은 각이 없는 경우에는 Scalene
세 각의 합이 180이 아닌 경우에는 Error
'''

import sys
input = sys.stdin.readline
a = int(input().rstrip())
b = int(input().rstrip())
c = int(input().rstrip())

if (a + b + c) != 180:
    print('Error')
elif a == b == c == 60:
    print('Equilateral')
elif len(set([a, b, c])) < 3:
    print('Isosceles')
else:
    print('Scalene')
