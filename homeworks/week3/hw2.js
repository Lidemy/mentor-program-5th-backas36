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
const solve = (lines) => {
  const n = Number(lines[0].split(' ')[0])
  const m = Number(lines[0].split(' ')[1])
  for (let i = n; i <= m; i++) {
    if (flower(i)) console.log(i)
  }
}

const flower = (number) => {
  const digit = countD(number)
  let sum = 0
  let number2 = number
  while (number2 !== 0) {
    const num = number2 % 10
    sum += num ** digit
    number2 = Math.trunc(number2 / 10)
  }
  return number === sum
}

const countD = (number) => {
  let count = 0
  while (number !== 0) {
    number = Math.trunc(number / 10)
    count++
  }
  return count
}

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines)
})
