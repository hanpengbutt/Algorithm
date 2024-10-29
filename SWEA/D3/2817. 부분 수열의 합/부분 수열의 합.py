T = int(input())


def solution():
    N, K = map(int, input().split())
    l = [0] * (2**N)
    A = list(map(int, input().split()))

    for i in range(N):
        num = A[i]
        for j in range(0, 2**N, 2 ** (i + 1)):
            for k in range(2**i):
                l[j + k] += num

    return len([x for x in l if x == K])


for i in range(T):
    print(f"#{i + 1} {solution()}")
