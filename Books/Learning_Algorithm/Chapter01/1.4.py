def largest_two(A):
    my_max, second = A[:2]
    if my_max < second:
        my_max, second = second, my_max
    
    for idx in range(2, len(A)):
        if my_max < A[idx]:
            my_max, second = A[idx], my_max
        elif second < A[idx]:
            second = A[idx]
    return my_max, second

# -----------------------------------------

lst1 = [3,4,5,6,43,4,5,6,2,34,43,2343,2111]
print(largest_two(lst1))  # return (2343, 2111), true

lst2 = [-1, -23, -44, -2]
print(largest_two(lst2))  # return (-1, -2), true
