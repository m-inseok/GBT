import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 16px; // 1rem = 16px
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f0f0f0; /* Background outside the phone */
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }

  #root {
    width: 100%;
    max-width: 430px; /* Mobile width */
    height: 100vh;
    background-color: white;
    position: relative;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
