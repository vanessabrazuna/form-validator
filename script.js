let validator = {
  handleSubmit:(event) => {
    event.preventDefault()
    let send = true

    let inputs = formValidator.querySelectorAll('input')

    validator.clearErros()
  
    for(let i = 0; i < inputs.length; i++) {
      let input = inputs[i]
      let check = validator.checkInput(input)
      if(check !== true) {
        send = false
        // exibir o erro
        validator.showError(input, check)
      }
    }
  
    if(send) {
      formValidator.submit()
    }
  },
  checkInput:(input) => {
    let rules = input.getAttribute('data-rules')
    if(rules !== null) {
      rules = rules.split('|')
      for(let k in rules) {
        let ruleDetails = rules[k].split('=')
        switch(ruleDetails[0]) {
          case 'required':
            if(input.value === '') {
              return 'Este campo é obrigatório'
            }
          break
          case 'min':
            if(input.value.length < ruleDetails[1]) {
              return `Este campo deve ter no mínimo ${ruleDetails[1]} caracteres`
            }
          break   
          case 'email':
            if(input.value != '') {
              // expressão regular para email
              let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              if(!regex.test(input.value.toLowerCase())) {
                return 'Este email não é válido'
              }
            }
          break    
        }
      }
    } 
    return true
  },
  showError:(input, error) => {
    input.style.borderColor = '#d63031'

    let errorMessage = document.createElement('div')
    errorMessage.classList.add('error')
    errorMessage.innerHTML = error

    input.parentElement.insertBefore(errorMessage, input.nextSibling)
  },
  clearErros:() => {
    let inputsErrors = formValidator.querySelectorAll('input')
    for(let i = 0; i < inputsErrors.length; i++) {
      inputsErrors[i].style.borderColor = ''
    }

    let errors = document.querySelectorAll('.error')
    for(let i = 0; i < errors.length; i++) {
      errors[i].remove()
    }
  }
}
let formValidator = document.querySelector('#validator')
formValidator.addEventListener('submit', validator.handleSubmit)
