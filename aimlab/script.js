const SHOWING_TIME_SEC = 5;

const timer = document.querySelector('.timer');
const target = document.querySelector('.target')
const game_area = document.querySelector('.game-area');
document.querySelector('.button-container>button')
    .addEventListener('click', startGame);


let createdTime;
let isLose = false;
target.addEventListener('click', () => {
    target.style.display = 'none';
    const reactionTime = new Date() - createdTime;
    isLose = false;
    timer.innerHTML = `${Math.floor(reactionTime / 1000)}.${reactionTime % 1000} ms`;
    startGame()
});

function startGame() {
    setTimeout(createTarget, getRandomNumber(1000, 6000))
}

function createTarget() {
    const {width, height} = game_area.getBoundingClientRect()


    const x = getRandomNumber(0, width - 75)
    const y = getRandomNumber(0, height - 75)

    target.style.left = `${x}px`
    target.style.top = `${y}px`

    target.style.display = 'block';
    createdTime = new Date();
    isLose = true;
    setTimeout(() => {
            if (isLose) {
                target.style.display = 'none';
                timer.innerHTML = `>${SHOWING_TIME_SEC}s(`;
                startGame()
            }
        }
        ,
        1000 * SHOWING_TIME_SEC
    )
}


function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}