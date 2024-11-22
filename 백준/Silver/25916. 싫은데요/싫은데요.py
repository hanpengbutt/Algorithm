N, M = map(int, input().split())
A = list(map(int, input().split()))
result = [0] * N

idx = 0
result[0] = A[0] if A[0] <= M else 0
for i in range(1, N):
    if A[i] > M:
        result[i] = 0
        idx = i + 1

    else:
        v = result[i - 1] + A[i]
        while v > M:
            v -= A[idx]
            idx += 1
        result[i] = v

print(max(result))
