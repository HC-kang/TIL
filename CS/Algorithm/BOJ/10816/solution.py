import sys
input = sys.stdin.readline

n = int(input())
cards = list(map(int, input().split()))
m = int(input())
targets = list(map(int, input().split()))

import collections

cards = collections.Counter(cards)
cards
result = []
for t in targets:
    result.append(str(cards[t]))
print(' '.join(result))

# -------------------------

import sys
from collections import Counter
from operator import itemgetter
input = sys.stdin.readline

N = int(input().rstrip())
numcard = input().rstrip().split()
M = int(input().rstrip())
candidate = input().rstrip().split()

counter = Counter(numcard)

result = str(itemgetter(*candidate)(counter))
result = result.replace(',', '')
        
print(result[1:-1])