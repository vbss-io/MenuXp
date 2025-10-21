export const formTextareaLayoutGlobalStyles = `
  .form-textarea .textareaContainer .textareaLabel:hover {
    color: var(--restaurant-primary-color) !important;
  }

  .form-textarea .textareaContainer .textarea:focus {
    border-color: var(--restaurant-primary-color) !important;
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--restaurant-primary-color) 20%, transparent) !important;
  }

  .form-textarea.layout-default .textareaContainer .textareaLabel {
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0.3px;
  }

  .form-textarea.layout-default .textareaContainer .textarea {
    border: 1px solid hsl(216, 12%, 84%);
    border-radius: 8px;
    box-shadow: 2px 2px 0 #000000;
    font-weight: 400;

    &:focus {
      transform: translateY(-1px) translateZ(0);
      box-shadow: 4px 4px 0 #000000;
    }
  }

  .form-textarea.layout-dark .textareaContainer .textareaLabel {
    color: #ffffff !important;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0.3px;
  }

  .form-textarea.layout-dark .textareaContainer .textarea {
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

  .form-textarea.layout-clean .textareaContainer .textareaLabel {
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0px;
  }

  .form-textarea.layout-clean .textareaContainer .textarea {
    border: 1px solid hsl(216, 12%, 84%);
    border-radius: 4px;
    box-shadow: none;
    font-weight: 300;

    &:focus {
      transform: none;
      box-shadow: none;
    }
  }

  .form-textarea.layout-square .textareaContainer .textareaLabel {
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0.3px;
  }

  .form-textarea.layout-square .textareaContainer .textarea {
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
