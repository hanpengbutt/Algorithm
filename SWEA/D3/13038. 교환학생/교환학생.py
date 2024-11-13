def solution(i):
    count = int(input())
    weeks = map(int, input().split())
    classes = list(
        map(lambda x: x[0], filter(lambda x: x[1] == 1, enumerate(weeks)))
    )
    result = []

    for c in classes:
        now = c
        cnt = count - 1
        day = 1

        while cnt > 0:
            day += 1
            now = (now + 1) % 7
            if now in classes:
                cnt -= 1

        result.append(day)
        
    print(f"#{i + 1} {min(result)}")


for i in range(int(input())):
    solution(i)



