num_list = []
num_dict = {}


def round(num):
    return (
        (int(num) + 1 if int(num) >= 0 else int(num) - 1)
        if abs(num - int(num)) >= 0.5
        else int(num)
    )


N = int(input())

for _ in range(N):
    num = int(input())

    num_list.append(num)
    num_dict[num] = (num_dict[num] + 1) if num in num_dict else 1


num_list.sort()
max_count = max(num_dict.values())
max_list = sorted(
    filter(lambda x: x[1] == max_count, num_dict.items()), key=lambda x: x[0]
)

print(round(sum(num_list) / N))
print(num_list[int(N / 2)])
print(max_list[0][0] if len(max_list) == 1 else max_list[1][0])
print(num_list[-1] - num_list[0])
