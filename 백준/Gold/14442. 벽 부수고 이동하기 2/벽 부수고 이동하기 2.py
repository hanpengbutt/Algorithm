import sys
from collections import deque


def solution():
    input = sys.stdin.readline
    N, M, K = map(int, input().split())
    matrix = [list(map(int, list(input().strip()))) for _ in range(N)]

    if N == 1 and M == 1:
        print(1) # 영규야 사랑해 미안해
        return

    vector = [(1, 0), (0, 1), (-1, 0), (0, -1)]

    visited = [[[0] * (K + 1) for _ in range(M)] for _ in range(N)]
    visited[0][0][0] = 1

    q = deque()
    q.append((0, 0, 0))

    while q:
        r, c, broken = q.popleft()
        for dr, dc in vector:
            nr, nc = r + dr, c + dc
            if 0 <= nr < N and 0 <= nc < M:
                nb = broken + matrix[nr][nc]
                if nb <= K and not visited[nr][nc][nb]:
                    visited[nr][nc][nb] = visited[r][c][broken] + 1
                    if nr == N - 1 and nc == M - 1:
                        print(visited[nr][nc][nb])
                        return
                    q.append((nr, nc, nb))

    print(-1)


solution()
