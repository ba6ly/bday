// 
let rotation = 0;
let isSpinning = false;

const wheel = document.getElementById("wheel");
const button = document.getElementById("spinButton");

const sectors = [
  "page1.html",
  "page2.html",
  "page3.html"
];

button.addEventListener("click", startSpin);

function startSpin() {
  if (isSpinning) return;

  isSpinning = true;
  button.disabled = true;

  const sectorCount = sectors.length;
  const sectorSize = 360 / sectorCount;

  // Pick random sector
  const sectorIndex = Math.floor(Math.random() * sectorCount);

  // Add randomness inside sector
  const padding = 5;
  const minAngle = sectorIndex * sectorSize + padding;
  const maxAngle = (sectorIndex + 1) * sectorSize - padding;
  const randomAngle = minAngle + Math.random() * (maxAngle - minAngle);

  // Rotate so selected sector goes to top (12 o'clock)
  const targetAngle = 360 - randomAngle;
  

  const extraTurns = 4; // smooth spinning
  rotation += extraTurns * 360 + targetAngle;

  wheel.style.transform = `rotate(${rotation}deg)`;
}

// Run ONCE per spin
wheel.addEventListener("transitionend", handleResult, { once: true });

function handleResult() {
  const finalRotation = rotation % 360;
  const sectorSize = 360 / sectors.length;

  const index =
    Math.floor(((360 - finalRotation) % 360) / sectorSize);

  // Redirect (mobile safe)
  setTimeout(() => {
    window.location.href = sectors[index];
  }, 500);
}
