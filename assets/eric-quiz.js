"use strict";

const { isEric } = globalThis.EricIdentity;

const quizPage = document.querySelector(".quiz-page");
const form = document.querySelector("#identityQuiz");
const steps = [...document.querySelectorAll(".quiz-step")];
const backButton = document.querySelector("#backButton");
const nextButton = document.querySelector("#nextButton");
const exitQuizButton = document.querySelector("#exitQuizButton");
const verifiedResult = document.querySelector("#verifiedResult");
const rejectedResult = document.querySelector("#rejectedResult");
const tryAgainButton = document.querySelector("#tryAgainButton");
const confettiCanvas = document.querySelector("#confettiCanvas");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let currentStep = 0;
let animationFrameId = 0;
let confettiActive = false;
let particles = [];

const CONFETTI_COLORS = ["#ffea00", "#ff4f81", "#00e5ff", "#ffffff", "#ff8c00"];

function resizeConfettiCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  confettiCanvas.width = Math.round(window.innerWidth * pixelRatio);
  confettiCanvas.height = Math.round(window.innerHeight * pixelRatio);
  const context = confettiCanvas.getContext("2d");
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function createParticles() {
  return Array.from({ length: 120 }, () => ({
    x: Math.random() * window.innerWidth,
    y: -20 - Math.random() * window.innerHeight * 0.5,
    width: 5 + Math.random() * 7,
    height: 8 + Math.random() * 10,
    velocityX: -2 + Math.random() * 4,
    velocityY: 2.5 + Math.random() * 4,
    rotation: Math.random() * Math.PI,
    rotationSpeed: -0.12 + Math.random() * 0.24,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  }));
}

function cancelConfetti() {
  confettiActive = false;
  particles = [];
  cancelAnimationFrame(animationFrameId);
  animationFrameId = 0;
  confettiCanvas.getContext("2d").clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

function startConfetti() {
  cancelConfetti();
  if (reducedMotion.matches) return;

  resizeConfettiCanvas();
  particles = createParticles();
  confettiActive = true;
  const startedAt = performance.now();
  const context = confettiCanvas.getContext("2d");

  function drawFrame(timestamp) {
    const elapsed = timestamp - startedAt;
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (const particle of particles) {
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      particle.rotation += particle.rotationSpeed;
      if (particle.y > window.innerHeight + 20) particle.y = -20;

      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.fillStyle = particle.color;
      context.fillRect(
        -particle.width / 2,
        -particle.height / 2,
        particle.width,
        particle.height,
      );
      context.restore();
    }

    if (elapsed < 3000 && confettiActive) {
      animationFrameId = requestAnimationFrame(drawFrame);
    } else {
      cancelConfetti();
    }
  }

  animationFrameId = requestAnimationFrame(drawFrame);
}

function focusStepHeading() {
  steps[currentStep].querySelector("h2").focus();
}

function showStep(index, { focus = true } = {}) {
  currentStep = Math.max(0, Math.min(index, steps.length - 1));

  steps.forEach((step, stepIndex) => {
    step.hidden = stepIndex !== currentStep;
  });

  backButton.hidden = currentStep === 0;
  nextButton.textContent = currentStep === steps.length - 1 ? "Verify identity" : "Next";

  if (focus) {
    focusStepHeading();
  }
}

function setFieldError(control, error, invalid) {
  error.hidden = !invalid;
  control.setAttribute("aria-invalid", String(invalid));
}

function clearReactionError() {
  const controls = [...form.elements.reaction];
  const error = document.querySelector("#reactionError");
  error.hidden = true;
  controls.forEach((control) => control.removeAttribute("aria-invalid"));
}

function validateCurrentStep() {
  if (currentStep === 0) {
    const control = form.elements.firstName;
    const error = document.querySelector("#firstNameError");
    const invalid = control.value.trim() === "";
    setFieldError(control, error, invalid);
    if (invalid) control.focus();
    return !invalid;
  }

  if (currentStep === 1) {
    const control = form.elements.age;
    const error = document.querySelector("#ageError");
    const invalid = control.value === "";
    setFieldError(control, error, invalid);
    if (invalid) control.focus();
    return !invalid;
  }

  if (currentStep === 2) {
    const controls = [...form.elements.reaction];
    const error = document.querySelector("#reactionError");
    const selected = controls.find((control) => control.checked);
    const invalid = !selected;
    error.hidden = !invalid;
    controls.forEach((control) => {
      if (invalid) {
        control.setAttribute("aria-invalid", "true");
      } else {
        control.removeAttribute("aria-invalid");
      }
    });
    if (invalid) controls[0].focus();
    return !invalid;
  }

  return true;
}

function collectAttempt() {
  const data = new FormData(form);
  return {
    firstName: String(data.get("firstName") ?? ""),
    age: String(data.get("age") ?? ""),
    reaction: String(data.get("reaction") ?? ""),
    traits: data.getAll("traits").map(String),
    oath: data.getAll("oath").map(String),
  };
}

function showResult(verified) {
  const result = verified ? verifiedResult : rejectedResult;
  quizPage.hidden = true;
  verifiedResult.hidden = !verified;
  rejectedResult.hidden = verified;
  if (verified) {
    startConfetti();
  } else {
    cancelConfetti();
  }
  result.querySelector("h2").focus();
}

function clearAllErrors() {
  setFieldError(
    form.elements.firstName,
    document.querySelector("#firstNameError"),
    false,
  );
  setFieldError(form.elements.age, document.querySelector("#ageError"), false);
  clearReactionError();
}

function resetQuiz() {
  cancelConfetti();
  form.reset();
  clearAllErrors();
  verifiedResult.hidden = true;
  rejectedResult.hidden = true;
  quizPage.hidden = false;
  showStep(0);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (currentStep < steps.length - 1) {
    if (validateCurrentStep()) {
      showStep(currentStep + 1);
    }
    return;
  }

  showResult(isEric(collectAttempt()));
});

form.addEventListener("keydown", (event) => {
  if (
    event.key === "Enter" &&
    !(event.target instanceof HTMLButtonElement) &&
    !(event.target instanceof HTMLTextAreaElement)
  ) {
    event.preventDefault();
    form.requestSubmit(nextButton);
  }
});

backButton.addEventListener("click", () => {
  if (currentStep > 0) {
    showStep(currentStep - 1);
  }
});

exitQuizButton.addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }

  window.location.assign("./index.html");
});

form.elements.firstName.addEventListener("input", () => {
  if (form.elements.firstName.value.trim()) {
    setFieldError(
      form.elements.firstName,
      document.querySelector("#firstNameError"),
      false,
    );
  }
});

form.elements.age.addEventListener("change", () => {
  if (form.elements.age.value) {
    setFieldError(form.elements.age, document.querySelector("#ageError"), false);
  }
});

[...form.elements.reaction].forEach((control) => {
  control.addEventListener("change", clearReactionError);
});

tryAgainButton.addEventListener("click", resetQuiz);

window.addEventListener("resize", () => {
  if (confettiActive) resizeConfettiCanvas();
});

reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) cancelConfetti();
});

showStep(0, { focus: false });
