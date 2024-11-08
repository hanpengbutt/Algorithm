from collections import deque

q = deque()

for _ in range(int(input())):
    i = input().split()
    c = i[0]
    n = i[1] if len(i) == 2 else 0

    if c == "push":
        q.append(n)
    elif c == "pop":
        print(q.popleft() if q else -1)
    elif c == "size":
        print(len(q))
    elif c == "empty":
        print(0 if q else 1)
    elif c == "front":
        print(q[0] if q else -1)
    else:
        print(q[-1] if q else -1)