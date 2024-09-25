import sys
from collections import deque

input = sys.stdin.readline
N, K = map(int, input().split())
visited = [0] * 100001
path = [0] * 100001
vector = [lambda X: X - 1, lambda X: X + 1, lambda X: 2 * X]


def solution():
    result = []
    q = deque()
    q.append(N)
    visited[N] = 1

    while not visited[K]:
        now = q.popleft()

        for f in vector:
            next = f(now)
            if -1 < next < 100001 and not visited[next]:
                q.append(next)
                visited[next] = visited[now] + 1
                path[next] = now

    print(visited[K] - 1)

    now = K
    while now != N:
        result.append(now)
        now = path[now]
    result.reverse()

    print(N, *result)


solution()
