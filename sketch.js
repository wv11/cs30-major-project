// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



class Buttons {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  display(anyImage) {
    if (this.isInside(mouseX, mouseY)) {
      image(anyImage, this.x, this.y, this.width/0.3, this.height/0.3);
    }
    else {
      image(anyImage, this.x, this.y, this.width, this.height);
    }
  }

  isInside(x, y) {
    let leftSide = this.x;
    let rightSide = this.x + this.width;
    let topSide = this.y;
    let bottomSide = this.y + this.height;

    return x > leftSide && x < rightSide && y > topSide && y < bottomSide;
  }

}

let playButton = new Buttons(width/2, height/2, 480, 190);
let gameState = "startingScreen";
let thePlayButton;

function preload() {
  thePlayButton = loadImage("sprites/play_button.png");

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

function mouseOverButton(left, right, top, bottom) {

}

function startScreen() {

  if (gameState === "startingScreen") {
    playButton.display(thePlayButton);

  }


}
