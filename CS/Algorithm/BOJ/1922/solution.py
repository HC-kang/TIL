import sys
input = sys.stdin.readline

N = int(input().strip())
MAP = [list(map(int, list(input().strip()))) for _ in range(N)]

def quad(MAP):
    if check(MAP):
        return str(MAP[0][0])
    else:
        n = len(MAP)
        half = n // 2
        MAP1 = [ele[:half] for ele in MAP[:half]]
        MAP2 = [ele[half:] for ele in MAP[:half]]
        MAP3 = [ele[:half] for ele in MAP[half:]]
        MAP4 = [ele[half:] for ele in MAP[half:]]
        return '(' + quad(MAP1) + quad(MAP2) + quad(MAP3) + quad(MAP4) + ')'

def check(lst):
    flattened = []
    for item in lst:
        flattened.extend(item)
    if len(set(flattened)) == 1:
        return True
    return False

    
print(quad(MAP))
