var form = document.querySelector('.contact-form');
var formElements = Array.prototype.slice.call(form.elements);
var messageField = document.getElementById('message-field');

function handleFormSubmit (event) {
  event.preventDefault();
  var isValid = true;
  messageField.innerHTML = "";

  function setIsValid () {
    if (isValid) {
      isValid = false;
    }
  }

  formElements.forEach(function (element) {
    if (element.classList.contains('form-field') && !element.value.trim()) {
      displayErrorMessage(element, 'field is empty', setIsValid);
    } else if (element.type === 'email') {
      var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!element.value.match(emailRegExp)) {
        displayErrorMessage(element, 'field is invalid', setIsValid);
      }
    }
  })
  if (isValid) {
    messageField.innerHTML = "<p>Thank you!</p>"
  }
}

function displayErrorMessage (element, errorText, setIsValid) {
  var fieldName = element.name.charAt(0).toUpperCase() + element.name.slice(1)
  messageField.innerHTML += "<p>" + fieldName + " " + errorText + "</p>"
  setIsValid()
}

form.addEventListener('submit', handleFormSubmit);
