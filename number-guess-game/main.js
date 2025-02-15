// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 Down!!
// 랜덤번호가 > 유저번호 Up!!
// Reset버튼을 누르면 게임이 리셋된다.
// 3번의 기회를 다쓰면 게임이 끝남 (더이상 추측 불가, 버튼이 disable )
// 유저가 1~100 범위 밖에 숫자를 입력하면 알림, 기회를 깍지 않음
// 유저가 이미 입력한 숫자를 또 입력하면 알림, 기회를 깍지 않음

let randomNumber = 0;
let chances = 3;
let gameOver = false;
let history = [];

let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");


playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function() {
    userInput.value = "";
});

function generateRandomNumber() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log("정답", randomNumber);
}

function play() {
    let userValue = userInput.value;

    if(userValue < 1 || userValue > 100) {
        resultArea.textContent = "1과 100 사이의 숫자를 입력하세요";
        return;
    }

    if(history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요";
        return;
    }

    chances--;
    chanceArea.textContent = `남은 기회 : ${chances}번`
    if(userValue < randomNumber) {
        resultArea.textContent = "Up!";
    } else if(userValue > randomNumber) {
        resultArea.textContent = "Down!";
    } else {
        resultArea.textContent = "That's Right!";
        gameOver = true;
    }

    history.push(userValue);

    if(chances < 1) {
        gameOver = true;
    }

    if(gameOver) {
        playButton.disabled = true;
    }
}

function reset() {

    userInput.value = "";
    chances = 3;
    gameOver = false;
    history = [];

    resultArea.textContent = "결과값이 나타납니다.";
    chanceArea.textContent = `남은 기회 : ${chances}번`;
    
    playButton.disabled = false;
    generateRandomNumber();

}

generateRandomNumber();
