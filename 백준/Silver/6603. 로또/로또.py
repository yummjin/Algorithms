import sys
from itertools import combinations

nums = []
while True:
    testInput = sys.stdin.readline()
    if testInput == "0\n":
        break
    testInput = list(map(int, testInput.split()))
    nums.append({'t': testInput.pop(0), 'S': testInput})

for i in range(0, len(nums)):
    for j in combinations(nums[i]['S'], 6):
        print(*j)
    print()
