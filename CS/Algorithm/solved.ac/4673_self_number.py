def solution():
    result = []
    
    def nextNum(num):
        tmp = str(num)
        result = num + sum([int(n) for n in tmp])
        return result
    
    for i in range(1, 10001):
        result.append(nextNum(i))

    ansLst = sorted(list(set(range(1, 10001)) - set(result)))

    for i in ansLst:
        print(i)

solution()

# ----------------------------

# 1
# 3
# 5
# 7
# 9
# 20
# 31
# 42
# 53
# 64
#  |
#  |       <-- a lot more numbers
#  |
# 9903
# 9914
# 9925
# 9927
# 9938
# 9949
# 9960
# 9971
# 9982
# 9993