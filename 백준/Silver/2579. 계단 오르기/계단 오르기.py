import sys

input = sys.stdin.readline

N = int(input())
v = [int(input()) for _ in range(N)]
v = [0] + v[:]
dp = [0] * (N + 1)


def solution():
    dp[1] = v[1]
    if N > 1:
        dp[2] = v[1] + v[2]

    for i in range(3, N + 1):
        dp[i] = max(dp[i - 3] + v[i - 1], dp[i - 2]) + v[i]

    print(dp[N])


solution()
