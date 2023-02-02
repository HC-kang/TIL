def sorting_two(A):
    return tuple(sorted(A, reverse=True)[:2])


def double_two(A):
    my_max = max(A)
    copy = list(A)
    copy.remove(my_max)
    return (my_max, max(copy))


def mutable_two(A):
    idx = max(range(len(A)), key=A.__getitem__)
    my_max = A[idx]
    del A[idx]
    second = max(A)
    A.insert(idx, my_max)
    return (my_max, second)
