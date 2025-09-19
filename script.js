const inputSlider = document.querySelector("[data-lengthSlider]") ;
const lengthDisplay = document.querySelector("[data-lengthNumber]") ;
const passDisplay = document.querySelector("[data-passwordDisplay]") ;
const copyBtn = document.querySelector("[data-copy]") ;
const copyMsg = document.querySelector("[data-copyMsg]") ;
const uppercaseCheck = document.querySelector("#uppercase") ;
const lowercaseCheck = document.querySelector("#lowercase") ;
const numberCheck = document.querySelector("#number") ;
const symbolCheck = document.querySelector("#symbols") ;
const indicator = document.querySelector("[data-indicator]") ;
const generateBtn = document.querySelector(".Generate-button") ;
const allCheckBox = document.querySelectorAll("input[type=checkbox]") ;

let password = "" ;
let passwordLength = 20;
let checkCount = 1 ;
handleSlider();
//set color of Strength Circle is GREY


function handleSlider()  {
    inputSlider.value = passwordLength ;
    lengthDisplay.innerText = passwordLength ;

}

function setIndecator(color){
    indicator.style.backgroundcolor = color ;
    //shadow => Home Work ;

}

function getRndInteger(min, max){

}


