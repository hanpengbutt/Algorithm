def solution(t):
    nums = list(map(int, input().split()))
    result = []

    for i in range(5):
        for j in range(i + 1, 6):
            for k in range(j + 1, 7):
                result.append(nums[i] + nums[j] + nums[k])

    result = list(set(result))
    result.sort(reverse=True)

    print(f'#{t + 1} {result[4]}')


for t in range(int(input())):
    solution(t)
