const currentOperandEl = document.getElementById("current-operand");
const previousOperandEl = document.getElementById("previous-operand");
const particlesContainer = document.getElementById("particles");

let currentOperand = '0';
let previousOperand = '';
let operation = null;

// Create background particles
function createParticles() {
  const particleCount = 30;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 10 + 2;
    const posX = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.bottom = `-${size}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    particlesContainer.appendChild(particle);
  }
}

function updateDisplay() {
  currentOperandEl.textContent = currentOperand || '0';
  previousOperandEl.textContent = operation ? `${previousOperand} ${operation}` : '';
}

function appendNumber(number) {
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number;
  } else {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand += number;
  }
  updateDisplay();
}

function chooseOperation(op) {
  if (currentOperand === '') return;
  if (previousOperand !== '') calculate();
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
  updateDisplay();
}

function calculate() {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  let result;
  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current === 0 ? 'Error' : prev / current;
      break;
    default:
      return;
  }

  currentOperand = result.toString();
  operation = null;
  previousOperand = '';
  updateDisplay();
}

function clear() {
  currentOperand = '0';
  previousOperand = '';
  operation = null;
  updateDisplay();
}

function toggleSign() {
  if (currentOperand === '') return;
  currentOperand = (parseFloat(currentOperand) * -1).toString();
  updateDisplay();
}

function backspace() {
  if (currentOperand.length > 1) {
    currentOperand = currentOperand.slice(0, -1);
  } else {
    currentOperand = '0';
  }
  updateDisplay();
}

// Button press animation
function animateButton(button) {
  button.classList.add('pressed');
  setTimeout(() => {
    button.classList.remove('pressed');
  }, 150);
}

// Button Event Bindings
document.querySelectorAll(".number").forEach(button => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
    animateButton(button);
  });
});

document.querySelectorAll(".operator").forEach(button => {
  button.addEventListener("click", () => {
    chooseOperation(button.dataset.operator);
    animateButton(button);
  });
});

document.querySelector("[data-action='calculate']").addEventListener("click", (e) => {
  calculate();
  animateButton(e.target);
});

document.querySelector("[data-action='clear']").addEventListener("click", (e) => {
  clear();
  animateButton(e.target);
});

document.querySelector("[data-action='plus-minus']").addEventListener("click", (e) => {
  toggleSign();
  animateButton(e.target);
});

document.querySelector("[data-action='decimal']").addEventListener("click", (e) => {
  appendNumber('.');
  animateButton(e.target);
});

document.querySelector("[data-action='backspace']").addEventListener("click", (e) => {
  backspace();
  animateButton(e.target);
});

// Initialize
createParticles();
updateDisplay();