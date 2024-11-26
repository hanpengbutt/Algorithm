from collections import deque

N = int(input())
S = ['O' if i % 2 == 0 else 'I' for i in range(N * 2 + 1)]
M = int(input())
S = list(input())
q = deque()

result = 0

for n in S:
    if n == 'O':
        if q and q[-1] == 'I':  # 마지막에 I가 있는 경우 큐에 삽입
            q.append(n)
        else:  # 마지막에 I가 없는 경우 큐 초기화
            q = deque()
    else:
        if q and q[-1] == 'I':  # 마지막에 I가 있는 경우 큐 초기화
            q = deque()
        q.append(n)

    if len(q) == N * 2 + 1:  # 찾고자 하는 문자열이 큐에 찬 경우
        q.popleft()
        q.popleft()
        result += 1

print(result)
