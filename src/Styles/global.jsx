import { createGlobalStyle } from "styled-components";
export const GlobalStyles=createGlobalStyle`


*,*::after,*::before{
    box-sizing:border-box;
}
    body{
        background:${({theme})=>theme.background};
        color:${({theme})=> theme.title};
        padding:0;
        margin:0;
        transition:all 0.25s linear;
        overflow-y:scroll;
    }
    body::webkit-scrollbar{
        diaply:none;
    }
    .canvas{
        display:grid;
        grid-auto-flow:row;
        grid-template-row:auto 1fr auto;
        min-height:100vh;
        gap:0.5rem;
        padding:1rem;
        width:100vw;
        align-items:center;
    }
    .type-box{
        background-color:${({theme})=>theme.background};
        display:block;
        max-width:1000px;
        height:150px;
        position:relaive;
        margin-left:auto;
        margin-right:auto;
        overflow:hidden;
    }
    .words{
        font-size:30px;
        display:flex;
        flex-wrap:wrap;
        align-content:center;
        width:100%;
        color:${({theme})=> theme.typeBoxText};
    }
    .word{
        margin:5px;
        padding-right:2px;
    }
    .hidden-input{
        opacity:0;
    }
    .not_correct{
        color:red;
    }
    .correct{
        color:${({theme})=> theme.title};
    }
    .current{
        border-left:1px solid;
        animation:blinking 2s infinite;
        animation-timing-function:ease;
        @keyframes blinking{
            0% {border-left-color:${({theme})=> theme.title};}
            25% {border-left-color:${({theme})=> theme.background};}
            50% {border-left-color:${({theme})=> theme.title};}
            75% {border-left-color:${({theme})=> theme.background};}
            100% {border-left-color:${({theme})=> theme.title};}
        }
        


    }

  .right{
        border-right:1px solid;
        animation:blinkingRight 2s infinite;
        animation-timing-function:ease;
        @keyframes blinkingRight{
            0% {border-right-color:${({theme})=> theme.title};}
            25% {border-right-color:${({theme})=> theme.background};}
            50% {border-right-color:${({theme})=> theme.title};}
            75% {border-right-color:${({theme})=> theme.background};}
            100% {border-right-color:${({theme})=> theme.title};}
        }
    }

    .upper-menu{
        display:flex;
        max-width:1000px;
        margin-left:auto;
        margin-right:auto;
        justify-content: space-between;
        font-size: 20px;
        padding:1rem;
        color: ${({theme})=> theme.typeBoxText};

    }
    .time-modes, .word-mode{
        display:flex;

    }
    .counter{
        cursor:none;
    }
    .time, .no-of-words{
        margin-right:15px;
    }

    .time:hover, .no-of-words:hover{
        color: ${({theme})=> theme.title};
        cursor:pointer;
    }
    .mode:hover{
        color:${({theme})=>theme.title};
        cursor:pointer;   
    }
    .stat-box{
        display:flex;
        max-width:1000px;
        height:auto;
        margin-left:auto;
        margin-right:auto;
        gap:2rem;
        
    }
    .title{
        font-size:20x;
        color:${({theme})=> theme.typeBoxText};
    }
    .subtitle{
        font-size:30px;
        color:${({theme})=> theme.title};
    }
    .left-stats{
        width:30%;
        padding:30px;
    }
    .right-stats{
        width:70%;  
    }
    .footer{
        display:flex;
        width:1000px;
        margin-right:auto;
        margin-left:auto;
        justify-content:space-between;
        height:60px;
    }
    .header{
        display:flex;
        justify-content:space-around;
    }
    .result-graph .table{
        width:1000px;
        margin:auto;
    }
    .user-profile{
        width:1000px;
        margin:auto;
        display:flex;
        main-height:15rem;
        background:${({theme})=>theme.typeBoxText};
        border-radius:20px;
    }
    .users-profie{
        width:1000px;
        margin:auto;
    }
    .result-graph{
        width: 1000px;
        margin: auto;
    }
    .user{
        display:flex;
        width: 50%;
        justify-content: center;
        margin-top: 30px;
        margin-bottom: 30px;
        padding: 1rem;
        border-right: 2px solid;
    }
    .users-profile{
        width:700px;
        margin:auto;
        display: flex;
        min-height: 15rem;
        background: ${({theme})=> theme.typeBoxText};
        border-radius: 20px;
    }
    .user-picture{
        width:50%;
    }
    .userifo{
        width: 50%;
        margin-top: 1rem;
        font-size: 1.5rem;
        text-align: center;
        padding: 1rem;
    }
    .center-screen{
        display:flex;
        min-height:100vh;
        justify-content:center;
        align-items: center;
        text-align: center;
    }
    .totaltimes{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
    }
    .footer{
        display:flex,
        flex-direction:column,
        width:1000px;
        margin-right:auto;
        align-items:center;
        height:60px;
    }
    .actual-footer{
        display:flex;
        justify-content:space-between;
        width:1000px;
    }
    .hint{
        kbd{
            background-color: ${({theme})=>theme.title};
            color: ${({theme})=>theme.background};
            padding: 2.5px 5px;
            border-radius: 3px;
        }
    }
    .instructions{
        color: ${({theme})=>theme.title};
    }
    .reset-button{
        display: block;
        margin: auto;
        margin-top:3rem;
        transform: scale(2);
    }
    .instruction{
        color: ${({theme})=>theme.title};
    }
    .compareButton{
        margin-left:5rem;
    }
    .logo{
        display:flex;
        img{
            width:10rem;
            border-radius:50%
        }
    }
    a{
        text-decoration:none;
    }
    .logoicon{
        background-color:${({theme})=>theme.title};
        color: ${({theme})=>theme.background};       
        width:8rem;
        text-align:center;
        border-radius:30%;
        font-weight:700;
        font-family: "Comic Sans MS", "Comic Sans"; 
        cursor:pointer; 
    }
`