from collections import deque
import sys

n = int(sys.stdin.readline())
d = deque(list(range(1, n + 1)))

while len(d) > 1:
    d.popleft()
    d.rotate(-1)

print(d[0])