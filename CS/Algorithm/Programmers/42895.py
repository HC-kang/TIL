def solution(N, number):
    SET = []
    
    for i in range(1, 9):
        nums = set()
        nums.add(int(str(N) * i))
        
        for j in range(0, i-1):
            for a in SET[j]:
                for b in SET[-j-1]:
                    nums.add(a+b)
                    nums.add(a-b)
                    nums.add(a*b)
                    if b != 0:
                        nums.add(a//b)
        if number in nums:
            return i
        SET.append(nums)
    for i in range(len(SET)):
        if number in SET[i]:
            return i+1
    return -1