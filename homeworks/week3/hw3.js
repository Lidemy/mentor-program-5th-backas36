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
  for (let i = 1; i < lines.length; i++) {
    let isPrime = true
    if (+lines[i] === 1) isPrime = false
    for (let j = +lines[i] - 1; j >= 2; j--) {
      if (+lines[i] % j === 0) {
        isPrime = false
        break
      }
    }
    console.log(isPrime ? 'Prime' : 'Composite')
  }
}

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines)
})
