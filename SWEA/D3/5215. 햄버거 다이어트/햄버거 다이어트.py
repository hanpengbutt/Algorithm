T = int(input())


def solution():
    N, L = map(int, input().split())
    ingredients = []
    for _ in range(N):
        ingredients.append(list(map(int, input().split())))
    dp = {}

    for flavor, calorie in ingredients:
        for key in sorted(dp.keys(), reverse=True):
            if dp[key] + calorie <= L:
                if key + flavor in dp:
                    dp[key + flavor] = min(dp[key] + calorie, dp[key + flavor])
                else:
                    dp[key + flavor] = dp[key] + calorie
        if flavor in dp:
            dp[flavor] = min(dp[flavor], calorie)
        else:
            dp[flavor] = calorie

    return max(dp.keys())


for i in range(T):
    print(f"#{i + 1} {solution()}")
