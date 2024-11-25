n = int(input())
divisor1 = []
divisor2 = []


def solution():
    for a, c in divisor1:
        for b, d in divisor2:
            if a * d - c * b == n + 1:
                return f'{a} {-b} {c} {d}'
            if -a * d + c * b == n + 1:
                return f'{a} {b} {c} {-d}'

    return -1


for i in range(1, int((n+2)**(1/2)) + 1):
    if n % i == 0:
        divisor1.append([i, int(n / i)])
    if (n + 2) % i == 0:
        divisor2.append([i, int((n + 2) / i)])

print(solution())