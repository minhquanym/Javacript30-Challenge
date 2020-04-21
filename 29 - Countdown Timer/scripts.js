let countdown;
const timeLeft = document.querySelector('.display__time-left');
const timeEnd = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
var audio = document.querySelector('.my_audio');
audio.loop = 'true';


function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds*1000;

    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            audio.play();
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const display = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    document.title = display;
    timeLeft.textContent = display;
}
function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    timeEnd.textContent = `Ring Ring At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}
function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.getElementsByName('customForm')[0].addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
});


