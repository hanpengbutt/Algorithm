let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

const N = +input[0];
const P = input[1].split(' ').map(Number);
const S = input[2].split(' ').map(Number);

function solution(N, P, S) {
  let count = 0;

  function getPlayer(cards) {
    for (let i = 0; i < N; i++) {
      const card = cards[i];
      if (i % 3 !== P[card]) return false;
    }

    return true;
  }

  function swapCards(cards) {
    const newCards = new Array(N).fill(0);

    for (let idx = 0; idx < N; idx++) {
      const swapIdx = S[idx];
      newCards[swapIdx] = cards[idx];
    }

    count += 1;

    return newCards;
  }

  function sameFirst(cards) {
    for (let i = 0; i < N; i++) {
      if (cards[i] !== i) return false;
    }

    return true;
  }

  let cards = new Array(N).fill(0).map((_, i) => i);
  if (getPlayer(cards)) return count;

  while (1) {
    cards = swapCards(cards);
    if (sameFirst(cards)) return -1;
    if (getPlayer(cards)) return count;
  }
}

console.log(solution(N, P, S));
