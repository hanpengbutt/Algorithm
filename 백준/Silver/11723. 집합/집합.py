import sys

input = sys.stdin.readline

M = int(input())

S = {}

for _ in range(M):
    op = input().rstrip()

    if op == 'all':
        S = {x + 1: 1 for x in range(20)}
    elif op == 'empty':
        S = {}
    else:
        op, x = op.split()
        x = int(x)
        if op == 'add':
            S[x] = 1
        elif op == 'remove':
            if x in S:
                del S[x]
        elif op == 'check':
            if x in S:
                print(1)
            else:
                print(0)
        elif op == 'toggle':
            if x in S:
                del S[x]
            else:
                S[x] = 1
