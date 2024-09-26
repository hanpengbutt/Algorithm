from collections import deque

N = int(input())
visited = [0] * (N + 1)
vector = [
    lambda X: int(X / 3) if X % 3 == 0 else -1,
    lambda X: int(X / 2) if X % 2 == 0 else -1,
    lambda X: X - 1,
]


def solution():
    q = deque()
    q.append(N)
    visited[N] = 1

    while not visited[1]:
        now = q.popleft()
        for f in vector:
            next = f(now)
            if -1 < next < N + 1 and not visited[next]:
                q.append(next)
                visited[next] = visited[now] + 1

    print(visited[1] - 1)


solution()