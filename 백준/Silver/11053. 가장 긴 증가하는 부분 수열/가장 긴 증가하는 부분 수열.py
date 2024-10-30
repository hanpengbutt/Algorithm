import sys

input = sys.stdin.readline
N = int(input())
A = list(map(int, input().split()))


def solution():
    graph = [[] for _ in range(N)]
    dp = [0] * N
    for i in range(1, N):
        now = A[i]
        for j in range(i + 1):
            prev = A[j]
            if now > prev:
                graph[i].append(j)

    for i in range(N):
        l = []
        for prev in graph[i]:
            l.append(dp[prev])
        dp[i] = (max(l) if l else 0) + 1

    print(max(dp))


solution()
