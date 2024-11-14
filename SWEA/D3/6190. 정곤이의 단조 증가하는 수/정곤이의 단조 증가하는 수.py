def solution(i):
    result = -1
    N = int(input())
    A = list(map(int, input().split()))

    for j in range(N):
        for k in range(N - j - 1):
            product = A[j] * A[j + k + 1]
            if product > result:
                origin = list(str(product))
                if sorted(origin) == origin:
                    result = product

    print(f"#{i+1} {result}")


for i in range(int(input())):
    solution(i)
