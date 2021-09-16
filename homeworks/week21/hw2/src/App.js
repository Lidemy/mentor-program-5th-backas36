import styled from 'styled-components'

import useBoard from './useBoard'
import Square from './Square'
import GameInfo from './GameInfo'



const Board = styled.div`
  padding: 6px;
  background-color: burlywood;
  flex: 1;
`

const Col = styled.div`
  width: 30px;
  height: 30px;
  position: relative;

  &::before{
    content: "";
    width: 30px;
    background-color: #000;
    position: absolute;
    top: 9px;
    left: 0;
    height: 2px;
  } 

  &::after {
    content: "";
    height: 30px;
    background-color: #000;
    position: absolute;
    top: 0;
    left: 9px;
    width: 2px;
  }
`
const Row = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;

  &:first-child .col::after {
    top: 9px;
  }

  &:last-child .col::after {
    height: 10px;
  }

  & .col:first-child::before {
    left: 9px;
  }

  & .col:last-child::before {
    width: 10px;
  }
`


const App = () => {
  const { board, winner, isWhiteTurn, handleChessClick } = useBoard()

  return (
    <>
      <GameInfo isWhiteTurn={isWhiteTurn} winner={winner} />
      <Board>
        {board.map((row, currentRow) => {
          return (
            <Row key={currentRow}>
              {row.map((col, currentCol) => {
                return (
                  <Col key={currentCol} className="col">
                    <Square
                      rowIndex={currentRow}
                      colIndex={currentCol}
                      board={board}
                      handleChessClick={handleChessClick}
                      isWhiteTurn={isWhiteTurn.current}
                      winner={winner}
                    />
                  </Col>
                )
              })}
            </Row>
          )
        })}
      </Board>
    </>
  )
}

export default App