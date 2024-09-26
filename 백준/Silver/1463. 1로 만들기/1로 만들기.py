N = int(input())
INF = int(1e9)
dp = [INF] * (N + 1)

def solution():
    dp[1] = 0
    for i in range(2, N + 1):
        compare = [dp[i - 1] + 1]
        if i % 3 == 0:
            compare.append(dp[int(i / 3)] + 1)
        if i % 2 == 0:
            compare.append(dp[int(i / 2)] + 1) 
        
        dp[i] = min(compare)

    print(dp[N])


solution()