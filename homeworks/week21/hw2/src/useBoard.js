import { useState, useRef, useEffect } from 'react'

const countChess = (board, x, y, directionX, directionY) => {
  const currentChess = board[y][x]
  let tempX = x + directionX
  let tempY = y + directionY
  let total = 0

  while (board[tempY] && board[tempY][tempX] === currentChess) {
    tempX += directionX
    tempY += directionY
    total++
  }
  return total
}

const getWinner = (board, x, y) => {
  if (
    countChess(board, x, y, 0, 1) + countChess(board, x, y, 0, -1) >= 4 ||
    countChess(board, x, y, 1, 0) + countChess(board, x, y, -1, 0) >= 4 ||
    countChess(board, x, y, 1, 1) + countChess(board, x, y, -1, -1) >= 4 ||
    countChess(board, x, y, 1, -1) + countChess(board, x, y, -1, 1) >= 4
  ) {
    return board[y][x]
  }
}



const useBoard = () => {
  const [board, setBoard] = useState(
    Array(19).fill(Array(19).fill(null))
  )

  const [winner, setWinner] = useState(null)
  const currentX = useRef()
  const currentY = useRef()
  const isWhiteTurn = useRef(false)



  const handleUpdateBoard = (x, y) => {
    setBoard(
      board.map((row, currentY) => {
        if (currentY !== y) return row

        return row.map((col, currentX) => {

          if (currentX !== x) return col

          return isWhiteTurn.current ? 'white' : 'black'
        })
      }),
    )
  }

  const handleChessClick = (x, y, value) => {
    if (value || winner) return
    currentX.current = x
    currentY.current = y
    handleUpdateBoard(x, y)
    isWhiteTurn.current = !isWhiteTurn.current
  }

  useEffect(() => {
    if (!currentX.current || !currentY.current) return

    setWinner(getWinner(board, currentX.current, currentY.current))
  }, [board])

  return {
    board,
    winner,
    isWhiteTurn,
    handleChessClick
  }
}


export default useBoard