def counting_sort(A, M):
    counts = [0] * M
    for v in A:
        counts[v] += 1
    print("counts: ", counts)

    pos = 0
    v = 0
    while pos < len(A):
        for idx in range(counts[v]):
            A[pos + idx] = v
        pos += counts[v]
        v += 1


# ----------------------------
def counting_sort(A, M):
    counts = [0] * M
    for v in A:
        counts[v] += 1
    print("counts: ", counts)

    pos = 0
    v = 0
    while pos < len(A):
        A[pos : pos + counts[v]] = [v] * counts[v]
        pos += counts[v]
        v += 1


# ----------------------------


lst = [4, 4, 0, 5, 1]
counting_sort(lst, 6)
lst  # [0, 1, 2]
