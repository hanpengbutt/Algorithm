let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n');

let [N, attack_hero_origin] = input[0].split(' ').map(BigInt);
const rooms = input.slice(1).map((room) => room.split(' ').map(BigInt));

function solution(N, attack_hero_origin, rooms) {
  function isPossible(hp_hero_max) {
    let hp_hero = hp_hero_max;
    let attack_hero = attack_hero_origin;

    for (let i = 0; i < N; i++) {
      let [info, a, h] = rooms[i];
      if (info === 1n) {
        // 몬스터가 있는 방인 경우
        let attack_count = h / attack_hero;
        if(h - attack_count * attack_hero > 0) attack_count += 1n
        hp_hero -= (attack_count - 1n) * a;
        if (hp_hero <= 0) return false;
      } else {
        // 포션이 있는 방인 경우
        attack_hero += a;
        hp_hero = hp_hero + h > hp_hero_max ? hp_hero_max : hp_hero + h;
      }
    }

    return true;
  }

  let left = BigInt(1);
  let right = BigInt(10 ** 18);
  let result;

  while (left <= right) {
    let mid = (left + right) / 2n;

    const a = isPossible(mid);

    if (a) {
      right = mid - 1n;
      result = mid;
    } else {
      left = mid + 1n;
    }
  }

  return result.toString();
}

console.log(solution(N, attack_hero_origin, rooms));
