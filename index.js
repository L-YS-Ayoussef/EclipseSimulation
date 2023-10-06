const sun = document.getElementById("sun");
const earth = document.getElementById("earth");
const moon = document.getElementById("moon");
const earthSpin = document.querySelector(".earth-spin");
const moonOrbit = document.querySelector(".moon-orbit"); // Select the moon's orbit container
const moonSpin = document.getElementById("moon-spin");

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
