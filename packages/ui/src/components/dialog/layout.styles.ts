export const dialogLayoutGlobalStyles = `
  .dialog.layout-menuxp[data-state='open'] {
    border: 1px solid #000000 !important;
    border-radius: 16px !important;
    box-shadow: 6px 8px 0 #000000 !important;
    font-weight: 500 !important;
  }

  .dialog.layout-default[data-state='open'] {
    border: 2px solid hsl(220, 13%, 91%);
    border-radius: 8px;
    box-shadow: 2px 2px 0 #000000;
    font-weight: 400;
  }

  .dialog.layout-dark[data-state='open'] {
    background-color: #2a2a2a !important;
    color: #ffffff !important;
    border: 2px solid #404040;
    border-radius: 12px;
    box-shadow: 4px 4px 0 #000000;
    font-weight: 500;

    p {
      color: #cccccc !important;
    }
  }

  .dialog.layout-clean[data-state='open'] {
    border: 1px solid hsl(220, 13%, 91%);
    border-radius: 4px;
    box-shadow: none;
    font-weight: 300;
  }

  .dialog.layout-square[data-state='open'] {
    border: 2px solid hsl(220, 13%, 91%);
    border-radius: 0;
    box-shadow: none;
    font-weight: 400;
  }
`
