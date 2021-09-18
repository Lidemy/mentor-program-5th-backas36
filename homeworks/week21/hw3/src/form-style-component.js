import styled from 'styled-components'

export const Wrapper = styled.div`
  max-width: 645px;
  background-color: white;
  margin: 10% auto;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  border-top: 8px solid #fad312;
  padding: 64px 32px;
`

export const FormTitle = styled.h1`
  margin: 0;
  font-size: 36px;
  font-weight: bold;
`
export const FormDescription = styled.p`
  margin-top: 35px;
  font-size: 14px;
  line-height: 2em ;
`

export const FormNotice = styled.p`
  font-size: 16px;
  color: #e74149;
  margin-top: 20px;
`

export const Footer = styled.footer`
    background-color: black;
    color: #999999;
    font-size: 13px;
    padding: 24px 12px;
    text-align: center;
`


export const FormBlockTitle = styled.div`
  font-size: 20px;
`

export const FormBlock = styled.div`
  margin-top: 35px;
  ${props => props.$isRequired && `
    ${FormBlockTitle}::after{
      content: '*';
      color: #e74149;
      margin-left: 8px;
    }`
  }
`


export const FormBlockDescription = styled.div`
  font-size: 14px;
  margin-top: 8px;
`

export const FormBlockInputWrapper = styled.div`
  margin-top: 16px;

  input[type = "text"]{
    border: solid 1px #d0d0d0;
    font-size: 16px;
    padding: 3px 12px;
    margin-top:12px;
  }

  & label {
    display:block;
    margin-top:12px;
  }
`
export const InputWarning = styled.div`
    visibility: hidden;
    ${props => props.$isEmpty && `
      visibility:visible;
      margin-top:5px;
      color:#e74149;
    `}
`
export const FormSubmit = styled.input`
  background-color: #fad312;
  color: black;
  padding: 12px 32px;
  font-size: 15px;
  margin-top: 48px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
 
`
