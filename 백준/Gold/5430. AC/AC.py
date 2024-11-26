from collections import deque
import sys

input = sys.stdin.readline

T = int(input().rstrip())


def solution():
    operators = list(''.join(input().rstrip()))
    n = input().rstrip()
    nums = input().rstrip()[1:-1].split(',')
    if nums == ['']:
        x = deque()
    else:
        x = deque(map(int, nums))
    is_flip = False

    for op in operators:
        if op == 'R':   # 'R' 연산인 경우
            is_flip = not is_flip
        else:   # 'D' 연산인 경우
            if x:   # 배열이 비어 있지 않은 경우
                if is_flip: # 배열이 뒤집힌 경우
                    x.pop()
                else:
                    x.popleft()
            else:   # 배열이 비어 있는 경우
                return 'error'

    return f"[{','.join(map(str, reversed(x)))}]" if is_flip else f"[{','.join(map(str, x))}]"


for _ in range(T):
    print(solution())