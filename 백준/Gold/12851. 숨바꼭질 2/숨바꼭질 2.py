import sys
from collections import deque

input = sys.stdin.readline
N, K = map(int, input().split())
visited = [0] * 100001  # 방문 여부 및 경로 수
count = [0] * 100001    # 해당 위치로 오는 방법 수
vector = [lambda X: X - 1, lambda X: X + 1, lambda X: 2 * X]


def bfs(start):
    q = deque()
    q.append(start)
    visited[start] = 1
    count[start] = 1

    while q:
        now = q.popleft()
        for f in vector:
            next = f(now)
            if -1 < next < 100001:
                if not visited[
                    next
                ]:  # 방문한 적 없는 경우
                    q.append(next)
                    visited[next] = visited[now] + 1
                    count[next] = count[now]
                elif (
                    visited[next] == visited[now] + 1
                ):  # 방문한 적 있지만 최소 경로인 경우
                    count[next] += count[now]

    print(visited[K] - 1)
    print(count[K])


def solution():
    bfs(N)


solution()
