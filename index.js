const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
// const resumeButton = document.getElementById('resume-button');
const resetButton = document.getElementById('reset-button');
const speedUpButton = document.getElementById('speed-up-button');
const slowDownButton = document.getElementById('slow-down-button');

const earthSpin = document.querySelector('.earth-spin');
const earthRotate = document.querySelector('#earth');
const moonSpin = document.querySelector('.moon-spin');
const controlPanel =  document.querySelector('.control-panel');

let earthAnimation;
let earthRotateAnimation;
let moonAnimation;
let intervalId;
let eclipseNumbers = 0;
let tutorialMode = 1;


const initialDate = new Date();
const currentDate = new Date();

controlPanel.style.pointerEvents = "none";


function startAnimations() {
    earthSpin.style.animation = 'spin-right 109.5s linear infinite';
    earthRotate.style.animation = 'spin-right 109.5s linear infinite, rotate-earth 10s linear infinite';
    moonSpin.style.animation = 'spin-right 3s linear infinite'; 


    intervalId = setInterval(function() {
        incrementDate();
    }, 300); // 5000 milliseconds = 5 seconds
    
    //startButton.style.pointerEvents = "none";

    if (lunarOn){
        document.querySelector('#moon').style.animation = "backgroundChange 0.5s linear forwards";
        lunarOn = false;
    }

    if (solarOn){
        document.querySelector('#earth').style.filter = 'brightness(1)';
    }

    startButton.style.pointerEvents = "none";

    if(tutorialMode == 0)
    {
    pauseButton.style.pointerEvents = "all";
    }

    if(eclipseNumbers >= 2)
    {
        tutorialMode = 0;
    }


}

function pauseAnimations() {
    earthSpin.style.animationPlayState = 'paused';
    earthRotate.style.animationPlayState = 'paused';
    moonSpin.style.animationPlayState = 'paused';

    // resumeButton.style.display = "inline-block";

    clearInterval(intervalId);

    if(tutorialMode == 0)
    {
    pauseButton.style.pointerEvents = "none";
    startButton.style.pointerEvents = "all";
    }

}

let lunarOn = false;
let solarOn = false;


function resetAnimations() {
    earthSpin.style.animation = null;
    earthRotate.style.animation = null;
    moonSpin.style.animation = null;
    
    clearInterval(intervalId);
    

    currentDate.setTime(initialDate.getTime());
    displayDate();
    



    pauseButton.style.pointerEvents = "none";
    startButton.style.pointerEvents = "all";
    
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
// resumeButton.addEventListener('click', resumeAnimations);
resetButton.addEventListener('click', resetAnimations);
speedUpButton.addEventListener('click', speedUpAnimation);
slowDownButton.addEventListener('click', slowDownAnimation);

// ---------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------

function displayDate() {
    // const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('dateDisplay').textContent = currentDate.toLocaleDateString(undefined, options);
}

function incrementDate() {
    currentDate.setDate(currentDate.getDate() + 1);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('dateDisplay').textContent = currentDate.toLocaleDateString(undefined, options);
}

displayDate();

// -----------------------------------------------------------------------

const scientificTexts = [
    "An eclipse occurs when one celestial object moves into the shadow cast by another celestial object. Here, we will watch the Earth and moon motion till the eclipse happens.",
    "In the case of a solar eclipse, the moon passes between the Earth and the Sun, blocking out the Sun's light for a brief period.",
    "During a lunar eclipse, the Earth comes between the Sun and the Moon, casting a shadow on the Moon's surface."
];


// Get the popup and close button elements
const popup = document.getElementById('popup');
const closePopup = document.getElementById('close-popup');
const popBtn = document.getElementById('popBtn');


popBtn.addEventListener('click', startAnimations);


// Function to show the popup
function showPopup(index) {
    const scientificTextElement = document.getElementById('scientific-text');
    const title = document.getElementById('popupTitle');
    scientificTextElement.textContent = scientificTexts[index];
    if (index === 0){
        title.textContent = "Welcome To Eclipse.";
    }
    if (index === 1 && eclipseNumbers < 2) {
        title.textContent = "Solar Eclipse!";
        eclipseNumbers++;
    }
    if (index === 2 && eclipseNumbers < 2) {
        title.textContent = "Lunar Eclipse!";
        eclipseNumbers++;
    }
    popup.style.visibility = 'visible';

}

// Function to close the popup
function closePopupDialog() {
    popup.style.visibility = 'hidden';
    // startButton.click();
}

// Show the popup when the page loads (you can trigger this function at your desired time)
window.onload = function () {
    showPopup(0);
};

// Close the popup when the close button is clicked
closePopup.addEventListener('click', closePopupDialog);
popBtn.addEventListener('click', closePopupDialog);


// Close the popup when the user clicks outside of it
// window.addEventListener('click', (event) => {
//     if (event.target === popup) {
//         closePopupDialog();
//     }
// });

// -------------------------------------------------------------------------

const sunElement = document.querySelector('#sun');
const earthElement = document.querySelector('#earth');
const moonElement = document.querySelector('#moon');

function getPosition(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return { x: centerX, y: centerY };
}
function getDistanceSquared(point1, point2) {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return dx * dx + dy * dy;
}
init = -1;

function checkDistanceRelationships() {
    const sunPosition = getPosition(sunElement);
    const earthPosition = getPosition(earthElement);
    const moonPosition = getPosition(moonElement);

    const sunEarthDistanceSquared = getDistanceSquared(sunPosition, earthPosition);
    const sunMoonDistanceSquared = getDistanceSquared(sunPosition, moonPosition);

    reqval = sunMoonDistanceSquared - sunEarthDistanceSquared;

    if (Math.abs(reqval - 75000) <= 2000 && init != 1  && eclipseNumbers < 2) {
        init = 1;
        pauseAnimations();
        showPopup(2);
        document.querySelector('#moon').style.animation = "backgroundChange2 1s linear forwards";
        lunarOn = true;
    }

    if (Math.abs(reqval + 50000) <= 2000 && init != 2 && eclipseNumbers < 2 ) {
        init = 2;
        pauseAnimations();
        showPopup(1);
        solarOn = true;
        document.querySelector('#earth').style.filter = 'brightness(0.5)';
    }

    if (tutorialMode == 0)
    {
    controlPanel.style.pointerEvents = "all";
    }
}


setInterval(checkDistanceRelationships, 10); 

