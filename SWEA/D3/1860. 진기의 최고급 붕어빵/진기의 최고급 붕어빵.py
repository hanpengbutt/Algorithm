T = int(input())


def solution():
    N, M, K = map(int, input().split())
    C = list(map(int, input().split()))
    counts = [0] * (max(C) + 1)
    result = "Possible"

    if 0 in C:
        return "Impossible"

    for i in range(1, len(counts)):
        if i % M == 0:
            counts[i] = counts[i - 1] + K
        else:
            counts[i] = counts[i - 1]

        if i in C:
            if counts[i] < 1:
                result = "Impossible"
                break
            else:
                counts[i] -= 1

    return result


for i in range(T):
    print(f"#{i + 1} {solution()}")
