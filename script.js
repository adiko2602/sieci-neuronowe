const net = new brain.NeuralNetwork();

const data = [
  {
    input: {
      r: 0,
      g: 0,
      b: 0,
    },
    output: [1],
  },
  {
    input: {
      r: 1,
      g: 1,
      b: 1,
    },
    output: [0],
  },
];

const step = document.getElementById("step");
const colorElement = document.getElementById("color");
const whiteText = document.getElementById("white-text");
const blackText = document.getElementById("black-text");
const guessText = document.getElementById("guess-text");
const buttons = document.getElementById("buttons");
const whiteButton = document.getElementById("white-button");
const blackButton = document.getElementById("black-button");
const guessButton = document.getElementById("guess-button");
const guessProcent = document.getElementById("guess-procent");

let color;
let learn = 20;

step.innerHTML = `Pozostało ${learn} kroków`;
guessButton.style.display = "none";
guessText.style.display = "none";

whiteButton.addEventListener("click", () => {
  chooseColorByUser(1);
});

blackButton.addEventListener("click", () => {
  chooseColorByUser(0);
});

guessButton.addEventListener("click", guessTextColor);

setRandomColor();

function chooseColorByUser(value) {
  if (learn > 1) {
    data.push({
      input: color,
      output: [value],
    });
    learn--;
    setRandomColor();
    step.innerHTML = `Pozostało ${learn} kroków`;
    return;
  }

  whiteButton.style.display = "none";
  blackButton.style.display = "none";
  whiteText.style.display = "none";
  blackText.style.display = "none";
  step.style.display = "none";

  guessButton.style.display = "";
  guessText.style.display = "";

  net.train(data);
  guessTextColor();
}

function setRandomColor() {
  color = {
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
  };
  colorElement.style.backgroundColor = `rgba(${color.r * 255}, ${
    color.g * 255
  }, ${color.b * 255})`;
}

function guessTextColor() {
  setRandomColor();
  const guess = net.run(color)[0];
  guessText.style.color = guess > 0.5 ? "#fff" : "#000";
  guessProcent.innerHTML = `${parseInt(guess * 100)}% kolor biały<br />${
    100 - parseInt(guess * 100)
  }% kolor czarny`;
}
