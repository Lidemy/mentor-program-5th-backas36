import styled from "styled-components"

const SquareStyle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: relative;
  z-index: 1;
  transition: background-color .1s;

  
  ${props => props.$value && `
     background-color:${props.$value};
  `}

  ${props => !props.$value && `
    &:hover {
      background-color: black;
      ${props.$isWhiteTurn && `
        background-color: white;
        opacity:0.6;
      `}
      box-shadow: 3px 4px 4px 0px #505050;
      opacity:0.6;

    }
  `}
`



const Square = ({ rowIndex, colIndex, board, handleChessClick, winner, isWhiteTurn }) => {
  const value = board[rowIndex][colIndex]

  return (
    <SquareStyle
      rowIndex={rowIndex}
      colIndex={colIndex}
      onClick={() => handleChessClick(colIndex, rowIndex, value)}
      $isWhiteTurn={isWhiteTurn}
      $value={value}
    >
    </SquareStyle>
  )
}

export default Square
