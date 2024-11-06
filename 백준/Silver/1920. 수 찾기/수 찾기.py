input()
dict = {}
for i in input().split():
    dict[i] = 1
input()
for i in input().split():
    if i in dict:
        print(1)
    else:
        print(0)
