export const formInputLayoutGlobalStyles = `
  .form-input .inputRoot .inputLabel:hover {
    color: var(--restaurant-primary-color) !important;
  }

  .form-input .inputRoot .inputContainer .inputContent .input:focus {
    border-color: var(--restaurant-primary-color) !important;
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--restaurant-primary-color) 20%, transparent) !important;
  }

  .form-input.layout-menuxp .inputRoot .inputLabel {
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0.3px;
  }

  .form-input.layout-menuxp .inputRoot .inputContainer .inputContent .input {
    border: 1px solid hsl(216, 12%, 84%);
    border-radius: 16px;
    box-shadow: 4px 6px 0 #000000;
    font-weight: 700;

    &:focus {
      transform: translateY(-2px) translateZ(0);
      box-shadow: 2px 3px 0 #000000;
    }
  }

  .form-input.layout-default .inputRoot .inputLabel {
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0.3px;
  }

  .form-input.layout-default .inputRoot .inputContainer .inputContent .input {
    border: 1px solid hsl(216, 12%, 84%);
    border-radius: 8px;
    box-shadow: 2px 2px 0 #000000;
    font-weight: 400;

    &:focus {
      transform: translateY(-1px) translateZ(0);
      box-shadow: 4px 4px 0 #000000;
    }
  }

  .form-input.layout-dark .inputRoot .inputLabel {
    color: #ffffff !important;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0.3px;
  }

  .form-input.layout-dark .inputRoot .inputContainer .inputContent .input {
    background-color: #2a2a2a !important;
    color: #ffffff !important;
    border: 1px solid #404040;
    border-radius: 12px;
    box-shadow: 4px 4px 0 #000000;
    font-weight: 500;

    &::placeholder {
      color: #cccccc !important;
    }

    &:focus {
      transform: translateY(-1px) translateZ(0);
      box-shadow: 6px 6px 0 #000000;
    }
  }

  .form-input.layout-dark .inputRoot .inputError {
    color: #ff6b6b !important;
  }

  .form-input.layout-clean .inputRoot .inputLabel {
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0px;
  }

  .form-input.layout-clean .inputRoot .inputContainer .inputContent .input {
    border: 1px solid hsl(216, 12%, 84%);
    border-radius: 4px;
    box-shadow: none;
    font-weight: 300;

    &:focus {
      transform: none;
      box-shadow: none;
    }
  }

  .form-input.layout-square .inputRoot .inputLabel {
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0.3px;
  }

  .form-input.layout-square .inputRoot .inputContainer .inputContent .input {
    border: 1px solid hsl(216, 12%, 84%);
    border-radius: 0;
    box-shadow: none;
    font-weight: 400;

    &:focus {
      transform: none;
      box-shadow: none;
    }
  }
`
