N, M = map(int, input().split())
H = list(map(int, input().split()))

result = []
prime_num = [i for i in range(2, 9001)]

for i in range(len(prime_num)):
    pnum = prime_num[i]
    if pnum != 0:
        for j in range(i + 1, len(prime_num)):
            if prime_num[j] % pnum == 0:
                prime_num[j] = 0


def comb(arr, n, selected=[]):
    if n == 0:
        result.append(sum(selected))
    for i in range(len(arr)):
        new_selected = selected + [arr[i]]
        comb(arr[i + 1:], n - 1, new_selected)


comb(H, M)
result = list(set(result))
result = sorted(list(filter(lambda x: x in prime_num, result)))
if result:
    for r in result:
        print(r, end=' ')
else:
    print(-1)