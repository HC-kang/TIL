# def is_available(col, queens):
#     current_row = len(queens)
#     for queen_row in range(current_row):
#         if queens[queen_row] == col or \
#            queens[queen_row] - col == current_row - queen_row or \
#            queens[queen_row] - col == queen_row - current_row:
#             return False
#     return True

# def n_queen(n, queens):
#     if len(queens) == n:
#         return 1

#     count = 0
#     for col in range(n):
#         if is_available(col, queens):
#             queens.append(col)
#             count += n_queen(n, queens)
#             queens.pop()
#     return count

# n = int(input())
# queens = []
# print(n_queen(n, queens))

# ------------------------------------------
# N = int(input().rstrip())

# result = 0
# rows = [0] * N

# def is_promising(r):
#     for i in range(r):
#         if rows[r] == rows[i]:
#             return False
#         if rows[r] - rows[i] == r - i:
#             return False
#         if rows[i] - rows[r] == r - i:
#             return False
#     return True

# def n_queens(r):
#     global result
#     if r == N:
#         result += 1
#         return
#     else:
#         for i in range(N):
#             rows[r] = i
#             if is_promising(r):
#                 n_queens(r+1)
# n_queens(0)
# print(result)

# -------------------------------------

N = int(input().rstrip())

result = 0
rows = [0] * N

def is_promising(r):
    for i in range(r):
        if rows[r] == rows[i]:
            return False
        if abs(rows[r] - rows[i]) == abs(r - i):
            return False
    return True

def n_queens(r):
    global result
    if r == N:
        result += 1
        return
    else:
        for i in range(N):
            rows[r] = i
            if is_promising(r):
                n_queens(r+1)
n_queens(0)
print(result)


'''
1: 1
2: 0
3: 0
4: 2
5: 
'''
