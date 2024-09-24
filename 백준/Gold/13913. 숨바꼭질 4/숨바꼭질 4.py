import sys
from collections import deque

N, K = map(int, input().split())
vector = [lambda X: X - 1, lambda X: X + 1, lambda X: 2 * X]
reverseVector = [lambda X: X + 1, lambda X: X - 1, lambda X: X / 2]
visited = [0] * 100001
paths = []


def bfs(start):
    q = deque()
    q.append(start)
    visited[start] = 1

    while not visited[K]:
        path = []
        while q:
            now = q.popleft()
            for f in vector:
                next = f(now)
                if -1 < next < 100001 and not visited[next]:
                    visited[next] = visited[now] + 1
                    path.append(next)
        paths.append(path)
        for p in path:
            q.append(p)


    print(visited[K] - 1)
    return paths


def solution():
    if N == K:
        print(0)
        print(K)
        return

    result = []
    paths = bfs(N)
    paths.reverse()
    now = K

    for path in paths[1:]:
        for f in reverseVector:
            next = int(f(now))
            if next in path:
                result.append(next)
                now = next

    result.reverse()
    for p in [N] + result + [K]:
        print(p, end=" ")


solution()
