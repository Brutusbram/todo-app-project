class FormValidator{
    constructor(settings, formElement) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._formElement = formElement;
}

_showInputError(_formElement, _inputElement, _errorMessage) {
  const errorElementId = `#${_inputElement.id}-error`;
    const errorElement = _formElement.querySelector(errorElementId);
    _inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = _errorMessage;
    errorElement.classList.add(this._errorClass);
};

_hideInputError(_inputElement) {
    const errorElementId = `#${_inputElement.id}-error`;
        const errorElement = this._formElement.querySelector(errorElementId);
        _inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    };

_hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

_checkInputValidity(_inputElement, _formElement) {
 if (!_inputElement.validity.valid) {
    this._showInputError(
        _formElement,
      _inputElement,
     _inputElement.validationMessage
    );
  } else {
    this._hideInputError(_inputElement);
  }
};

_toggleButtonState(_inputList,buttonElement) {
  if (this._hasInvalidInput(_inputList)) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

_setEventListeners(){
 this._inputList = Array.from(
    this._formElement.querySelectorAll(this._inputSelector),
  );
  const buttonElement = this._formElement.querySelector(
    this._submitButtonSelector,
  );

  this._toggleButtonState(this._inputList, buttonElement);

  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      this._checkInputValidity(inputElement, this._formElement);
      this._toggleButtonState(this._inputList, buttonElement);
    });
  });
}

_resetForm() {
    this._formElement.reset();
}

_resetValidation() {
    this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    });
    const buttonElement = this._formElement.querySelector(
        this._submitButtonSelector,
    );
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
}

    enableValidation(){
        this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
  });
  this._setEventListeners();
  this._resetValidation();
};
    
}
export default FormValidator;