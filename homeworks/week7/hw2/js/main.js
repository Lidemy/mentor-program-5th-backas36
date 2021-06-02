document.querySelector('.faq__items').addEventListener('click', (event) => {
  const element = event.target.closest('.faq__item')
  if (element) {
    element.lastElementChild.classList.toggle('faq__answer--toggle')
  }
})
