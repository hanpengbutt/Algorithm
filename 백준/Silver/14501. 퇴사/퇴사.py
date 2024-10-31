import sys

input = sys.stdin.readline

N = int(input())
reservation = [list(map(int, input().split())) for _ in range(N)]


def solution():
    dp = {0:0}
    for i in range(N):
        T, P = reservation[i]
        l = []
        if i + T <= N:
            for time in sorted(dp.keys(), reverse=True):
                if time <= i:
                    l.append(dp[time])

            if not i + T in dp.keys():
                dp[i + T] = (max(l) if l else 0) + P
            else:
                dp[i + T] = max((max(l) if l else 0) + P, dp[i + T])

    print(max(dp.values()))

solution()
