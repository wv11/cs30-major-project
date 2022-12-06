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
let textArray;
let spriteArray;
let i = 0;
let j = 0;
let x;
let y;
let adia = {
};


function preload() {
  pixelFont = loadFont("assets/font.ttf");
  textArray = loadJSON("text.json");
  spriteArray = loadJSON("sprite.json");
  adia.neutral = loadImage("sprites/adia/neutral.png");
  adia.neutralTalking = loadImage("sprites/adia/neutral_talking.png");
  adia.ecTalking = loadImage("sprites/adia/eyesClosed_talking.png");
  adia.ecNeutral = loadImage("sprites/adia/eyesClosed_neutral.png");
  adia.happyTalking = loadImage("sprites/adia/happy_talking.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER); 
  rectMode(CENTER);
  ellipseMode(CENTER);
  x = windowWidth/2;
  y = windowHeight/2;
  cursor(ARROW);

}

function draw() {
  background(0);
  if (gameState === "startingScreen") {
    startScreen();
  }
  if (gameState === "options") {
    optionsScreen();
  }
  if (gameState === "gameBegins") {
    startGame();
  }
  if (gameState === "startBattle") {
    battle();
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

function createTextbox(boxW, boxH) {
  textAlign(LEFT, BASELINE);
  fill(0);
  stroke(255);
  strokeWeight(10);
  rect(width/2, height - boxH, boxW, boxH);
  textFont(pixelFont);
  textSize(30);
  fill(255);
  strokeWeight(0.5);
  text(textArray[i][j], width/2 - boxW/2 + 10*1.4, height - boxH - boxH/2 + 30*1.2);
}

function displayAdia() { // 0 = neutral, 1 = neutral talking, 2 = eyes closed talking, 3 = eyes closed neutral, 4 = happy talking
  if (spriteArray[i][j] === 0) {
    image(adia.neutral, width/2, height/2+height/5, 305.45, 1050);
  }
  if (spriteArray[i][j] === 1) {
    image(adia.neutralTalking, width/2, height/2+height/5, 305.45, 1050);
  }
  if (spriteArray[i][j] === 2) {
    image(adia.ecTalking, width/2, height/2+height/5, 305.45, 1050);
  }
  if (spriteArray[i][j] === 3) {
    image(adia.ecNeutral, width/2, height/2+height/5, 305.45, 1050);
  }
  if (spriteArray[i][j] === 4) {
    image(adia.happyTalking, width/2, height/2+height/5, 305.45, 1050);
  }

}

function startGame() {
  noCursor();
  displayAdia(); 
  fill(0);
  noStroke();
  rect(width/2, height, width, height/4);
  createTextbox(600, 200);
}

function mousePressed() {
  if (gameState === "gameBegins") {
    if (j === textArray[i].length - 1 || j === spriteArray[i].length - 1) {
      i= i+1;
      j = 0;
    }
    else {
      j++;
    }
    if (i === Object.keys(textArray).length) {
      gameState = "startBattle";
      
    }   
  }
}

function battle() {
  noCursor();
  let edge = 19;
  let speed = 10;
  fill(0);
  stroke(255);
  strokeWeight(9);
  rect(width/2, height/2, width/3, width/3);
  noStroke();
  fill(255);
  circle(x, y, 20);
  if (y > height/2 - width/3/2 + edge) {
    if (keyIsDown(87)) {
      y -= speed;
    }
  }
  if (y < height/2 + width/3/2 - edge) {
    if (keyIsDown(83)) {
      y += speed;
    }
  }
  if (x > width/3 + edge) {
    if (keyIsDown(65)) {
      x -= speed;
    }
  }
  if (x < width/3*2 - edge) {
    if (keyIsDown(68)) {
      x += speed;
    }
  }
}

function displayCursor() {
  circle(mouseX, mouseY, 20);
}


