import sys

input = sys.stdin.readline
R, C = map(int, input().split())
matrix = [list(input().rstrip()) for _ in range(R)]
vector = [(0, 1), (1, 0), (0, -1), (-1, 0)]
alphabets = set()
count = 0


def dfs(nowRow, nowCol):
    global count
    alphabets.add(matrix[nowRow][nowCol])

    if len(alphabets) > count:
        count = len(alphabets)

    for dr, dc in vector:
        nextRow = nowRow + dr
        nextCol = nowCol + dc

        if (
            -1 < nextRow < R
            and -1 < nextCol < C
            and not matrix[nextRow][nextCol] in alphabets
        ):
            dfs(nextRow, nextCol)
            alphabets.remove(matrix[nextRow][nextCol])


dfs(0, 0)
print(count)

