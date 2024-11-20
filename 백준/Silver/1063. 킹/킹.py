king, rock, N = input().split()
king_col, king_row = list(king)
king_col = ord(king_col) - 65
king_row = int(king_row) - 1
rock_col, rock_row = list(rock)
rock_col = ord(rock_col) - 65
rock_row = int(rock_row) - 1


for _ in range(int(N)):
    command = input()
    dr = 0
    dc = 0
    if command == 'R':
        dc = 1
    elif command == 'L':
        dc = -1
    elif command == 'B':
        dr = -1
    elif command == 'T':
        dr = 1
    elif command == 'RT':
        dc = 1
        dr = 1
    elif command == 'LT':
        dc = -1
        dr = 1
    elif command == 'RB':
        dc = 1
        dr = -1
    elif command == 'LB':
        dc = -1
        dr = -1

    next_king_row = king_row + dr
    next_king_col = king_col + dc
    if -1 < next_king_row < 8 and -1 < next_king_col < 8:
        king_row = next_king_row
        king_col = next_king_col
        if king_row == rock_row and king_col == rock_col:
            next_rock_row = rock_row + dr
            next_rock_col = rock_col + dc
            if -1 < next_rock_row < 8 and -1 < next_rock_col < 8:
                rock_row = next_rock_row
                rock_col = next_rock_col
            else:
                king_row -= dr
                king_col -= dc


print(f'{chr(king_col + 65)}{king_row+1}')
print(f'{chr(rock_col + 65)}{rock_row+1}')