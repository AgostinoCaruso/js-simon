"use strict"
console.clear();

//string
const countDownString = "countdown";
const tipsHelper = "tips";
const rndNumber = "rndNumber";
const rndNumberLi = "rndNumbGenerate";
const inputUl = "inputUl";
const inputClass = "inputNumbers";
const btnSubmit = "btnGuessedNumbers";
//Reference HTML
const eleCountDown = document.getElementById(countDownString);
const eleTips = document.getElementById(tipsHelper);

const ulEleRndNumber = document.getElementById(rndNumber);
const ulEleInput = document.getElementById(inputUl);

const eleBtnSubmit = document.getElementById(btnSubmit);
//variables
const numbToGuessArray = [];//array for generated numbers
const numUserInsert = [];

//generate li and give rnd number, then append to ul in HTML
for(let i = 0; i<5;i++){
    const liEleRndNumber = document.createElement("li");
    liEleRndNumber.classList.add("rndNumberLi");
    
    const randomNum = RandomNumGen(99, 1);
    liEleRndNumber.innerHTML = randomNum;
    
    numbToGuessArray.push(randomNum);
    
    ulEleRndNumber.appendChild(liEleRndNumber);
    
}
console.log(numbToGuessArray);
//generate the input numbers for guessing numbers
for(let i = 0; i<5; i++){
    const inputEleUserNumbers = document.createElement("input");
    inputEleUserNumbers.classList.add(inputClass);
    ulEleInput.appendChild(inputEleUserNumbers);
}

eleBtnSubmit.addEventListener("click", function(event){
    event.preventDefault();

});

let timeLeftCountDown = 3;
const countDownVar = setInterval(() => {
    CountDownToMemorize();
}, SetTimeSeconds(1));

function GenerateRndNumber(){
    
}

function CountDownToMemorize(){
    eleCountDown.innerHTML = timeLeftCountDown;

    timeLeftCountDown--;

    if(timeLeftCountDown<0){
        clearInterval(countDownVar);
        ulEleRndNumber.classList.add("d-none");
        eleTips.innerHTML = "Scrivi i numeri che hai memorizzato!!";
    }
}


//Utility function
function RandomNumGen(max,min){
    return Math.floor(Math.random() * max+min);
}

//multiply the milliseconds in second
function SetTimeSeconds(num){
    return num*1000;
}