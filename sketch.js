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

  display(word, size, strokeA, strokeB) {
    if (this.isInside(mouseX, mouseY)) {
      fill(0);
      rectMode(CENTER);
      stroke(255);
      strokeWeight(strokeA);
      rect(this.x, this.y, this.buttonW*1.1, this.buttonH*1.1); 
      textSize(size*1.1);
      textFont(pixelFont);
      fill(255);  
      strokeWeight(strokeB);
      textAlign(CENTER, CENTER);
      text(word, this.x + strokeB, this.y - strokeB);
    }
    else {
      fill(0);
      rectMode(CENTER);
      stroke(255);
      strokeWeight(strokeA);
      rect(this.x, this.y, this.buttonW, this.buttonH);
      textSize(size);
      textFont(pixelFont);
      fill(255);
      strokeWeight(strokeB);
      textAlign(CENTER, CENTER);
      text(word, this.x + strokeB, this.y - strokeB);
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
let optButtonImg;
let optButton;
let textboxImg;
let pixelFont;
let textArray = [];
let i = 0;

function preload() {
  pixelFont = loadFont("assets/font.ttf");
  playButtonImg = loadImage("sprites/play_button.png");
  optButtonImg = loadImage("sprites/opt_button.png");
  textboxImg = loadImage("sprites/textbox.png");
  textArray = loadJSON("text.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER); 
  rectMode(CENTER);
}

function draw() {
  background(0);
  if (gameState === "startingScreen") {
    startScreen();
  }
  else if (gameState === "options") {
    optionsScreen();
  }
  else if (gameState === "gameBegins") {
    startGame();
  }
}

function startScreen() {
  playButton = new Buttons(windowWidth/2, windowHeight/2, 350, 130);
  playButton.display("PLAY", 90, 15, 5);
  if (mouseIsPressed === true && playButton.isInside(mouseX, mouseY)) {
    gameState = "gameBegins";
  }
  optButton = new Buttons(windowWidth/2, windowHeight/2 + 130, 250, 75);
  optButton.display("OPTIONS", 40, 10, 1);
  if (mouseIsPressed === true && optButton.isInside(mouseX, mouseY)) {
    gameState = "options";
  }
  

}

function optionsScreen() {

}

function createTextbox(words, boxW, boxH) {
  textAlign(LEFT, BASELINE);
  fill(0);
  stroke(255);
  strokeWeight(10);
  rect(width/2, height - boxH, boxW, boxH);
  textFont(pixelFont);
  textSize(30);
  fill(255);
  strokeWeight(0.5);
  text(words, width/2 - boxW/2 + 10*1.4, height - boxH - boxH/2 + 30*1.2);
}

function startGame() {
  createTextbox(textArray[i], 600, 200); 
}

function mousePressed() {
  if (gameState === "gameBegins") {
    i++;
  }
}

