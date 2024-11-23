N, M = map(int, input().split())
X, Y = map(int, input().split())
x = 0
y = 0

for _ in range(M):
    a, b = map(int, input().split())
    if a != 0:
        x += 1
    else:
        y += 1

result = 1

if M == 0:
    for i in range(9, 9 - N, -1):
        result *= i
else:
    for i in range(y):
        result *= (N - x - i)
    for i in range(N - x - y):
        result *= (9 - x - y - i)
result = result * X + (int(result / 3) - (1 if result % 3 == 0 else 0)) * Y
print(result)
