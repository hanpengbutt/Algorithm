T = int(input())


def solution():
    result = 0
    N = int(input())
    matrix = []

    for _ in range(N):
        matrix.append(list(map(int, list(input()))))

    result += sum(matrix[int(N / 2)])

    for i in range(1, int(N / 2) + 1):
        result += sum(matrix[int(N / 2) - i][i : N - i])
        result += sum(matrix[int(N / 2) + i][i : N - i])

    return result


for i in range(T):
    print(f"#{i + 1} {solution()}")
