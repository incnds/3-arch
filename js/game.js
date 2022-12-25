import churches from "./data.js";
import Churches from "./Churches.js";

const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const screens = document.querySelectorAll(".screen");
const answerButtons = document.querySelector(".buttons-content");
const timeInfo = document.querySelectorAll(".time-info");

const boardItems = ["школа", "год постройки", "город", "фото-фрагмент"];

let fullTime = 0;
let time = 0;
let cost = 0;
let score = 0;
let curScore = 100;
let num = 0;
let interval;
let isGame = true;
document.getElementById("cur-score").textContent = score;

timeList.addEventListener("click", (event) => {
    if (event.target.classList.contains("time-btn")) {
        fullTime = parseInt(event.target.getAttribute("data-time"));
        time = fullTime;
        cost = parseInt(event.target.getAttribute("data-cost"));
        document.getElementById("cost").textContent = cost;
        screens[0].classList.add("up");
        screens[1].classList.remove("hide");
        startGame();
    }
});

let timeBtn = document.querySelectorAll(".time-btn");
timeBtn.forEach((timeEl) => {
    timeEl.addEventListener("mouseover", (e) => {
        e.target.style.transform = "translateY(-.3em)";
        e.target.style.borderBottom = "1px var(--style-4-bg-color) solid";
        e.target.parentElement.children[1].style.transform = "translateY(.3em)";
        e.target.parentElement.children[1].style.opacity = "100";
    });
    timeEl.addEventListener("mouseout", (e) => {
        e.target.style.transform = "translateY(.3em)";
        e.target.style.borderBottom = "";
        e.target.parentElement.children[1].style.opacity = "0";
        e.target.parentElement.children[1].style.transform =
            "translateY(-.3em)";
    });
});

function startGame() {
    interval = setInterval(decreaseTime, 1000);
    time < 10 ? setTime(`0${time}`) : setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        styleRightAnswerBtn(document.querySelector(".right-answer"));
        clearInterval(interval);
        if (isGame) {
            time = fullTime;
            startGame();
        }
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    document.querySelector(".score-container").classList.remove("hide");
    document.querySelector(".bg-transparent").classList.remove("hide");
    document.getElementById("score").textContent = score;
}

const answerBtns = document.querySelectorAll(".answer-btn");

const shuffle = (churches) => {
    return churches.sort(() => Math.round(Math.random() * 100) - 50);
};

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

function getNewChurch() {
    const nextChurch = randomChurches.pop();
    return nextChurch ? new Churches(nextChurch) : {};
}

const randomChurches = shuffle(churches);
randomChurches.filter((e) => randomChurches.indexOf(e) < 6);
let currentChurch;

function renderQuestion() {
    if (num < 6) {
        num = document.querySelector("#question-num").textContent = ++num;
        curScore = 100;
        document.getElementById("max-cur-score").textContent = curScore;
        currentChurch = getNewChurch();
        let randomAnswers = shuffle(churches)
            .map((church) => church.name)
            .filter((e) => e != currentChurch.name);
        const randomIndex = getRandomInt(4);
        answerBtns[randomIndex].textContent = currentChurch.name;
        answerBtns[randomIndex].classList.add("right-answer");
        answerBtns.forEach((answerBtn, i) => {
            if (i != randomIndex) {
                answerBtn.textContent = randomAnswers.shift();
            }
        });
    } else {
        isGame = false;
        finishGame();
    }
}

renderQuestion();

function cleanBoard() {
    document.querySelectorAll(".board-item").forEach((btn, i) => {
        btn.removeAttribute("disabled");
        btn.classList.remove("board-open");
        btn.innerHTML = boardItems[i];
    });
    document.getElementById("board-image").style.backgroundImage = "none";
}

board.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("board-item")) {
        curScore -= cost;
        document.getElementById("max-cur-score").textContent = curScore;
        let item = e.target.getAttribute("data-item");
        if (item === "image") {
            e.target.style.backgroundImage = `url(${currentChurch.image})`;
            e.target.innerHTML = "";
        } else {
            e.target.innerHTML =
                Object.values(currentChurch)[
                    Object.keys(currentChurch).indexOf(item)
                ];
        }
        e.target.setAttribute("disabled", true);
        e.target.classList.add("board-open");
    }
});

function styleRightAnswerBtn(btn) {
    document.querySelectorAll(".board-item").forEach((btn) => {
        btn.setAttribute("disabled", true);
    });
    btn.style.color = "#fff";
    btn.style.backgroundColor = "#A3DB6C";
    setTimeout(() => {
        btn.style.color = "var(--style-4-bg-color)";
        btn.style.backgroundColor = "var(--style-1-bg-color)";
        btn.classList.remove("right-answer");
        renderQuestion();
        cleanBoard();
        clearInterval(interval);
        if (isGame) {
            time = fullTime;
            startGame();
        }
    }, 1000);
}

function styleFalseAnswerBtn(btn) {
    btn.style.color = "#fff";
    btn.style.backgroundColor = "#EB7171";
    setTimeout(() => {
        btn.style.color = "var(--style-4-bg-color)";
        btn.style.backgroundColor = "var(--style-1-bg-color)";
    }, 1000);
}

answerButtons.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("answer-btn")) {
        if (e.target.classList.contains("right-answer")) {
            score += curScore;
            document.getElementById("cur-score").textContent = score;
        } else {
            styleFalseAnswerBtn(e.target);
        }
        styleRightAnswerBtn(document.querySelector(".right-answer"));
    }
});
