def round(num):
    round_num = int(num + 1) if num - int(num) >= 0.5 else int(num)
    return round_num


N = int(input())
if N == 0:
    print(0)
elif N == 1:
    print(input())
else:
    opinions = sorted([int(input()) for _ in range(N)])
    K = round(N * 15 / 100)
    print(round(sum(opinions[K:-K]) / (N - 2 * K)))
