import sys
import math

N = int(sys.stdin.readline().strip())

result = []

def is_prime(num):
    if num < 2:
        return False
    for i in range(2, int(math.sqrt(num)) + 1):
        if num % i == 0:
            return False
    return True

def dfs(depth, num=""):
    if depth == N:
        result.append(num)
        return

    for i in range(10):
        next_num = num + str(i)
        if is_prime(int(next_num)):
            dfs(depth + 1, next_num)

dfs(0)

print("\n".join(result))
