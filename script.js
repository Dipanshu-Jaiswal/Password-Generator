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
const symbol = '~!@#$%^&*()_+-={}|;:"<>?,./';


//initially
let password = "";
let passwordLength = 10;
let checkCount = 1;
handleSlider();
//ste strength circle color to grey


//set passwordLength
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    //or kuch bhi karna chahiye ? - HW
}


function setIndecator(color){
    indicator.style.backgroundcolor = color ;
    //shadow => Home Work ;

}

function getRndInteger(min, max){
    Math.floor(Math.random() * (max - min)) +  min  ;


}

function generateRandomNumber(){
    return getRndInteger(0 , 9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97 , 123)) ;
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65 , 91));
}

function generateSymbol(){
    const rndNum = getRndInteger(0 , symbol.length);
    return symbol.charAt(rndNum) ;
}

function calStrength(){
    let hasUpper = false ;
    let hasLower = false ;
    let hasNum = false ;
    let hasSym = false ;

    if(uppercaseCheck.checked) hasUpper = true ;
    if(lowercaseCheck.checked) hasLower = true ;
    if(numberCheck.checked) hasNum = true ;
    if(symbolCheck.checked) hasSym = true ;

    if(hasUpper && hasLower (hasNum || hasSym) && passwordLength >= 8){
        setIndecator("#0f0");
    }
    else if((hasUpper || hasLower) && (hasNum || hasSym) && passwordLength >=6){
        setIndecator("#0ff0") ;
    }
    else {
        setIndecator("#0f00") ;
    }
}

async function copyContent() {
    try{
        await navigator.clipboard.writeText(passDisplay);
        copyMsg.innerText = "Copied";
    }
    catch(e){
        copyMsg.innerText = "Failed" ;        
    }

    //to make copy wala span(copied text) visible 
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active") ;
    } , 2000)
}


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})