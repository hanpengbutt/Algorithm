N, K = map(int, input().split())
l = [i + 1 for i in range(N)]
result = []

for _ in range(N):
    idx = (K - 1) % len(l)
    result.append(l[idx])
    l = l[idx + 1 :] + l[:idx]

print("<", end="")
print(", ".join(map(str, result)), end="")
print(">")
