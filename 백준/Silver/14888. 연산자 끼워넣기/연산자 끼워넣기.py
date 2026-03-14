N = int(input())
nums = list(map(int, input().split()))
opperators = list(map(int, input().split()))


def solution(N, nums, opperators):
    min = 1e9 + 1
    max = -1e9 - 1

    def calc(perm):
        nonlocal min
        nonlocal max
        value = 0

        for idx, num in enumerate(nums):
            if idx == 0:
                value += num
            else:
                if perm[idx - 1] == 0:

                    value += num
                elif perm[idx - 1] == 1:
                    value -= num
                elif perm[idx - 1] == 2:
                    value *= num
                else:
                    value = int(value / num)

        if value < min:
            min = value
        if value > max:
            max = value

    def backtracking(perm, opperators):
        if len(perm) == N - 1:
            calc(perm)
            return

        for idx, opperator in enumerate(opperators):
            if opperator > 0:
                new_opperators = opperators[:]
                new_opperators[idx] -= 1
                new_perm = perm[:]
                new_perm.append(idx)
                backtracking(new_perm, new_opperators)

    backtracking([], opperators)

    return f"{max}\n{min}"


print(solution(N, nums, opperators))
