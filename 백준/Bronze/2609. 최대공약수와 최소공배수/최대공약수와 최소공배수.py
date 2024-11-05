a, b = sorted(map(int, input().split()))

gcd = 1
lcm = a * b

for i in range(1, a + 1):
    if a % i == 0 and b % i == 0:
        gcd = i

    if b * i % a == 0 and b * i < lcm:
        lcm = b * i

print(gcd)
print(lcm)
