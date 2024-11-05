result = [input().split() for _ in range(int(input()))]
result.sort(key=lambda x: int(x[0]))

for age, name in result:
    print(age, name)