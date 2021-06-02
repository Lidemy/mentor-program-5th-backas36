const faqQuestions = document.querySelectorAll('.faq__question')
faqQuestions.forEach((faqQuestion) => faqQuestion.addEventListener('click', (e) => {
  faqQuestion.nextElementSibling.classList.toggle('faq__answer--toggle')
}))
