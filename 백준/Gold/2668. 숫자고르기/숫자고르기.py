import sys

input = sys.stdin.readline
N = int(input())
graph = [int(input()) for _ in range(N)]
visited = [0] * N
result = []


def dfs(start, now):
    visited[now] = 1
    next = graph[now]

    if not visited[next - 1]:
        dfs(start, next - 1)
    elif start + 1 == next:
        result.append(start + 1)


def solution():
    global visited
    for i in range(N):
        dfs(i, i)
        visited = [0] * N

    result.sort()
    print(len(result))
    for n in result:
        print(n)


solution()