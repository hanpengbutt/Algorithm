import sys
from collections import deque

input = sys.stdin.readline
N, K = map(int, input().split())
visited = [0] * 100001
vector = [-1, +1]


def bfs(start):
    q = deque()
    q.append(start)
    visited[start] = 1

    while not visited[K]:
        now = q.popleft()
        if now:
            i = 2
            while i * now < 100001:
                next = i * now
                if not visited[next]:
                    q.append(next)
                    visited[next] = visited[now]
                i *= 2
        for dx in vector:
            next = now + dx
            if -1 < next < 100001 and not visited[next]:
                q.append(next)
                visited[next] = visited[now] + 1

    return visited[K] - 1


def solution():
    print(bfs(N))


solution()
