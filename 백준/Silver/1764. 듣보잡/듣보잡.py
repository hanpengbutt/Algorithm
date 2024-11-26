N, M = map(int, input().split())

dict1 = {}
dict2 = {}

for _ in range(N):
    dict1[input()] = 1
for _ in range(M):
    name = input()
    if name in dict1:
        dict2[name] = 1

print(len(dict2))
for name in sorted(dict2.keys()):
    print(name)