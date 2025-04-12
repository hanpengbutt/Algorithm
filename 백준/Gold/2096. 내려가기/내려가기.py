N = int(input())

def solution(N):
    min_dp = [[0] * 3 for _ in range(2)]
    max_dp = [[0] * 3 for _ in range(2)]
    
    [val1, val2, val3] = map(int, input().split())
    min_dp[0][0] = max_dp[0][0] = val1
    min_dp[0][1] = max_dp[0][1] = val2
    min_dp[0][2] = max_dp[0][2] = val3
    
    for i in range(1, N):
        [val1, val2, val3] = map(int, input().split())
        if i % 2 == 0:
            min_dp[0][0] = min(min_dp[1][0], min_dp[1][1]) + val1
            min_dp[0][1] = min(min_dp[1][0], min_dp[1][1], min_dp[1][2]) + val2
            min_dp[0][2] = min(min_dp[1][1], min_dp[1][2]) + val3
            max_dp[0][0] = max(max_dp[1][0], max_dp[1][1]) + val1
            max_dp[0][1] = max(max_dp[1][0], max_dp[1][1], max_dp[1][2]) + val2
            max_dp[0][2] = max(max_dp[1][1], max_dp[1][2]) + val3
        else:
            min_dp[1][0] = min(min_dp[0][0], min_dp[0][1]) + val1
            min_dp[1][1] = min(min_dp[0][0], min_dp[0][1], min_dp[0][2]) + val2
            min_dp[1][2] = min(min_dp[0][1], min_dp[0][2]) + val3
            max_dp[1][0] = max(max_dp[0][0], max_dp[0][1]) + val1
            max_dp[1][1] = max(max_dp[0][0], max_dp[0][1], max_dp[0][2]) + val2
            max_dp[1][2] = max(max_dp[0][1], max_dp[0][2]) + val3
    
    if N % 2 == 0:
        return f"{max(max_dp[1])} {min(min_dp[1])}"
    else:
        return f"{max(max_dp[0])} {min(min_dp[0])}"

print(solution(N))