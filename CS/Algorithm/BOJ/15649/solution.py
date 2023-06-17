# M, N = map(int, input().split())
 
# S = []

# def dfs():
#     if len(S) == N:
#         print(' '.join(map(str, S)))
#         return
#     for i in range(1, M + 1):
#         if i not in S:
#             S.append(i)
#             dfs()
#             S.pop()
  
# dfs()



# ------------------------------
M, N = map(int, input().rstrip().split())

S = []

def dfs():
    if len(S) == N:
        print(' '.join(map(str, S)))
        return
    for i in range(1, M+1):
        if i not in S:
            S.append(i)
            dfs()
            S.pop()

dfs()