import styled from "@emotion/styled"
const AboutWrapper = styled.div`
  max-width:960px;
  margin:60px auto;
`
const AboutTitle = styled.div`
  font-size:30px;
  color:#777;
  text-align:center;
`

const AboutContent = styled.p`
  margin-top:50px;
  padding:0 20px;
  color:#888;
  line-height:2;
`
const AboutPage = () => {
  return (
    <>
      <AboutWrapper>
        <AboutTitle>ABOUT ME</AboutTitle>
        <AboutContent>
          這是在 Lidemy 程式導師計畫的最後一個實作作業，此刻的我也開始投履歷了，11/19 有個面試，希望一切順利。
          也很感謝這半年陪伴的同學，助教還有 Huli，不管是技術方面，這計畫連心理層面也都有幫我上了一堂課，不管最後工作是否有順利找到，這段日子都是我人生中重要的歷程之一。
        </AboutContent>
      </AboutWrapper>
    </>
  )
}

export default AboutPage