document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()
  let hasEmpty = false
  const formResult = {}

  const inputsBlocks = document.querySelectorAll('.form__block')
  for (const inputBlock of inputsBlocks) {
    const radios = inputBlock.querySelectorAll('input[type=radio]')
    const inputText = inputBlock.querySelector('input[type=text]')
    const formResultKey = inputBlock.querySelector('.form__block__title').innerText
    const makeFormResult = (key, value) => {
      formResult[key] = value
    }

    const emptyStyle = (isEmpty = true) => {
      if (isEmpty) {
        inputBlock.querySelector('.input__empty').classList.remove('input__empty-hide')
      } else {
        inputBlock.querySelector('.input__empty').classList.add('input__empty-hide')
      }
    }

    if (inputBlock.classList.contains('form__block-required')) {
      if (inputText) {
        if (!inputText.value) {
          emptyStyle()
          hasEmpty = true
        } else {
          emptyStyle(false)
          makeFormResult(formResultKey, inputText.value)
        }
      }
      if (radios.length) {
        if ([...radios].some((radio) => radio.checked)) {
          emptyStyle(false)
          const radioCheckedValue = inputBlock.querySelector('input[type=radio]:checked').labels[0].innerText
          makeFormResult(formResultKey, radioCheckedValue)
        } else {
          emptyStyle()
          hasEmpty = true
        }
      }
    } else {
      makeFormResult(formResultKey, inputText.value)
    }
  }
  if (!hasEmpty) {
    let showFormResult = ''
    for (const key in formResult) {
      showFormResult += `${key} : ${formResult[key]} \n`
    }
    alert(showFormResult)
  }
})
