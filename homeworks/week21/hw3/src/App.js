import * as FSC from './form-style-component'

import Form from './Form'




const App = () => {

  return (
    <>
      <FSC.Wrapper>
        <FSC.FormTitle >新拖延運動表單</FSC.FormTitle>

        <FSC.FormDescription >
          活動日期：2020/12/10 ~ 2020/12/11 <br />
          活動地點：台北市大安區新生南路二段1號
        </FSC.FormDescription>

        <FSC.FormNotice className="form__notice">* 必填</FSC.FormNotice>

        <Form />

      </FSC.Wrapper >

      <FSC.Footer>© 2020 © Copyright. All rights Reserved.</FSC.Footer>
    </>
  )
}


export default App