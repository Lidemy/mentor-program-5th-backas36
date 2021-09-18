import styled from 'styled-components'


const Info = styled.div`
  width: 200px;
  text-align: center;
`
const Button = styled.button`
  border-radius: 6px;
  border: 4px solid brown;
  background-color: #dec3a1;
  padding: 6px 12px;
  cursor: pointer;
  transition: all .2s;   
  color:brown;
  &:hover{
    background-color: #DEB887;
    color: azure;
  }
`

const Player = styled.div`
  
  background-color: #000;
  ${props => props.$isWhiteTurn && `
    background-color:#fff;
  `}
  box-shadow: 3px 4px 4px 0px #505050;

  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  transform: translateY(25%);
  margin-left:20px;

`


const GameInfo = ({ isWhiteTurn, winner }) => {
  return (
    <Info>
      <h1>五子棋</h1>
      {!winner && (
        <h3>Next player :
          <Player $isWhiteTurn={isWhiteTurn.current} winner={winner}></Player>
        </h3>
      )}
      {winner && (
        <h3>Winner is  :
          👍🏽 {winner === 'black' ? '黑色' : '白色'}
        </h3>
      )}


      <Button className="btn-light" onClick={() => window.location.reload()}>重來一次</Button>
    </Info>
  )
}

export default GameInfo