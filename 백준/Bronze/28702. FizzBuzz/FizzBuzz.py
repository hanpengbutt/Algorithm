result = 0

for i in range(3):
    N = input()
    if not N in ["Fizz", "Buzz", "FizzBuzz"]:
        result = int(N) + 3 - i

print(
    "FizzBuzz"
    if result % 3 == 0 and result % 5 == 0
    else (
        "Fizz"
        if result % 3 == 0 and result % 5 != 0
        else ("Buzz" if result % 3 != 0 and result % 5 == 0 else result)
    )
)
