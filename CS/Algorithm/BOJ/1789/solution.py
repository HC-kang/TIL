S = int(input())
memo = []
i = 0
sum = 0
while True:
    sum = sum + i
    memo.append(sum)
    if memo[i] > S:
        break
    i += 1
print(i-1)