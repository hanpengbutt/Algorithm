def solution(i):
    H, W = map(int, input().split())
    matrix = [list(input()) for _ in range(H)]
    N = input()
    coord = [0, 0]
    direction = 0
    vector = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    for row in range(H):
        for col in range(W):
            v = matrix[row][col]
            if v == "^":
                coord = [row, col]
                direction = 0
            elif v == "v":
                coord = [row, col]
                direction = 1
            elif v == "<":
                coord = [row, col]
                direction = 2
            elif v == ">":
                coord = [row, col]
                direction = 3

    for command in list(input()):
        if command == "U":
            matrix[coord[0]][coord[1]] = "."
            direction = 0
            if coord[0] > 0 and matrix[coord[0] - 1][coord[1]] == ".":
                coord = [coord[0] - 1, coord[1]]
            matrix[coord[0]][coord[1]] = "^"
        elif command == "D":
            matrix[coord[0]][coord[1]] = "."
            direction = 1
            if coord[0] < H - 1 and matrix[coord[0] + 1][coord[1]] == ".":
                coord = [coord[0] + 1, coord[1]]
            matrix[coord[0]][coord[1]] = "v"
        elif command == "L":
            matrix[coord[0]][coord[1]] = "."
            direction = 2
            if coord[1] > 0 and matrix[coord[0]][coord[1] - 1] == ".":
                coord = [coord[0], coord[1] - 1]
            matrix[coord[0]][coord[1]] = "<"
        elif command == "R":
            matrix[coord[0]][coord[1]] = "."
            direction = 3
            if coord[1] < W - 1 and matrix[coord[0]][coord[1] + 1] == ".":
                coord = [coord[0], coord[1] + 1]
            matrix[coord[0]][coord[1]] = ">"
        else:
            shoot_coord = [coord[0], coord[1]]
            dr, dc = vector[direction]
            while -1 < shoot_coord[0] + dr < H and -1 < shoot_coord[1] + dc < W:
                shoot_coord = [shoot_coord[0] + dr, shoot_coord[1] + dc]
                if matrix[shoot_coord[0]][shoot_coord[1]] == "*":
                    matrix[shoot_coord[0]][shoot_coord[1]] = "."
                    break
                elif matrix[shoot_coord[0]][shoot_coord[1]] == "#":
                    break

    print(f"#{i + 1}", end=" ")
    for line in list(map("".join, matrix)):
        print(line)


for i in range(int(input())):
    solution(i)
