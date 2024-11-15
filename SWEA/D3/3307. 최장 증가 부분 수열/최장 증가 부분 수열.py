def solution(t):
    N = int(input())
    graph = [[] for _ in range(N)]
    A = list(map(int, input().split()))
    dp = [1] * (N)

    for i in range(1, N):
        now = A[i]
        for j in range(i):
            prev = A[j]
            if prev < now:
                graph[i].append(j)


    for i in range(1, N):
        max_count = 0
        for j in graph[i]:
            if dp[j] > max_count:
                max_count = dp[j]
        dp[i] = max_count + 1

    print(f'#{t + 1} {max(dp)}')


for t in range(int(input())):
    solution(t)
