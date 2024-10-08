T = int(input())
result = []


def solution():
    S = input()
    E = input()
    r = "Yes" if S == E else "No"

    while len(E) != len(S):
        if E[-1] == "X":
            E = E[:-1]
        else:
            E = E[:-1][::-1]
        if S == E:
            r = "Yes"
            break

    result.append(r)


for i in range(T):
    solution()

for i in range(T):
    print(f'#{i +1} {result[i]}')
