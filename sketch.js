// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Buttons {
  constructor(x, y, buttonW, buttonH) {
    this.x = x;
    this.y = y;
    this.buttonW = buttonW;
    this.buttonH = buttonH;
  }

  display(anyImage) {
    if (this.isInside(mouseX, mouseY)) {
      image(anyImage, this.x, this.y, this.buttonW*1.1, this.buttonH*1.1);
    }
    else {
      image(anyImage, this.x, this.y, this.buttonW, this.buttonH);
    }
  }

  isInside(x, y) {
    let leftSide = this.x - this.buttonW/2;
    let rightSide = this.x + this.buttonW/2;
    let topSide = this.y - this.buttonH/2;
    let bottomSide = this.y + this.buttonH/2;
    return x > leftSide && x < rightSide && y > topSide && y < bottomSide;
  }
}

let gameState = "startingScreen";
let playButtonImg;
let playButton;

function preload() {
  playButtonImg = loadImage("sprites/play_button.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(0);
  if (gameState === "startingScreen") {
    startScreen();
  }
}

function startScreen() {
  playButton = new Buttons(windowWidth/2, windowHeight/2, 350, 130);
  playButton.display(playButtonImg);
  if (mouseIsPressed === true && playButton.isInside(mouseX, mouseY)) {
    gameState = "charSelect";
  }
}

