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
let playButton;
let htpButton;
let backButton;
let pixelFont;
let textArray;
let spriteArray;
let i = 0;
let j = 0;
let x = 0;
let y = 0;
let startX;
let startY;
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
  startX = windowWidth/2;
  startY = windowHeight/2;
  noCursor();
}

function draw() {
  background(0);

  if (gameState === "startingScreen") {
    startScreen();
  }
  if (gameState === "howToPlay") {
    howToPlay();
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
  htpButton = new Buttons(windowWidth/2, windowHeight/2 + 130, 250, 75);
  htpButton.display("HOW TO PLAY", 30, 10, 1.5);
  if (mouseIsPressed === true && htpButton.isInside(mouseX, mouseY)) {
    gameState = "howToPlay";
  }
  displayCursor();
}

function howToPlay() {
  backButton = new Buttons(windowWidth/15, windowHeight/10, 150, 75);
  backButton.display("BACK", 40, 10, 2);
  if (mouseIsPressed === true && backButton.isInside(mouseX, mouseY)) {
    gameState = "startingScreen";
  }
  displayCursor();

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
  circle(startX + x, startY + y, 20);
  if (startY+y > height/2 - width/3/2 + edge) {
    if (keyIsDown(87)) {
      y -= speed;
    }
  }
  if (startY+y < height/2 + width/3/2 - edge) {
    if (keyIsDown(83)) {
      y += speed;
    }
  }
  if (startX+x > width/3 + edge) {
    if (keyIsDown(65)) {
      x -= speed;
    }
  }
  if (startX+x < width/3*2 - edge) {
    if (keyIsDown(68)) {
      x += speed;
    }
  }

}

function displayCursor() {
  fill("red");
  noStroke();
  circle(mouseX, mouseY, 15);
}

function keyPressed() {
  if (keyCode === 70) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  startX = windowWidth/2;
  startY = windowHeight/2;
}





