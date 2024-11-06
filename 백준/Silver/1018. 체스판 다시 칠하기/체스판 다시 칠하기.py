M, N = map(int, input().split())

matrix = [list(input()) for _ in range(M)]

result = M * N


def find_count(row, col):
    global result

    # 맨 위쪽 위 칸이 흰색인 경우
    count = 0
    for i in range(8):
        count += len(
            list(
                filter(
                    lambda x: x[1]
                    == (
                        "B"
                        if (i % 2 == 0 and x[0] % 2 == 0)
                        or (i % 2 != 0 and x[0] % 2 != 0)
                        else "W"
                    ),
                    enumerate(matrix[row + i][col : col + 8]),
                )
            )
        )

    if count < result:
        result = count

    # 맨 위쪽 위 칸이 검은색인 경우
    count = 0
    for i in range(8):
        count += len(
            list(
                filter(
                    lambda x: x[1]
                    == (
                        "W"
                        if (i % 2 == 0 and x[0] % 2 == 0)
                        or (i % 2 != 0 and x[0] % 2 != 0)
                        else "B"
                    ),
                    enumerate(matrix[row + i][col : col + 8]),
                )
            )
        )

    if count < result:
        result = count


for row in range(M - 7):
    for col in range(N - 7):
        find_count(row, col)  # 시작 row, col


print(result)
