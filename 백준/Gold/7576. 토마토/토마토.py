from collections import deque

N, M = map(int, input().split())
matrix = [list(map(int, input().split())) for _ in range(M)]
visited = [[0] * N for _ in range(M)]
vector = [(-1, 0), (1, 0), (0, -1), (0, 1)]


def solution():
    q = deque()

    if sum(map(sum, matrix)) == M * N:
        return 0

    for row in range(M):
        for col in range(N):
            if matrix[row][col] == 1:
                q.append((row, col))
                visited[row][col] = 1

    while q:
        now_row, now_col = q.popleft()
        for dr, dc in vector:
            next_row = now_row + dr
            next_col = now_col + dc
            if (-1 < next_row < M and -1 < next_col < N  # 인덱스 범위 초과하지 않는 경우
                    and matrix[next_row][next_col] != -1  # 토마토가 없지 않은 경우
                    and not visited[next_row][next_col]):  # 방문한 적 없는 경우
                matrix[next_row][next_col] = 1
                visited[next_row][next_col] = visited[now_row][now_col] + 1
                q.append((next_row, next_col))

    for row in range(M):
        for col in range(N):
            if visited[row][col] == 0 and matrix[row][col] == 0:
                return -1

    return max(map(max, visited)) - 1


print(solution())