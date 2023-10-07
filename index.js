const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resumeButton = document.getElementById('resume-button');
const resetButton = document.getElementById('reset-button');
const speedUpButton = document.getElementById('speed-up-button');
const slowDownButton = document.getElementById('slow-down-button');

const earthSpin = document.querySelector('.earth-spin');
const earthRotate = document.querySelector('#earth');
const moonSpin = document.querySelector('.moon-spin');

let earthAnimation;
let earthRotateAnimation;
let moonAnimation;

function startAnimations() {
    earthSpin.style.animation = 'spin-right 109.5s linear infinite';
    earthRotate.style.animation = 'spin-right 109.5s linear infinite, rotate-earth 10s linear infinite';
    moonSpin.style.animation = 'spin-right 3s linear infinite'; 
}

function pauseAnimations() {
    earthSpin.style.animationPlayState = 'paused';
    earthRotate.style.animationPlayState = 'paused';
    moonSpin.style.animationPlayState = 'paused';

    resumeButton.style.display = "inline-block";
}

function resumeAnimations() {
    earthSpin.style.animationPlayState = 'running';
    earthRotate.style.animationPlayState = 'running';
    moonSpin.style.animationPlayState = 'running';

    resumeButton.style.display = "none";
}

function resetAnimations() {
    earthSpin.style.animation = null;
    earthRotate.style.animation = null;
    moonSpin.style.animation = null;
}

function speedUpAnimation() {
    earthSpin.style.animationPlayState = 'paused';
    earthRotate.style.animationPlayState = 'paused';
    moonSpin.style.animationPlayState = 'paused';

    const earthSpeed = parseFloat(getComputedStyle(earthSpin).animationDuration);
    const moonSpeed = parseFloat(getComputedStyle(moonSpin).animationDuration);

    earthSpin.style.animationDuration = earthSpeed * 0.5 + 's';
    moonSpin.style.animationDuration = moonSpeed * 0.5 + 's';

    earthSpin.style.animationPlayState = 'running';
    earthRotate.style.animationPlayState = 'running';
    moonSpin.style.animationPlayState = 'running';
}

function slowDownAnimation() {
    earthSpin.style.animationPlayState = 'paused';
    earthRotate.style.animationPlayState = 'paused';
    moonSpin.style.animationPlayState = 'paused';

    const earthSpeed = parseFloat(getComputedStyle(earthSpin).animationDuration);
    const moonSpeed = parseFloat(getComputedStyle(moonSpin).animationDuration);

    earthSpin.style.animationDuration = earthSpeed * 2 + 's';
    moonSpin.style.animationDuration = moonSpeed * 2 + 's';

    earthSpin.style.animationPlayState = 'running';
    earthRotate.style.animationPlayState = 'running';
    moonSpin.style.animationPlayState = 'running';
}

startButton.addEventListener('click', startAnimations);
pauseButton.addEventListener('click', pauseAnimations);
resumeButton.addEventListener('click', resumeAnimations);
resetButton.addEventListener('click', resetAnimations);
speedUpButton.addEventListener('click', speedUpAnimation);
slowDownButton.addEventListener('click', slowDownAnimation);



const now = new Date();
const dayOfYear = Math.floor(
    (now - new Date(now.getFullYear(), 0, 0)) / 86400000
);

const earthPosition = (179 + dayOfYear) % 360;
const rotationValue = earthPosition + 360;

// Create a <style> element to add the keyframes
const styleElement = document.createElement('style');
styleElement.type = 'text/css';

document.head.appendChild(styleElement);

// Define the keyframes dynamically based on the calculated rotationValue
const keyframes = `
  @keyframes spin-right {
    100% {
      transform: rotate(${rotationValue}deg);
    }
  }
`;

// Add the keyframes to the <style> element's stylesheet
styleElement.textContent = keyframes;

// Apply the rotation to the Earth and Moon
earthSpin.style.transform = `rotate(${earthPosition}deg)`;
moonSpin.style.transform = `rotate(${earthPosition}deg)`;
