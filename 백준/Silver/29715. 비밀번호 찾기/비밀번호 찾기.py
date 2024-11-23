N, M = map(int, input().split())
X, Y = map(int, input().split())
count = 0

for _ in range(M):
    a, b = map(int, input().split())
    if a != 0:
        count += 1

result = 1
for i in range(9 - M, 9 - N, -1):
    result *= i


if M != 0:
    for i in range(N - M, 0, -1):
        result /= i

    for i in range(N - count, 0, -1):
        result *= i

result = int(result * X + (int(result / 3) - (1 if result % 3 == 0 else 0)) * Y)
print(result)

