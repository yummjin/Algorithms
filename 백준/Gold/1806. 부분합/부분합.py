import sys

n, s = map(int, sys.stdin.readline().split())
nums = list(map(int, sys.stdin.readline().split()))
result = []

nums_sum = 0
end = 0

for start in range(n):
    while nums_sum < s and end < n:
        nums_sum += nums[end]
        end += 1
    if nums_sum >= s:
        result.append(abs(end - start))
    nums_sum -= nums[start]

if len(result) == 0:
    print(0)
else:
    print(min(result))

