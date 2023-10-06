const sun = document.getElementById("sun");
const earth = document.getElementById("earth");
const moon = document.getElementById("moon");

let earthAngle = 0;
let moonAngle = 0;

const earthOrbitRadius = 100;
const moonOrbitRadius = 20;

function animate() {
    earthAngle += 0.5; // Adjust the speed of Earth's orbit
    moonAngle += 1;   // Adjust the speed of Moon's orbit

    const earthX = earthOrbitRadius * Math.cos((earthAngle * Math.PI) / 180);
    const earthY = earthOrbitRadius * Math.sin((earthAngle * Math.PI) / 180);

    const moonX = earthX + moonOrbitRadius * Math.cos((moonAngle * Math.PI) / 180);
    const moonY = earthY + moonOrbitRadius * Math.sin((moonAngle * Math.PI) / 180);

    earth.style.left = earthX + "px";
    earth.style.top = earthY + "px";

    moon.style.left = moonX + "px";
    moon.style.top = moonY + "px";

    requestAnimationFrame(animate);
}

animate();
