import heapq

N = int(input())
rooms = []
for _ in range(N):
    rooms.append(list(map(int, input().split())))


def solution(N, rooms):
    rooms.sort(key=lambda room: room[1])
    rooms.sort(key=lambda room: room[0])

    pq = []

    for room in rooms:
        [start, end] = room

        if len(pq):
            min = pq[0]
            if min <= start:
                heapq.heappop(pq)

        heapq.heappush(pq, end)

    return len(pq)


print(solution(N, rooms))
