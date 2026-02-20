[N, M] = map(int, input().split())
perm = list(map(int, input().split()))
ranges = []

for i in range(M):
    ranges.append(list(map(int, input().split())))


def solution(N, M, perm, ranges):
    psum = [0 for _ in range(N + 1)]
    for i in range(1, N + 1):
        psum[i] = psum[i - 1] + perm[i - 1]

    result = []
    for r in ranges:
        [start, end] = r
        result.append(psum[end] - psum[start - 1])

    return "\n".join(map(str, result))


print(solution(N, M, perm, ranges))
