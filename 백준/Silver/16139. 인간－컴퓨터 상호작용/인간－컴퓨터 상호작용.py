S = input()
q = int(input())
dict = {}

for _ in range(q):
    a, l, r = input().split()
    if a not in dict:
        psum = [0] * len(S)
        for i in range(len(S)):
            if i != 0:
                psum[i] = psum[i - 1]
            if S[i] == a:
                psum[i] += 1
        dict[a] = psum

    print(dict[a][int(r)] - (dict[a][int(l) - 1] if int(l) > 0 else 0))
