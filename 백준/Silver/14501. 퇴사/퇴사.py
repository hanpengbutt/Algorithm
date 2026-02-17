N = int(input())
meetings = []

for i in range(N):
    [during, value] = list(map(int, input().split()))
    if i + during <= N:
        meetings.append([i + 1, i + during, value])

meetings.sort(key=lambda meeting: meeting[1])

dp = [[0 for _ in range(N + 1)] for _ in range(len(meetings) + 1)]

for i in range(1, len(meetings) + 1):
    [start, end, value] = meetings[i - 1]
    m = max(dp[i - 1][end], dp[i - 1][start - 1] + value)
    for j in range(1, N + 1):
        dp[i][j] = dp[i - 1][j] if j < end else m

print(dp[len(meetings)][N])
