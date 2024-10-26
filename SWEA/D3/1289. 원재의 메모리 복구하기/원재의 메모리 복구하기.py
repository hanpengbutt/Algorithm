T = int(input())


def solution():
    N = input()
    bit = '0'
    count = 0

    for i in N:
        if i != bit:
            bit = i
            count += 1

    return count


for i in range(T):
    print(f"#{i + 1} {solution()}")
