import sys

input = sys.stdin.readline

N = int(input())

matrix = [list(map(int, list(input().rstrip()))) for _ in range(N)]
visited = [[False] * N for _ in range(N)]

vector = [[0, -1], [1, 0], [0, 1], [-1, 0]]


count = 1


def dfs(row, col):
    global count
    visited[row][col] = True

    for i in range(len(vector)):
        dx, dy = vector[i]
        nextRow = row + dy
        nextCol = col + dx

        if (
            -1 < nextRow
            and nextRow < N
            and -1 < nextCol
            and nextCol < N
            and matrix[nextRow][nextCol] == 1
            and not visited[nextRow][nextCol]
        ):
            count += 1
            dfs(nextRow, nextCol)

    return count


def solution():
    global count
    result = []

    for row in range(N):
        for col in range(N):
            if (
                matrix[row][col] and not visited[row][col]
            ):  # 집이 있는 곳이면서 방문한 적 없는 경우 dfs 시작
                count = 1
                count = dfs(row, col)
                result.append(count)

    result.sort()

    print(len(result))
    for i in range(len(result)):
        print(result[i])


solution()
