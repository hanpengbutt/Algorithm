import sys

input = sys.stdin.readline
N, K = map(int, input().split())
objects = []
for _ in range(N):
    objects.append(list(map(int, input().split())))
dp = {}

for W, V in objects:
    for key in sorted(dp.keys(), reverse=True):
        if dp[key] + W <= K:
            if key + V in dp.keys():
                dp[key + V] = min(dp[key + V], dp[key] + W)
            else:
                dp[key + V] = dp[key] + W

    if W <= K:
        if V in dp:
            dp[V] = min(dp[V], W)
        else:
            dp[V] = W

print(max(dp.keys()) if dp.keys() else 0)
