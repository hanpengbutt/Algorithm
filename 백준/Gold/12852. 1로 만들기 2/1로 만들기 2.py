N = int(input())


def solution(N):
    if N == 1:
        return "0\n1"

    dp = [[0, 0] for _ in range(N + 1)]
    nows = [N]

    while not dp[1][0]:
        new_nows = []

        for now in nows:
            now_count = dp[now][0]

            if not now % 3 and not dp[int(now / 3)][0]:
                dp[int(now / 3)][0] = now_count + 1
                dp[int(now / 3)][1] = now
                new_nows.append(int(now / 3))

            if not now % 2 and not dp[int(now / 2)][0]:
                dp[int(now / 2)][0] = now_count + 1
                dp[int(now / 2)][1] = now
                new_nows.append(int(now / 2))

            if now - 1 > 0 and not dp[now - 1][0]:
                dp[now - 1][0] = now_count + 1
                dp[now - 1][1] = now
                new_nows.append(now - 1)

        nows = new_nows

    now = 1
    result = [1]
    for _ in range(dp[1][0]):
        now = dp[now][1]
        result.append(now)

    return f"{str(dp[1][0])}\n{" ".join(map(str, reversed(result)))}"


print(solution(N))
