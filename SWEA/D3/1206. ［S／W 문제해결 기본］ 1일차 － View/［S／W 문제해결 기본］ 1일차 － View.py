result = []


def solution():
    count = 0
    N = int(input())
    matrix = []
    for _ in range(256):
        matrix.append([0] * N)

    buildings = list(map(int, input().split()))

    for i in range(N):
        for j in range(buildings[i]):
            matrix[j][i] = 1

    for i in range(255, -1, -1):
        for j in range(2, N - 2):
            a = max(
                matrix[i][j - 1], matrix[i][j - 2], matrix[i][j + 1], matrix[i][j + 2]
            )

            if matrix[i][j] == 1 and a == 0:
                count += 1

    result.append(count)


for _ in range(10):
    solution()

for i in range(10):
    print(f"#{i + 1} {result[i]}")

