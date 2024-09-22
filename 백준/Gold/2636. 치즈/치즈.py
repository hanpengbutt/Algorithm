import sys
from collections import deque

row, col = map(int, input().split())
matrix = [list(map(int, input().split())) for _ in range(row)]
visited = [[0] * col for _ in range(row)]
vector = [(-1, 0), (1, 0), (0, -1), (0, 1)]
air = []


def bfs(startRow, startCol):
    q = deque()
    q.append((startRow, startCol))
    air.append((startRow, startCol))
    visited[startRow][startCol] = 1

    while q:
        nowRow, nowCol = q.popleft()
        for dr, dc in vector:
            nextRow = nowRow + dr
            nextCol = nowCol + dc
            if (
                -1 < nextRow < row
                and -1 < nextCol < col
                and not visited[nextRow][nextCol]
                and matrix[nextRow][nextCol] == 0
            ):
                q.append((nextRow, nextCol))
                air.append((nextRow, nextCol))
                visited[nextRow][nextCol] = 1


def solution():
    global matrix
    bfs(0, 0)  # 초기 바깥 공기 찾기
    time = 0
    count = sum(r.count(1) for r in matrix)

    while len(air) != (row * col):  # 치즈가 모두 사라질 때 까지
        dupAir = air[:]
        for nowRow, nowCol in dupAir:
            for dr, dc in vector:
                nextRow = nowRow + dr
                nextCol = nowCol + dc
                if (
                    -1 < nextRow < row
                    and -1 < nextCol < col
                    and matrix[nextRow][nextCol] == 1  # 공기 주변에 치즈가 있는 경우
                ):
                    matrix[nextRow][nextCol] = 0  # 치즈를 녹임
                    bfs(nextRow, nextCol)  # 치즈 속 공기 찾기
        newCount = sum(r.count(1) for r in matrix)
        if newCount:
            count = newCount
        time += 1

    print(time)
    print(count)


solution()