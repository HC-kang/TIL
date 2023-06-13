import sys
input = sys.stdin.readline

N = int(input().strip())

lst = [input().strip() for _ in range(N)]

def checker(string):
    stack = 0
    for s in string:
        if stack < 0:
            return 'NO'
        if s == '(':
            stack += 1
        else:
            stack -= 1
    if stack == 0:
        return 'YES'
    else:
        return 'NO'

for s in lst:
    print(checker(s))
    
