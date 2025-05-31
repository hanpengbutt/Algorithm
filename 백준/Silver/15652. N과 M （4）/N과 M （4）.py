import sys
input = sys.stdin.readline
N,M = map(int,input().split())

def dfs(num,cnt,tmp):
    cp = tmp[:]
    cnt +=1
    cp.append(num)
    if cnt == M:
        for i in cp:
            print(i,end=' ')
        print()
        return
    for i in range(num,N+1):
        dfs(i,cnt,cp)


for i in range(1,N+1):
    dfs(i,0,[])
