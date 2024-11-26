from collections import deque

N = int(input())
matrix = [list(input()) for _ in range(N)]
visited1 = [[0] * N for _ in range(N)]
visited2 = [[0] * N for _ in range(N)]
vector = [(-1, 0), (1, 0), (0, -1), (0, 1)]
result1 = 0
result2 = 0


def bfs(row, col, idx):
    q = deque()
    q.append((row, col))
    if idx == 1:
        visited1[row][col] = 1
    else:
        visited2[row][col] = 1
    color = matrix[row][col]

    while q:
        now_row, now_col = q.popleft()
        for dr, dc in vector:
            next_row = now_row + dr
            next_col = now_col + dc
            if (-1 < next_row < N and -1 < next_col < N
                    and ((matrix[next_row][next_col] == color) if idx == 1 else (
                            (matrix[next_row][next_col] == color) or (
                            color == 'R' and matrix[next_row][next_col] == 'G') or (
                                    color == 'G' and matrix[next_row][next_col] == 'R')))
                    and ((not visited1[next_row][next_col]) if idx == 1 else (not visited2[next_row][next_col]))):
                q.append((next_row, next_col))
                if idx == 1:
                    visited1[next_row][next_col] = 1
                else:
                    visited2[next_row][next_col] = 1


for row in range(N):
    for col in range(N):
        if not visited1[row][col]:
            bfs(row, col, 1)
            result1 += 1
        if not visited2[row][col]:
            bfs(row, col, 2)
            result2 += 1

print(result1, result2)