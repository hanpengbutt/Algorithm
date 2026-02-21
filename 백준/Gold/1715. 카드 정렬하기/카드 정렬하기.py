import heapq

N = int(input())
cards = []
for _ in range(N):
    heapq.heappush(cards, int(input()))


def solution(N, cards):
    result = 0
    for _ in range(N - 1):
        a = heapq.heappop(cards)
        b = heapq.heappop(cards)
        result += a + b
        heapq.heappush(cards, a + b)

    return result


print(solution(N, cards))
