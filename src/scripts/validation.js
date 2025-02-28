// Функция отключения кнопки отправки формы
const disableSubmitButton = (submitButton, config) => {
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);
};

// Активация и деактивация кнопки
function toggleButtonState(formElement, config) {
    const inputElements = formElement.querySelectorAll(config.inputSelector);
    const submitButton = formElement.querySelector(config.submitButtonSelector);
    const isFormValid = Array.prototype.every.call(inputElements, (inputElement) => inputElement.checkValidity());

    if (isFormValid) {
        submitButton.disabled = false;
        submitButton.classList.remove(config.inactiveButtonClass);
    } else {
        disableSubmitButton(submitButton, config); 
    }
}

// Отображение сообщений об ошибке
function showInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-input-error`);
    inputElement.classList.add(config.inputErrorClass);

    if (inputElement.validity.patternMismatch) {
        errorElement.textContent = inputElement.dataset.errorMessage;
    } else {
        errorElement.textContent = inputElement.validationMessage;
    }
    errorElement.classList.add(config.errorClass);
}

// Скрытие сообщений об ощибке
function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-input-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
}

// Включение валидации
function enableValidation(config) {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formElement) => {
        const inputElements = formElement.querySelectorAll(config.inputSelector);
        inputElements.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                if (!inputElement.checkValidity()) {
                    showInputError(formElement, inputElement, config);
                } else {
                    hideInputError(formElement, inputElement, config);
                }
                toggleButtonState(formElement, config);
            });
        })
    });
}

// Очистка ошибок валидации
function clearValidation(formElement, config) {
    const inputElements = formElement.querySelectorAll(config.inputSelector);
    inputElements.forEach((inputElement) => {
        hideInputError(formElement, inputElement, config);
        const submitButton = formElement.querySelector(config.submitButtonSelector);
        disableSubmitButton(submitButton, config);
    });
}

export {
    enableValidation,
    clearValidation,
    toggleButtonState
};