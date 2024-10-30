import sys

input = sys.stdin.readline

N = int(input())
A = list(map(int, input().split()))


def solution():
    graph = [[] for _ in range(N)]
    dp = [[] for _ in range(N)]
    for i in range(N):
        now = A[i]
        for j in range(len(A[:i])):
            prev = A[j]
            if prev < now:
                graph[i].append(j)

    for i in range(N):
        now = A[i]
        l = []
        for j in graph[i]:
            l.append(dp[j][:])

        maxL = l[0] if l else []
        for j in range(1, len(l)):
            if sum(l[j]) > sum(maxL):
                maxL = l[j]
        maxL.append(now)
        dp[i] = maxL

    print(max(map(sum, dp)))


solution()
