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
let checkCount = 0;
handleSlider();
//ste strength circle color to grey


//set passwordLength
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    //or kuch bhi karna chahiye ? - HW
}


function setIndecator(color){
    indicator.style.backgroundColor = color ;
    //shadow => Home Work ;
}

function getRndInteger(min, max){
    return Math.floor(Math.random() * (max - min)) +  min  ;
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

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
        setIndecator("#0f0");
    }
    else if((hasUpper || hasLower) && (hasNum || hasSym) && passwordLength >=6){
        setIndecator("#0ff") ;
    }
    else {
        setIndecator("#f00") ;
    }
}

async function copyContent() {
    try{
        await navigator.clipboard.writeText(passDisplay.value);
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

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleChangeCheckbox() {
    checkCount = 0 ;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++ ;
        }
    })

    //special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount ;
        handleSlider() ;
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener( 'change' , handleChangeCheckbox) ;
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click' , () => {
    if(passDisplay.value){
        copyContent();
    }
})

generateBtn.addEventListener('click', () => {

    //none of the checkbox are selected
    if(checkCount <= 0 ) return ;

    if(passwordLength < checkCount){
        passwordLength = checkCount ;
        handleSlider() ;
    }

    //let's strart to find new password 
    console.log("Starting");
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkbox
    // if(uppercaseCheck.checked){
    //     password += generateUpperCase() ;
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase() ;
    // }
    // if(numberCheck.checked){
    //     password += generateRandomNumber() ;
    // }
    // if(symbolCheck.checked){
    //     password += generateSymbol() ;
    // }

    let funcArr = [] ;

    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if(numberCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolCheck.checked){
        funcArr.push(generateSymbol);
    }

    //compulsary addition 
    for(let i=0 ; i<funcArr.length ; i++){
        password += funcArr[i]() ;
    }
    console.log("compulsary");

    //remaining addition 
    for(let i=0 ; i<passwordLength - funcArr.length ; i++){
        let randIndex = getRndInteger(0 , funcArr.length);
        password += funcArr[randIndex]();
    }
    console.log("Remaining");
    //shuffel the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    
    //show password in UI
    passDisplay.value = password ;
    console.log("ui done");
    //calculate strength
    calStrength();

})
    