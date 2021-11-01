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
          這是在 lidemy 第五期計畫中的倒數第三個作業，雖然進度已經落後兩週多，但是我不會放棄的。
          進入 react 之後，感覺之前學的 JS, CSS 很多概念都用上了，有點像是在總複習的感覺，雖然這個 blog 還是很陽春，但是之後履歷作品打算整理一下這個 blog，並且加上其他功能 (現在還沒想到什麼功能😆 )，希望到時候一切順利。
        </AboutContent>
      </AboutWrapper>
    </>
  )
}

export default AboutPage