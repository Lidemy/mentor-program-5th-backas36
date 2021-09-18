import { useState } from 'react'

import * as FSC from './form-style-component'


const Input = ({ label, name, handleChange, desc, data }) => {
  return (
    <>
      <FSC.FormBlockTitle>{label}</FSC.FormBlockTitle>
      {desc && <FSC.FormBlockDescription>對活動的一些建議</FSC.FormBlockDescription>}
      <input
        type="text"
        name={name}
        onChange={handleChange}
        value={data}
      />
    </>
  )
}

const Radio = ({ label, name, handleChange, data }) => {
  return (
    <>
      <FSC.FormBlockTitle>{label}</FSC.FormBlockTitle>
      <label>
        <input
          type="radio"
          value='躺在床上用想像力實作'
          name={name}
          onChange={handleChange}
          checked={data === '躺在床上用想像力實作'}
        />
        躺在床上用想像力實作
      </label>
      <label>
        <input
          type="radio"
          value='趴在地上滑手機找現成的'
          name={name}
          onChange={handleChange}
          checked={data === '趴在地上滑手機找現成的'}
        />
        趴在地上滑手機找現成的
      </label>
    </>
  )
}

const originForm = [
  {
    title: 'nickname',
    content: '',
    isRequired: true,
    isEmpty: null,
    inputType: 'text',
    inputLabel: '暱稱',

  },
  {
    title: 'email',
    content: '',
    isRequired: true,
    isEmpty: null,
    inputType: 'text',
    inputLabel: '電子郵件',

  },
  {
    title: 'phone',
    content: '',
    isRequired: true,
    isEmpty: null,
    inputType: 'text',
    inputLabel: '手機號碼',

  },
  {
    title: 'type',
    content: '',
    isRequired: true,
    isEmpty: null,
    inputType: 'radio',
    inputLabel: '報名類型',

  },
  {
    title: 'referal',
    content: '',
    isRequired: true,
    isEmpty: null,
    inputType: 'text',
    inputLabel: '怎麼知道這活動的？',

  },
  {
    title: 'others',
    content: '',
    isRequired: false,
    isEmpty: null,
    inputType: 'text',
    inputLabel: '其他',
    description: '對活動的一些建議'
  }
]

const Form = () => {
  const [form, setForms] = useState(originForm)


  const handleSubmit = (e) => {
    e.preventDefault()

    const handleValidation = (item) => {
      return item.content ? true : false
    }

    let result = ''

    if (form.filter(item => item.isRequired).every(item => handleValidation(item))) {
      form.map(item => {
        result += `${item.title} : ${item.content} \n`
        return item
      })
      alert(result)
      setForms(originForm)
    } else {
      setForms(form.map(item => {
        if (item.isRequired && !handleValidation(item)) {
          return {
            ...item,
            isEmpty: true
          }
        }
        return item
      }))
    }
  }

  const handleInputChange = (e) => {
    setForms(form.map(item => {
      if (item.title !== e.target.name) return item
      return {
        ...item,
        content: e.target.value,
        isEmpty: false
      }
    }))
  }

  const handleRadioChange = (e) => {
    setForms(form.map(item => {
      if (item.title !== e.target.name) return item
      return {
        ...item,
        content: e.target.value,
        isEmpty: false
      }
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      {form.map(item => {
        if (item.inputType === 'text') {
          return (
            <FSC.FormBlock
              key={item.title}
              $isRequired={item.isRequired}
            >
              <FSC.FormBlockInputWrapper>
                <Input
                  label={item.inputLabel}
                  name={item.title}
                  handleChange={handleInputChange}
                  data={item.content}
                  desc={item.description}
                />

                <FSC.InputWarning
                  $isEmpty={item.isEmpty}
                >
                  請輸入{item.inputLabel}
                </FSC.InputWarning>
              </FSC.FormBlockInputWrapper>
            </FSC.FormBlock>
          )
        } else if (item.inputType === 'radio') {
          return (
            <FSC.FormBlock
              key={item.title}
              $isRequired={item.isRequired}
            >
              <FSC.FormBlockInputWrapper>
                <Radio
                  label={item.inputLabel}
                  name={item.title}
                  handleChange={handleRadioChange}
                  data={item.content}
                />
                <FSC.InputWarning
                  $isEmpty={item.isEmpty}
                >
                  請輸入{item.inputLabel}
                </FSC.InputWarning>
              </FSC.FormBlockInputWrapper>
            </FSC.FormBlock>
          )
        } else {
          return <div>尚未設定表單問題</div>
        }
      })}


      <FSC.FormSubmit type="submit" />
      <p>
        請勿透過表單送出您的密碼。
      </p>

    </form>
  )
}

export default Form