let fs = require('fs');
let [N, base, ...comps] = fs
  .readFileSync(0, 'utf8')
  .trim()
  .split('\n');

function solution(N, base, comps) {
  let result = 0;
  const map = new Map();

  [...base].forEach((alphabet) => {
    const count = map.get(alphabet);
    if (!count) {
      map.set(alphabet, 1);
    } else {
      map.set(alphabet, count + 1);
    }
  });

  function compare(map1, map2) {
    let diff = 0;
    for (m of map1) {
      const [alphabet, count] = m;
      diff += Math.abs(count - (map2.get(alphabet) || 0));
      if (diff > 1) break;
    }
    if (diff <= 1) return true;
  }

  comps.forEach((comp) => {
    const comp_map = new Map();
    [...comp].forEach((alphabet) => {
      const count = comp_map.get(alphabet);
      if (!count) {
        comp_map.set(alphabet, 1);
      } else {
        comp_map.set(alphabet, count + 1);
      }
    });

    if (base.length === comp.length) {
      // 비교하는 단어와 기준 단어의 길이가 같다면
      const entries = [...comp_map.entries()];

      for (let i = 0; i < entries.length; i++) {
        const new_comp_map = new Map();
        for (let j = 0; j < entries.length; j++) {
          new_comp_map.set(
            entries[j][0],
            j !== i ? entries[j][1] : entries[j][1] - 1
          );
        }
        if (compare(map, new_comp_map, comp)) {
          result += 1;
          break;
        }
      }
    } else if (base.length === comp.length + 1) {
      // 비교하는 단어가 기준 단어보다 한 글자 짧다면
      if (compare(map, comp_map, comp)) result += 1;
    } else if (base.length === comp.length - 1) {
      // 비교하는 단어가 기준 단어보다 한 글자 길다면
      if (compare(comp_map, map, comp)) result += 1;
    }
  });

  return result;
}

console.log(solution(N, base, comps));