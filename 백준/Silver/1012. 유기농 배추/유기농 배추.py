import collections

T = int(input())


def solution(M, N, K, cabbages):
    result = 0
    matrix = [[0 for _ in range(M)] for _ in range(N)]
    visited = [[0 for _ in range(M)] for _ in range(N)]
    vector = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    for cabbage in cabbages:
        [col, row] = cabbage
        matrix[row][col] = 1

    def bfs(startRow, startCol):
        queue = collections.deque([[startRow, startCol]])
        visited[startRow][startCol] = 1

        while len(queue):
            [row, col] = queue.popleft()
            for [dr, dc] in vector:
                nextRow = row + dr
                nextCol = col + dc
                if (
                    -1 < nextRow < N
                    and -1 < nextCol < M
                    and matrix[nextRow][nextCol]
                    and not visited[nextRow][nextCol]
                ):
                    queue.append([nextRow, nextCol])
                    visited[nextRow][nextCol] = 1

    for row in range(N):
        for col in range(M):
            if matrix[row][col] and not visited[row][col]:
                bfs(row, col)
                result += 1

    return result


for _ in range(T):
    [M, N, K] = map(int, input().split())
    cabbages = []
    for _ in range(K):
        cabbages.append(map(int, input().split()))
    print(solution(M, N, K, cabbages))
