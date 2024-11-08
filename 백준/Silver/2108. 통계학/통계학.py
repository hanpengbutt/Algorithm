import math

num_list = []
num_dict = {}


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

avg = sum(num_list) / N
print(round(avg + 1e-10 if avg >= 0 else avg -(1e-10)))
print(num_list[int(N / 2)])
print(max_list[0][0] if len(max_list) == 1 else max_list[1][0])
print(num_list[-1] - num_list[0])
