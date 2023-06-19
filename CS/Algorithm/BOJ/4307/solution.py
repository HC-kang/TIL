import sys
input = sys.stdin.readline

T = int(input().rstrip())

for _ in range(T):
    L, N = map(int, input().rstrip().split())
    min_lst = []
    max_lst = []
    for _ in range(N):
        loc = int(input().rstrip())
        min_lst.append(min(loc, L-loc))
        max_lst.append(max(loc, L-loc))
    print(max(min_lst), max(max_lst))
    
# -------------------------------------

import sys
read=sys.stdin.readline
for _ in range(int(read())):
	mn=0
	mx=0
	l,n=map(int,read().split())
	for _ in range(n):
		k=int(read())
		mn=max(mn,min(k,l-k))
		mx=max(mx,k,l-k)
	print(mn,mx)
    

'''
|----------|
| 1   23   |
|  1 2  3  |
| 1   2  3 |
|1     2  3|
|       2  |
|        2 |
|         2|
'''