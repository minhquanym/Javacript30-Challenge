// Get element
const player = document.querySelector(".player");
const video = document.querySelector(".player__video");
const playButton = document.querySelector(".player__button.toggle");
const skipButtons = document.querySelectorAll('[data-skip]');
const fullscreenButton = document.getElementsByName('fullscreen')[0];
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const ranges = document.querySelectorAll('.player__slider');


function togglePlay() {
    if (video.paused === true) {
        playButton.textContent = '❚ ❚';
        video.play();
    }
    else {
        playButton.textContent = '►';
        video.pause();
    }
}
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
function updateProgressBar() {
    const percentage = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${percentage}%`;
}
function updateRange() {
    video[this.name] = this.value;
}
function updateTime(e) {
    const time = e.offsetX / progress.offsetWidth * video.duration;
    video.currentTime = time;
}
function fullscreenToggle() {
    if (document.fullscreen === true) {
        document.exitFullscreen();
    }
    player.requestFullscreen();
}

video.addEventListener('timeupdate', updateProgressBar);
playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', updateRange));
ranges.forEach(range => range.addEventListener('mousemove', updateRange));

let mousedown = false;
progress.addEventListener('click', updateTime);
progress.addEventListener('mousemove', (e) => {
    if (mousedown === true) updateTime(e);
});
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown=false);

fullscreenButton.addEventListener('click', fullscreenToggle);