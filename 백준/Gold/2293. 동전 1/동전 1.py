import sys

input = sys.stdin.readline
N, K = map(int, input().split())
coins = [int(input()) for _ in range(N)]
dp = [0] * (K + 1)


def solution():
    for coin in coins:
        if coin <= K:
            dp[coin] += 1
        for i in range(1, K + 1):
            if -1 < i - coin:
                dp[i] += dp[i - coin]

    print(dp[K])


solution()