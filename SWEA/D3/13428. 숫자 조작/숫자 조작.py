def solution(i):
    N = list(map(int, input()))
    max_list = N[:]
    min_list = N[:]

    for j in range(len(N) - 1):
        max_val = max_list[j]
        max_idx = j

        # 현재 위치 이후에서 현재 값보다 더 큰 값을 찾음
        for idx, val in enumerate(max_list[j + 1 :]):
            if val > max_val or (max_idx != j and val == max_val):
                max_val = val
                max_idx = idx + j + 1

        # 현재 위치 이후에서 현재 값보다 더 큰 값이 발견된 경우 swap
        if max_idx != j:
            max_list[max_idx] = max_list[j]
            max_list[j] = max_val
            break

    for j in range(len(N) - 1):
        min_val = min_list[j]
        min_idx = j

        # 현재 위치 이후에서 현재 값보다 더 작은 값을 찾음
        for idx, val in enumerate(min_list[j + 1 :]):
            if (val < min_val or (min_idx != j and val == min_val)) and (
                val != 0 if j == 0 else True
            ):
                min_val = val
                min_idx = idx + j + 1

        # 현재 위치 이후에서 현재 값보다 더 작은 값이 발견된 경우 swap
        if min_idx != j:
            min_list[min_idx] = min_list[j]
            min_list[j] = min_val
            break

    print(f"#{i + 1} {''.join(map(str, min_list))} {''.join(map(str, max_list))}")


for i in range(int(input())):
    solution(i)
