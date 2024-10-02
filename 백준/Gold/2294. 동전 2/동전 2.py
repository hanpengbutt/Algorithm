import sys

input = sys.stdin.readline
N, K = map(int, input().split())
coins = [int(input()) for _ in range(N)]
dp = [0] * (K + 1)


def solution():
    for coin in coins:
        if coin < K + 1:
            dp[coin] = 1

    for i in range(1, K + 1):
        if not i in coins:
            cases = []
            for coin in coins:
                if -1 < i - coin and dp[i - coin] != 0:
                    cases.append(dp[i - coin])
            if cases:
                dp[i] = min(cases) + 1

    print(-1 if dp[K] == 0 else dp[K])


solution()
