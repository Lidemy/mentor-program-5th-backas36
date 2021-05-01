const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

function solve(lines) {
  const from = +lines[0].split(' ')[0]
  const to = +lines[0].split(' ')[1]
  // 先判斷是否為水仙花數
  const check = (number) => {
    const count = countD(number)
    let sum = 0
    let m = number
    while (m !== 0) {
      const num = m % 10
      sum += num ** count
      m = Math.trunc(m / 10)
    }
    return sum === number
  }

  // 判斷幾位數
  const countD = (number) => {
    let count = 0
    while (number !== 0) {
      number = Math.trunc(number / 10)
      count++
    }
    return count
  }

  for (let i = from; i <= to; i++) {
    if (check(i)) console.log(i)
  }
}

rl.on('close', () => {
  solve(lines)
})
