def alternate(A):
    for v in A:
        v_is_largest = True
        for x in A:
            if v < x:
                v_is_largest = False
                break
        if v_is_largest:
            return v
    return None

# -----------------------------------------

lst1 = [3,4,5,6,43,4,5,6,2,34,43,2343,2111]
print(alternate(lst1))  # return 2343, true

lst2 = [-1, -23, -44, -2]
print(alternate(lst2))  # return -1, true
