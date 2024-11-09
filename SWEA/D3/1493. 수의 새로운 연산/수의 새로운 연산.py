matrix = [[0] * 300 for _ in range(300)]

matrix[0][0] = 1
for i in range(1, 300):
    matrix[0][i] = matrix[0][i - 1] + i

for row in range(1, 300):
    for col in range(300):
        matrix[row][col] = (
            matrix[row - 1][col + 1] + 1
            if col == 0
            else matrix[row][col - 1] + col + row
        )


def solution(i):
    p, q = map(int, input().split())

    x = 0
    y = 0
    z = 0
    w = 0

    for row in range(300):
        for col in range(300):
            if matrix[row][col] == p:
                x = row + 1
                y = col + 1
            if matrix[row][col] == q:
                z = row + 1
                w = col + 1

    print(f'#{i + 1} {matrix[x + z - 1][y + w - 1]}')


for i in range(int(input())):
    solution(i)
