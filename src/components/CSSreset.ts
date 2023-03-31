import { createGlobalStyle } from "styled-components";

export const CSSreset = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body{
        background-color: #A9907E;
    }
    .title{
        font-family: 'Mr Dafoe', cursive;
        font-size: 3rem;
        display: flex;
        justify-content: center;
        margin: 10px 0 10px 0;
    }
`