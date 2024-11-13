def solution(i):
    N = int(input())
    result = list(map(int, input().split()))[:10]
    K = int(input())
    commands = input().split()

    for _ in range(K):
        x = int(commands[1])
        y = int(commands[2])
        s = commands[3 : 3 + y]
        commands = commands[3 + y:]

        if x < 10:
            result = (result[:x] + s + result[x:])[:10]


    print(f"#{i + 1} {' '.join(map(str, result))}")


for i in range(10):
    solution(i)

