def solution(N):
    separator = input()
    print(f"#{N} {len(input().split(separator)) - 1}")


for i in range(10):
    N = int(input())
    solution(N)
