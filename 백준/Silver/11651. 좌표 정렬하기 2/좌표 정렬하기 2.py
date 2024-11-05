points = [list(map(int, input().split())) for _ in range(int(input()))]
points.sort(key=lambda x: [x[1], x[0]])

for x, y in points:
    print(x, y)
