l = [0] * 2000001

for _ in range(int(input())):
    l[int(input()) + 1000000] = 1


for i, _ in filter(lambda x: x[1] == 1, enumerate(l)):
    print(i - 1000000)
