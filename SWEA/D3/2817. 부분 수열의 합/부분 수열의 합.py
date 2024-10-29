T = int(input())


def solution():
    N, K = map(int, input().split())
    A = list(map(int, input().split()))
    l = [0] * (sum(A) + 1)
    l[A[0]] = 1
    maxIdx = A[0]

    for i in range(1, len(A)):
        num = A[i]
        for j in range(maxIdx, 0, -1):
            l[j + num] += l[j]
        l[num] += 1
        maxIdx += num
    
    return l[K] if K <= sum(A) else 0

for i in range(T):
    print(f"#{i + 1} {solution()}")
