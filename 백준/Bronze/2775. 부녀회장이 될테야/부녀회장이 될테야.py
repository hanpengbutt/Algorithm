T = int(input())


def solution():
    k = int(input())
    n = int(input())

    matrix = [
        list(range(1, 15)[:n]) if i == 0 else ([1] + ([0] * (n - 1)))
        for i in range(k + 1)
    ]

    for i in range(k + 1):
        for j in range(n):
            if i != 0 and j != 0:
                matrix[i][j] = matrix[i - 1][j] + matrix[i][j - 1]

    print(matrix[k][n - 1])


for _ in range(T):
    solution()
