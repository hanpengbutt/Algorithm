let fs = require('fs');
let input = fs.readFileSync(0, 'utf8').trim().split('\n').map(Number);

function solution(input) {
  function 뿡야뿡야(tree) {
    const root = tree[0];
    const left = [];
    const right = [];

    for (let i = 1; i < tree.length; i++) {
      if (tree[i] < root) {
        left.push(tree[i]);
      } else {
        right.push(tree[i]);
      }
    }

    if (left.length === 1) {
      console.log(left[0]);
    } else if(left.length !== 0) {
      뿡야뿡야(left);
    }

    if (right.length === 1) {
      console.log(right[0]);
    } else if(right.length !== 0){
      뿡야뿡야(right);
    }

    console.log(root);
  }

  뿡야뿡야(input);
}

solution(input)