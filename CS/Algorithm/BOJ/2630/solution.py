import sys
input = sys.stdin.readline

N = int(input().rstrip())

paper = [list(map(int, input().rstrip().split())) for _ in range(N)]

blue = 0
white = 0

def cut(paper):
    global blue
    global white
    if len(paper) == 1:
        if paper[0][0] == 1:
            blue += 1
        else:
            white += 1
    else:
        if sum(map(sum, paper)) == len(paper) ** 2:
            blue += 1
        elif sum(map(sum, paper)) == 0:
            white += 1
        else:
            cut([p[:len(paper)//2] for p in paper[:len(paper)//2]])
            cut([p[len(paper)//2:] for p in paper[:len(paper)//2]])
            cut([p[:len(paper)//2] for p in paper[len(paper)//2:]])
            cut([p[len(paper)//2:] for p in paper[len(paper)//2:]])

cut(paper)

print(white)
print(blue)