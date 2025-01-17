def func_pow(x):
    return(pow(31, x))
def func_hashing(x):
    return(x - 96)
N = int(input())
num_pow = []
inputs = list(map(ord, input()))
nums = list(map(func_hashing, inputs))
for i in range(0, N):
    num_pow.append(nums[i]*func_pow(i))
print(sum(num_pow) % 1234567891)