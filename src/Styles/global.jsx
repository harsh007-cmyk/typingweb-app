import { createGlobalStyle } from "styled-components";
export const GlobalStyles=createGlobalStyle`
    body{
        background:red;
        color:white;
        padding:0;
        margin:0;
        transition:all 0.25s;
    }
    .canvas{
        display:grid;
        grid-auto-flow:row;
        grid-template-row:auto 1fr auto;
        min-height:100vh;
        gap:0.5rem;
        padding:1rem;
        width:1rem;
    }

`