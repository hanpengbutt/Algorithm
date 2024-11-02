def solution():
    T = int(input())
    S = 100
    matrix = [list(input()) for _ in range(S)]
    max = 1

    for N in range(2, S + 1):  # 회문 길이
        # 행 회문 찾기
        for row in range(S):
            for col in range(S + 1 - N):
                matrix_row = matrix[row][col : col + N]
                if matrix_row == matrix_row[::-1] and N > max:
                    max = N

        # 열 회문 찾기
        for col in range(S):
            for row in range(S + 1 - N):
                matrix_col = []
                for i in range(N):
                    matrix_col.append(matrix[row + i][col])
                if matrix_col == matrix_col[::-1] and N > max:
                    max = N

    print(f"#{T} {max}")


for i in range(10):
    solution()
