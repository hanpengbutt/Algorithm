dictionary = {}

for i in range(1, 51):
    dictionary[i] = []


N = int(input())
for _ in range(N):
    s = input()
    if s not in dictionary[len(s)]:
        dictionary[len(s)].append(s)

for _, value in dictionary.items():
    for v in sorted(value):
        print(v)
