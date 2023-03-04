def two_largest_attempt(A):
    m1 = max(A[: len(A) // 2])
    m2 = max(A[len(A) // 2 :])
    if m1 < m2:
        return (m2, m1)
    return (m1, m2)


# ----------------------------
lst = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
two_largest_attempt(lst)
