import sys

input = sys.stdin.readline

N, M = map(int, input().split())
r, c, direction = map(int, input().split())

room = []

for _ in range(N):
    room.append(list(map(int, input().split())))


def start(room, r, c, direction):
    if room[r][c] == 0:  # 현재 칸이 아직 청소되지 않은 경우
        room[r][c] = 2

    if (
        (c > 0 and room[r][c - 1] == 0)
        or (c < M - 1 and room[r][c + 1] == 0)
        or (r > 0 and room[r - 1][c] == 0)
        or (r < N - 1 and room[r + 1][c] == 0)
    ):  # 현재 칸의 주변 4칸 중 청소되지 않은 빈 칸이 있는 경우
        direction = (direction - 1 + 4) % 4  # 반시계 방향으로 회전
        if direction == 0 and r > 0 and room[r - 1][c] == 0:
            r -= 1
        elif direction == 1 and c < M - 1 and room[r][c + 1] == 0:
            c += 1
        elif direction == 2 and r < N - 1 and room[r + 1][c] == 0:
            r += 1
        elif direction == 3 and c > 0 and room[r][c - 1] == 0:
            c -= 1
        start(room, r, c, direction)
    else:  # 현재 칸의 주변 4칸 중 청소되지 않은 빈 칸이 없는 경우
        if direction == 0 and r < N - 1 and room[r + 1][c] != 1:
            r += 1
        elif direction == 1 and c > 0 and room[r][c - 1] != 1:
            c -= 1
        elif direction == 2 and r > 0 and room[r - 1][c] != 1:
            r -= 1
        elif direction == 3 and c < M - 1 and room[r][c + 1] != 1:
            c += 1
        else:
            return
        start(room, r, c, direction)


def solution(room, r, c, direction):
    count = 0
    start(room, r, c, direction)

    for i in range(N):
        for j in range(M):
            if room[i][j] == 2:
                count += 1

    return count


print(solution(room, r, c, direction))
