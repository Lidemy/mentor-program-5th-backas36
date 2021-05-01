const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

function solve(input) {
  for (let i = 1; i <= lines[0]; i++) {
    console.log('*'.repeat(i))
  }
}

rl.on('close', () => {
  solve(lines)
})
