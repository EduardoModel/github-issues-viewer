import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    /*
      It limits the expansion of the elements
      For example: if a padding from 10 px will be given to a box with 280 px of width,
      it will mantain the width of 280 px but the content will be scalled down to 260 px
    */
    box-sizing: border-box;
  }
  // To allow the main containers to occpupy the whole height of the DOM
  html, body, #root {
    min-height: 100%;
  }

  body {
    background: #7159c1;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
