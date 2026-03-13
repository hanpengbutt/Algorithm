import sys
from collections import deque

input = sys.stdin.readline
matrix = []
visited = []
N = 0
M = 0
vector = [(-1, 0), (1, 0), (0, -1), (0, 1)]


def bfs(row, col):
    q = deque()
    q.append([row, col])
    visited[row][col] = 1
    while q:
        now_row, now_col = q.popleft()
        for dr, dc in vector:
            next_row = now_row + dr
            next_col = now_col + dc
            if -1 < next_row < N and -1 < next_col < M and matrix[next_row][next_col] and not visited[next_row][
                next_col]:
                q.append([next_row, next_col])
                visited[next_row][next_col] = 1


def solution():
    global matrix, visited, N, M
    M, N, K = map(int, input().split())
    matrix = [[0] * M for _ in range(N)]
    for _ in range(K):
        X, Y = map(int, input().split())
        matrix[Y][X] = 1
    visited = [[0] * M for _ in range(N)]
    count = 0

    for row in range(N):
        for col in range(M):
            if matrix[row][col] and not visited[row][col]:
                bfs(row, col)
                count += 1

    return count


for _ in range(int(input())):
    print(solution())
