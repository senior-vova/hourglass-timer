const timeInput = document.querySelector("#timeInput");
const timeType = document.querySelector("#timeType");
const timeOutput = document.querySelector("#time");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");

const topSand = document.querySelector(".top .sand");
const bottomSand = document.querySelector(".bottom .sand");
const sandDown = document.querySelector(".bottom .sand-down");

let timer = null;
let startLeakSandTimeout = null;

function generateAnimationValue(name, time, count) {
    return `${name} ${time}s linear ${count} normal both`;
}

startBtn.addEventListener("click", () => {
    const timeTypeOption = timeType.value;
    let time = timeTypeOption == "minutes" ? timeInput.value * 60 : timeInput.value;

    if(!isNaN(time) && time > 0){
        startBtn.disabled = true;
        stopBtn.disabled = false;
        sandDown.style.animation = generateAnimationValue("jet-sand-anim", 1, 1);
        topSand.style.animation = generateAnimationValue("leak-sand", time, 1);
        startLeakSandTimeout = setTimeout(()=>{
            sandDown.style.animation = generateAnimationValue("jet-sand-second-anim", time, 1);
            bottomSand.style.animation = generateAnimationValue("fill-sand", time, 1);
        }, 2000);
        timer = setInterval(()=>{
            timeOutput.textContent = formatTime(time);
            time--;
            if(time < 0) clearData(true);
        }, 1000);
    }
});

stopBtn.addEventListener("click", () => {
    clearData(false);
});

const clearData = (showAlert = false) => {
    clearInterval(timer);
    clearTimeout(startLeakSandTimeout);
    topSand.style.animation = ``;
    bottomSand.style.animation = ``;
    sandDown.style.animation = ``;
    timeOutput.textContent = "00:00";
    startBtn.disabled = false;
    stopBtn.disabled = true;
    if (showAlert) alert("Time out"); 
}

const formatTime = (timeSeconds) => {
    const hours = Math.floor(timeSeconds / 3600);
    const minutes = Math.floor(timeSeconds / 60);
    const seconds = timeSeconds % 60;
    return hours > 0 
        ? `${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
        : `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}