import sys

input = sys.stdin.readline

N = int(input())
reservation = [list(map(int, input().split())) for _ in range(N)]


def solution():
    dp = {}
    MAX = 0
    for i in range(N):
        T, P = reservation[i]
        if i + T <= N:
            if not i + T in dp:
                dp[i + T] = MAX + P
            else:
                dp[i + T] = max(MAX + P, dp[i + T])
        MAX = max(MAX, dp[i+1] if i+1 in dp else 0)

    print(max(dp.values()) if dp else 0)

    


solution()
