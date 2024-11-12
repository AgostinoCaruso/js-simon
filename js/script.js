"use strict"
console.clear();

//string
const countDownString = "countdown";
const tipsHelper = "tips";
const rndNumber = "rndNumber";
const rndNumberLi = "rndNumbGenerate";
const inputUl = "inputUl";
const btnSubmit = "btnGuessedNumbers";
const btnRestart = "restartGame";
const btnSelectNumbBtn = "selectNumbBtn";
const formNumberGenerated = "numberGenerated";
const formNumberTimer = "numberTimer";
//class
const inputClass = "inputNumbers";
const dNoneClass = "d-none";

//Reference HTML
const eleCountDown = document.getElementById(countDownString);
const eleTips = document.getElementById(tipsHelper);

const ulEleRndNumber = document.getElementById(rndNumber);
const ulEleInput = document.getElementById(inputUl);

const eleBtnSubmit = document.getElementById(btnSubmit);
const eleBtnRestart = document.getElementById(btnRestart);

const eleSelectNumbBtn = document.getElementById(btnSelectNumbBtn);
const eleFormNumGenerated = document.getElementById(formNumberGenerated);
const eleFormNumberTimer = document.getElementById(formNumberTimer);
//variables
const numbToGuessArray = [];//array for generated numbers
const numUserInsert = [];//input user numbers
const numGuessed = [];//guessed numbers
const wrongNumGuessed = [];
let counterGuessedNumbers = 0;//keep track of guessed numbers

//settable variable
let numbers = 30;
//let numbers = prompt("numbs: ");
let timeLeftCountDown = 90;
//let timeLeftCountDown=prompt("time:");
eleCountDown.innerHTML = timeLeftCountDown;

//Start program
//set countDown timer
const countDownVar = setInterval(() => {
    CountDownToMemorize();
}, SetTimeSeconds(1));

//generate li and give rnd number, then append to ul in HTML
GenerateRandomNumbers();

//generate the input numbers for guessing numbers
GenerateInputNumbers();

eleSelectNumbBtn,addEventListener("click", (event)=>{
    event.preventDefault();
    timeLeftCountDown = 0;
    eleSelectNumbBtn.classList.add(dNoneClass);
});
//On Click i save the value of each input in a new array
//const inputs = document.getElementsByTagName("input");
const inputs = document.querySelectorAll('input[type="number"]');

eleBtnSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    for (let i = 0; i < inputs.length; i++) {

        numUserInsert.push(inputs[i].value);
    }
    CheckIfGuessedRight();
    eleBtnSubmit.classList.toggle(dNoneClass);
});
//event for check input number, filed no more 2 digits numbers
inputs.forEach(input => {
    input.addEventListener('input', (event) => {
        // Limita a due cifre
        if (event.target.value.length > 2) {
            event.target.value = event.target.value.slice(0, 2);
        }
    });
});

timeLeftCountDown--;
//function
function CountDownToMemorize() {
    eleCountDown.innerHTML = timeLeftCountDown;
    timeLeftCountDown--;

    if (timeLeftCountDown < 0) {
        clearInterval(countDownVar);
        //set visibile element
        eleCountDown.classList.toggle(dNoneClass);
        ulEleRndNumber.classList.toggle(dNoneClass);
        ulEleInput.classList.toggle(dNoneClass);
        eleBtnSubmit.classList.toggle(dNoneClass);
        //reset text
        eleTips.innerHTML = "Scrivi i numeri che hai memorizzato!!";
    }
}
//generate random number
function GenerateRandomNumbers() {
    for (let i = 0; i < numbers; i++) {
        const liEleRndNumber = document.createElement("li");
        liEleRndNumber.classList.toggle(rndNumberLi);
        liEleRndNumber.classList.toggle("col-2");
        liEleRndNumber.classList.toggle("rnd-num");

        const randomNum = RandomNumGen(99, 1);
        liEleRndNumber.innerHTML = `${randomNum} `;

        numbToGuessArray.push(randomNum);

        ulEleRndNumber.appendChild(liEleRndNumber);

    }
}
//generate input type number
function GenerateInputNumbers() {
    for (let i = 0; i < numbers; i++) {
        const divInputEleUserNumbers = document.createElement("div");

        const inputEleUserNumbers = document.createElement("input");
        inputEleUserNumbers.max = 99;
        inputEleUserNumbers.type = "number";
        inputEleUserNumbers.min = 1;
        //to remove arrow on input field
        const style = document.createElement('style');
        style.innerHTML = `
            input[type=number]::-webkit-outer-spin-button,
            input[type=number]::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            input[type=number] {
                -moz-appearance: textfield;
            }
        `;
        document.head.appendChild(style);
        //----
        inputEleUserNumbers.classList.toggle(inputClass);
        divInputEleUserNumbers.classList.toggle("col-2");
        divInputEleUserNumbers.classList.toggle("div-input");

        ulEleInput.appendChild(divInputEleUserNumbers);
        divInputEleUserNumbers.appendChild(inputEleUserNumbers);
    }
}

//i removed the second for index j just to make sure that i can write red all wrong numb of index i
function CheckIfGuessedRight() {
    for (let i = 0; i < numbToGuessArray.length; i++) {
        let foundMatch = false;
        if (numbToGuessArray[i] == numUserInsert[i]) {
            counterGuessedNumbers++;
            numGuessed.push(numbToGuessArray[i]);
            inputs[i].classList.add("green-font");
            foundMatch = true;
            wrongNumGuessed.push("nan");
        }
        if (!foundMatch) {
            wrongNumGuessed.push(numbToGuessArray[i]);
        }
    }
    for (let i = 0; i < numbToGuessArray.length; i++) {
        if (!isNaN(wrongNumGuessed[i])) {
            inputs[i].value = wrongNumGuessed[i];
            inputs[i].classList.add("red-font");
        }
    }
    eleBtnRestart.classList.toggle(dNoneClass);
    let percentuage = (counterGuessedNumbers / numbToGuessArray.length) * 100;
    eleTips.innerHTML = `num guess:  ${counterGuessedNumbers}, guessed numbers are:${numGuessed}, ${percentuage}%`;
    console.log(`num guess:  ${counterGuessedNumbers}, which are(${numGuessed}) and wrong(${wrongNumGuessed})`);
}



//media query
function updateDivInput() {
    const divInputMediaQuery = document.getElementsByClassName("div-input");  // Array per conservare gli input
    const rndNumMediaQuery = document.getElementsByClassName("rnd-num");
    for (let i = 0; i < inputs.length; i++) {

        //console.log(divInputMediaQuery[i]);  // Log per debug

        divInputMediaQuery[i].classList.forEach(className => {
            if (className.includes("col-")) {
                divInputMediaQuery[i].classList.remove(className);  // Rimuovi classi col- esistenti
                rndNumMediaQuery[i].classList.remove(className);
            }
        });

        // Rimuove tutte le classi che iniziano con "col-" e aggiungi la nuova classe in base alla larghezza della finestra
        if (window.innerWidth < 576) {
            divInputMediaQuery[i].classList.add("col-4");
            //divInputMediaQuery[i].style.borderBottom = "10px solid rgb(250, 0, 0)"; 
            //const mainContainer = document.getElementById("main-container");
            //mainContainer.classList.remove("w-75");
            //mainContainer.style.width = "100%";
            rndNumMediaQuery[i].classList.add("col-4");
            rndNumMediaQuery[i].style.borderBottom = "10px solid rgb(250, 0, 0)"; 
            //rndNumMediaQuery[i].style.fontSize = "3em";
        }
        else if (window.innerWidth >= 576 && window.innerWidth < 800) {
            //mainContainer.classList.add("w-75");
            divInputMediaQuery[i].classList.add("col-4");
            rndNumMediaQuery[i].classList.add("col-3");
            rndNumMediaQuery[i].style.fontSize = "2em";

        }
        else if (window.innerWidth >= 768 && window.innerWidth < 1126) {
            divInputMediaQuery[i].classList.add("col-3");
            rndNumMediaQuery[i].classList.remove("col-1");
            rndNumMediaQuery[i].classList.add("col-2");
        }
        else {
            divInputMediaQuery[i].classList.add("col-2");
            rndNumMediaQuery[i].classList.add("col-1");
        }
    }
}

// Chiamata alla funzione all'avvio
updateDivInput();

// Aggiunge un event listener per aggiornare le classi quando la finestra viene ridimensionata
window.addEventListener("resize", updateDivInput);

//Utility function
function RandomNumGen(max, min) {
    return Math.floor(Math.random() * max + min);
}

//multiply the milliseconds in second
function SetTimeSeconds(num) {
    return num * 1000;
}