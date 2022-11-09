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

const colorElement = document.getElementById("color");
const guessText = document.getElementById("guess-text");
const buttons = document.getElementById("buttons");
const whiteButton = document.getElementById("white-button");
const blackButton = document.getElementById("black-button");
const guessButton = document.getElementById("guess-button");
const guessProcent = document.getElementById("guess-procent");

let color;
let learn = 0;

guessButton.style.display = "none";

whiteButton.addEventListener("click", () => {
  chooseColor(1);
});

blackButton.addEventListener("click", () => {
  chooseColor(0);
});

guessButton.addEventListener("click", setRandomColor);

net.train(data);
setRandomColor();

function chooseColor(value) {
  if (learn < 20) {
    data.push({
      input: color,
      output: [value],
    });
    learn++;
    net.train(data);
    setRandomColor();
    return;
  }

  whiteButton.style.display = "none";
  blackButton.style.display = "none";
  guessButton.style.display = "";
  setRandomColor();
}

function setRandomColor() {
  color = {
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
  };

  const guess = net.run(color)[0];
  guessText.style.color = guess > 0.5 ? "#fff" : "#000";
  guessProcent.innerHTML = `${parseInt(guess * 100)}% kolor biały`;
  colorElement.style.backgroundColor = `rgba(${color.r * 255}, ${
    color.g * 255
  }, ${color.b * 255})`;
}
