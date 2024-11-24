import sys

input = sys.stdin.readline

N, M, V = map(int, input().split())
C = list(map(int, input().split()))


def solution():
    idx = int(input())
    if N == V:
        idx = idx if idx < N else N-1
    else:
        while idx >= N:
            idx -= N - V + 1
    print(C[idx])


for _ in range(M):
    solution()