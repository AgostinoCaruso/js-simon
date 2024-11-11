"use strict"
console.clear();

//string
const countDownString = "countdown";
const tipsHelper = "tips";
const rndNumber = "rndNumber";
const rndNumberLi = "rndNumbGenerate";
const inputUl = "inputUl";
const btnSubmit = "btnGuessedNumbers";
//class
const inputClass = "inputNumbers";
const dNoneClass = "d-none";

//Reference HTML
const eleCountDown = document.getElementById(countDownString);
const eleTips = document.getElementById(tipsHelper);

const ulEleRndNumber = document.getElementById(rndNumber);
const ulEleInput = document.getElementById(inputUl);

const eleBtnSubmit = document.getElementById(btnSubmit);
//variables
const numbToGuessArray = [];//array for generated numbers
const numUserInsert = [];

//Start program
//set countDown timer
let timeLeftCountDown = 3;
const countDownVar = setInterval(() => {
    CountDownToMemorize();
}, SetTimeSeconds(1));

//generate li and give rnd number, then append to ul in HTML
GenerateRandomNumbers();
console.log(numbToGuessArray);

//generate the input numbers for guessing numbers
GenerateInputNumbers();

//On Click i save the value of each input in a new array
const inputs = document.getElementsByTagName("input");
eleBtnSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    for (let i = 0; i < inputs.length; i++) {
        
        numUserInsert.push(inputs[i].value);
    }
    console.log(numUserInsert);
});



//function
function GenerateInputNumbers() {
    for (let i = 0; i < 5; i++) {
        const inputEleUserNumbers = document.createElement("input");
        inputEleUserNumbers.classList.add(inputClass);
        ulEleInput.appendChild(inputEleUserNumbers);
    }
}

function GenerateRandomNumbers() {
    for (let i = 0; i < 5; i++) {
        const liEleRndNumber = document.createElement("li");
        liEleRndNumber.classList.add(rndNumberLi);

        const randomNum = RandomNumGen(99, 1);
        liEleRndNumber.innerHTML = randomNum;

        numbToGuessArray.push(randomNum);

        ulEleRndNumber.appendChild(liEleRndNumber);

    }
}

function CountDownToMemorize() {
    eleCountDown.innerHTML = timeLeftCountDown;

    timeLeftCountDown--;

    if (timeLeftCountDown < 0) {
        clearInterval(countDownVar);
        //set visibile element
        eleCountDown.classList.add(dNoneClass);
        ulEleRndNumber.classList.add(dNoneClass);
        ulEleInput.classList.remove(dNoneClass);
        eleBtnSubmit.classList.remove(dNoneClass);
        //reset text
        eleTips.innerHTML = "Scrivi i numeri che hai memorizzato!!";
    }
}

//Utility function
function RandomNumGen(max, min) {
    return Math.floor(Math.random() * max + min);
}

//multiply the milliseconds in second
function SetTimeSeconds(num) {
    return num * 1000;
}