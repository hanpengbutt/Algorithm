let fs = require('fs');
let [_, seats] = fs.readFileSync(0, 'utf8').trim().split('\n');

seats = seats
  .split('')
  .map((seat) => [1, seat])
  .flat();
seats.push(1);

function solution(seats) {
  let falg = 0;
  seats.forEach((seat, id) => {
    if (seat === 'L') falg = !falg;
    if (seat === 1 && falg) seats[id] = 0;
  });

  let result = 0
  seats.forEach((seat, id) => {
    if(seat === 'S' || seat === 'L') {
        if(seats[id - 1] === 1) {
            result += 1
            seats[id - 1] = 0
        } else if(seats[id + 1] === 1) {
            result += 1
            seats[id + 1] = 0
        }
    }
  })

  return result
}

console.log(solution(seats));
