let rotation = 0;

const wheel = document.getElementById('wheel');
const button = document.getElementById('spinButton');


const sectors = [
  'page1.html',
  'page2.html',
  'page3.html'
];

let isSpinning = false;

button.addEventListener('click', spin);

function spin() {
  if (isSpinning) return; // prevent double spins
  isSpinning = true;
  button.disabled = true;

  const randomSpin = Math.floor(Math.random() * 360) + 1800; // random + multiple rotations
  rotation += randomSpin;
  wheel.style.transform = `rotate(${rotation}deg)`;
}

// After the rotation transition ends, determine which sector landed at the top and navigate
wheel.addEventListener('transitionend', (e) => {
  if (e.propertyName !== 'transform') return;

  const finalRotation = rotation % 360; // angle between 0 and 359
  const sectorCount = sectors.length;
  const sectorSize = 360 / sectorCount;

  // Calculate the index of the sector at the top (12 o'clock). This assumes the top is the "pointer".
  const index = Math.floor(((360 - finalRotation) % 360) / sectorSize) % sectorCount;

  const url = sectors[index];

  if (url) {
    // Navigate to the selected page (same tab). Change to window.open(url, '_blank') to open in a new tab.
    window.location.href = url;
  } else {
    // If no URL is configured for that sector, re-enable button and show a message
    isSpinning = false;
    button.disabled = false;
    alert('No page assigned for this sector.');
  }
});