N = int(input())
houses = list(map(int, input().split()))
times = list(map(int, input().split()))

now_house = houses[N - 1]
now_time = max(times[N - 1], now_house)

for i in range(N - 2, -1, -1):
    house = houses[i]
    time = times[i]

    now_time = max(time, now_time + now_house - house)
    now_house = house

print(now_house + now_time)
