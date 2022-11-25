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
      image(anyImage, this.x, this.y, this.buttonW/0.3, this.buttonH/0.3);
    }
    else {
      image(anyImage, this.x, this.y, this.buttonW, this.buttonH);
    }
  }

  isInside(x, y) {
    let leftSide = this.x;
    let rightSide = this.x + this.buttonW;
    let topSide = this.y;
    let bottomSide = this.y + this.buttonH;

    return x > leftSide && x < rightSide && y > topSide && y < bottomSide;
  }

}


let gameState = "startingScreen";
let thePlayButton;
let playButton;

function preload() {
  thePlayButton = loadImage("sprites/play_button.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  playButton = new Buttons(windowWidth/2, windowHeight/2, 480, 190);
}

function draw() {
  background(0);
  if (gameState === "startingScreen") {
    startScreen();
  }
}



function startScreen() {
  playButton.display(thePlayButton);


}
