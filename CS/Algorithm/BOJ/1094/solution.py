X = int(input().rstrip())
num = []
while X:
    if X % 2 == 1:
        num.append(1)
    else:
        num.append(0)
    X //= 2

print(sum(num))

# ----------------------------------------

print(bin(int(input())).count('1'))