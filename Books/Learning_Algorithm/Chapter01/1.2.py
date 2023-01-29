def largest(A):
    my_max = A[0]
    for idx in range(1, len(A)):
        if my_max < A[idx]:
            my_max = A[idx]
    return my_max

# -----------------------------------------

lst1 = [3,4,5,6,43,4,5,6,2,34,43,2343,2111]
print(largest(lst1))  # return 2343, true

lst2 = [-1, -23, -44, -2]
print(largest(lst2))  # return -1, true
