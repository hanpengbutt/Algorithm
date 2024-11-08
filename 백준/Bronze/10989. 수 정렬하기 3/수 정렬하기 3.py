l = [0] * 2000001

for _ in range(int(input())):
    l[int(input()) + 1000000] += 1


for i, v in filter(lambda x: x[1] >= 1, enumerate(l)):
    for _ in range(v):
        print(i -1000000)
