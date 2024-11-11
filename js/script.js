"use strict"
console.clear();

//string
const countDownString = "countdown";
const tipsHelper = "tips";
const rndNumber = "rndNumber";
const rndNumberLi = "rndNumbGenerate";
//Reference HTML
const eleCountDown = document.getElementById(countDownString);
const eleTips = document.getElementById(tipsHelper);
const ulEleRndNumber = document.getElementById(rndNumber);

let timeLeftCountDown = 3;

for(let i = 0; i<5;i++){
    const liEleRndNumber = document.createElement("li");
    liEleRndNumber.classList.add(rndNumberLi);
    liEleRndNumber.innerHTML = RandomNumGen(99,1);

    ulEleRndNumber.appendChild(liEleRndNumber);
}



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