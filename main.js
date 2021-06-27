const timeInput = document.querySelector("#timeInput");
const timeType = document.querySelector("#timeType");
const timeOutput = document.querySelector(".time");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");

const topSand = document.querySelector(".top .sand");
const bottomSand = document.querySelector(".bottom .sand");
const sandDown = document.querySelector(".bottom .sand-down");

let timer = null;
let startLeakSandTimeout = null;

startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    timeOutput.textContent = "00:00";
    const timeTypeOption = timeType.value;
    let time = timeTypeOption == "minutes" ? timeInput.value * 60 : timeInput.value;

    if(time && time > 0){
        topSand.style.animation = `leak-sand ${time}s cubic-bezier(.5,.5,.6,.9) 1s infinite normal both`;
        sandDown.style.animation = `sand-anim-1 1s cubic-bezier(.5,.5,.5,.5) 1s infinite normal both`;
        startLeakSandTimeout = setTimeout(()=>{
            sandDown.style.animation = `sand-anim-2 ${time}s cubic-bezier(.5,.5,.6,.9) 2s infinite normal both`;
            bottomSand.style.animation = `fill-sand ${time}s cubic-bezier(.5,.5,.5,.5) 1s infinite normal both`;
        }, 2000);
        timer = setInterval(()=>{
            timeOutput.textContent = formatTime(time);
            time--;
            if(time <= 0){
                clearData();
            }
        }, 1000);
    }
});

stopBtn.addEventListener("click", () => {
    clearData();
});

const clearData = () => {
    clearInterval(timer);
    clearTimeout(startLeakSandTimeout);
    timeOutput.textContent = "00:00";
    topSand.style.animation = `none`;
    bottomSand.style.animation = `none`;
    sandDown.style.animation = `none`;
    startBtn.disabled = false;
}

const formatTime = (timeSeconds) => {
    const hours = Math.floor(timeSeconds / 3600);
    const minutes = Math.floor(timeSeconds / 60);
    const seconds = timeSeconds % 60;
    return hours > 0 
        ? `${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
        : `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}