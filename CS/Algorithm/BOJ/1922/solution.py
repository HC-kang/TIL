# import sys
# input = sys.stdin.readline

# N = int(input().strip())
# MAP = [list(map(int, list(input().strip()))) for _ in range(N)]

# def quad(MAP):
#     if check(MAP):
#         return str(MAP[0][0])
#     else:
#         n = len(MAP)
#         half = n // 2
#         MAP1 = [ele[:half] for ele in MAP[:half]]
#         MAP2 = [ele[half:] for ele in MAP[:half]]
#         MAP3 = [ele[:half] for ele in MAP[half:]]
#         MAP4 = [ele[half:] for ele in MAP[half:]]
#         return '(' + quad(MAP1) + quad(MAP2) + quad(MAP3) + quad(MAP4) + ')'

# def check(lst):
#     flattened = []
#     for item in lst:
#         flattened.extend(item)
#     if len(set(flattened)) == 1:
#         return True
#     return False

    
# print(quad(MAP))

# ----------------------------------

# def zip(n, a, b):
#   n /= 2
#   if n == 1:
#     i = input_list[int(a)][int(b)]
#     j = input_list[int(a)][int(b+1)]
#     k = input_list[int(a + 1)][int(b)]
#     l = input_list[int(a + 1)][int(b + 1)]
#   else:
#     i = zip(n, a, b)
#     j = zip(n, a, b + n)
#     k = zip(n, a + n, b)
#     l = zip(n, a + n, b + n)
#   if i == j == k == l and (i == '0' or i == '1'):
#     return i
#   else:
#     return '({}{}{}{})'.format(i, j, k, l)

# n = int(input())
# input_list=[]
# for i in range(n):
#   input_list.append(input())
# print(zip(n, 0, 0))

# -------------------------------
def crop_paper(paper, length):
    length_h = int(length/2)

    ids = [0, 1, length, length+1]
    cnt = 0

    ret = list()
    while True:
        if cnt < length_h:
            quad = [paper[ids[0]], paper[ids[1]], paper[ids[2]], paper[ids[3]]]
            try: f = sum(quad)
            except: f = -1

            if f == 4: ret.append(1)
            elif f == 0: ret.append(0)
            else: ret.append(quad)

        elif cnt == length-1:
            cnt = -1

        ids = [i+2 for i in ids]
        cnt += 1
        if ids[-1] > length*length: break

    if length > 2:
        length = int(length/2)
        ret = crop_paper(ret, length)
    else:
        return ret

    return ret

if __name__=='__main__':
    length = int(input())
    length_h = int(length/2)

    paper = list()
    for _ in range(length):
        paper.extend(list(map(int, list(input()))))

    ret = crop_paper(paper, length)
    ret = str(ret).replace('[', '(').replace(']', ')').replace(' ', '').replace(',', '')
    ret = (ret[1:])[:-1]
    print(ret)
