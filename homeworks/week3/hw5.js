const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line)
})

// 上面都不用管，只需要完成這個 function 就好，可以透過 lines[i] 拿取內容
function solve(lines) {
  for (let i = 1; i < lines.length; i++) {
    const data = lines[i].split(' ')
    const [a, b, rule] = data
    console.log(battle(a, b, rule))
  }
}

const battle = (a, b, rule) => {
  if (a === b) return 'DRAW'
  if (rule === '-1') [a, b] = [b, a]
  if (a.length === b.length) return (a > b) ? 'A' : 'B'
  return (a.length > b.length) ? 'A' : 'B'
}

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines)
})
