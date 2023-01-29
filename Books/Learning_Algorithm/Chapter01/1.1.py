def flawed(A):
    my_max = 0
    for v in A:
        if my_max < v:
            my_max = v
    return my_max

# -----------------------------------------

lst1 = [3,4,5,6,43,4,5,6,2,34,43,2343,2111]
print(flawed(lst1))  # return 2343, true

lst2 = [-1, -23, -44, -2]
print(flawed(lst2))  # return 0, false
