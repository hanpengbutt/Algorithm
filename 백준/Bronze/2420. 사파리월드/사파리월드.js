let fs = require('fs')
let [a, b] = fs.readFileSync(0, 'utf-8').trim().split(' ').map(Number)

console.log(Math.abs(a - b))