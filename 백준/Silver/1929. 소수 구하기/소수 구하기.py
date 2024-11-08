l = [0] * 999999
result = []
M, N = map(int, input().split())

for i in range(999999):
    if l[i] == 0:
        v = i + 2
        result.append(v)
        for j in range(1, int(1000000 / v) + 1):
            mul = v * j
            l[mul - 2] = 1


result = list(filter(lambda x: M <= x <= N, result))

for r in result:
    print(r)
