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

class Bullets {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  display() {
    fill("blue");
    circle(this.x, this.y, 30);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
    bulletX = this.x;
    bulletY = this.y;
    
  }

  isDead() {
    return this.x > width || this.x < 0 || this.y > height || this.y < 0;
  }

  hit() {
    return bulletX === startX+x && bulletY === startY+y; 

  }
}

let gameState = "startingScreen";
let attackState = "none";
let bulletState = "none";
let playButton;
let htpButton;
let backButton;
let pixelFont;
let textArray;
let spriteArray;
let hit = false;
let pos;
let hp = 100;
let bullets = [];
let i = 0;
let j = 0;
let x = 0;
let bulletX;
let bulletY;
let y = 0;
let bulletShoot = true;
let startX;
let k = 0;
let startY;
let bulletPosX;
let bulletPosY;
let position = "top";
let positionArray = ["top", "right", "bottom", "left"];
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
  pos = windowHeight/2 +200;
  bulletPosX = width/2;
  bulletPosY = 0;
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
  if (gameState === "fadeOut") {
    fadeOut();
  }
}

function startScreen() { 
  playButton = new Buttons(windowWidth/2, windowHeight/2, 350, 130);
  playButton.display("PLAY", 90, 15, 5);
  if (mouseIsPressed === true && playButton.isInside(mouseX, mouseY)) {
    gameState = "gameBegins";
    // gameState = "startBattle";
    // attackState = "bullets";
    // bulletState = "top";
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
  createTextbox(width*0.7, height+300);
  fill(255);
  textSize(70);
  strokeWeight(4);
  text("HOW TO PLAY", width/2, pos- height*0.5 -80);
  displayCursor();
}

function createTextbox(boxW, boxH) {
  if (gameState === "gameBegins") {
    textAlign(LEFT, BASELINE);
    fill(0);
    stroke(255);
    strokeWeight(10);
    rect(windowWidth/2, windowHeight - boxH, boxW, boxH);
    textFont(pixelFont);
    textSize(30);
    fill(255);
    strokeWeight(0.5);
    text(textArray[i][j], width/2 - boxW/2 + 10*1.4, height - boxH - boxH/2 + 30*1.2);
  }
  if (gameState === "howToPlay") {
    textAlign(CENTER);
    fill(0);
    stroke(255);
    strokeWeight(30);
    rect(windowWidth/2, pos, boxW, boxH);
  }
}

function mouseWheel(event) {
  print(event.delta);
  pos -= event.delta;
}

function displayAdiaStory(x, y, width, height) { // 0 = neutral, 1 = neutral talking, 2 = eyes closed talking, 3 = eyes closed neutral, 4 = happy talking
  if (spriteArray[i][j] === 0) {
    image(adia.neutral, x, y, width, height);
  }
  if (spriteArray[i][j] === 1) {
    image(adia.neutralTalking, x, y, width, height);
  }
  if (spriteArray[i][j] === 2) {
    image(adia.ecTalking, x, y, width, height);
  }
  if (spriteArray[i][j] === 3) {
    image(adia.ecNeutral, x, y, width, height);
  }
  if (spriteArray[i][j] === 4) {
    image(adia.happyTalking, x, y, width, height);
  }

}

function displayAdiaBattle(x, y, width, height, num) {
  if (num === 0) {
    image(adia.neutral, x, y, width, height);
  }
  if (num === 1) {
    image(adia.neutralTalking, x, y, width, height);
  }
  if (num === 2) {
    image(adia.ecTalking, x, y, width, height);
  }
  if (num === 3) {
    image(adia.ecNeutral, x, y, width, height);
  }
  if (num === 4) {
    image(adia.happyTalking, x, y, width, height);
  }
  
}

function startGame() {
  
  noCursor();
  displayAdiaStory(width/2, height/2+height/5, 305.45, 1050); 
  fill(0);
  noStroke();
  rect(width/2, height, width, height/4);
  createTextbox(600, 200);
  
  
}

function mousePressed() {
  if (gameState === "gameBegins") {
    if (j === Object.keys(textArray[i]).length && j === Object.keys(spriteArray[i]).length) {
      
      i= i+1;
      j = 0;
    }
    else {
      j++;
    }
    if (textArray[i][j] === "END") {
      
      //gameState = "fadeOut";
      gameState = "startBattle";     
    }   
  }
  if (gameState === "startBattle") {
    i = i+1;
    attackState = "bullets";

  }
}

function battle() { 
  console.log(hit);
  //displayAdiaBattle(width/4, height/2, 153, 525, 0);
  noCursor();
  fill(0);
  stroke(255);
  strokeWeight(9);
  rect(width/2, height/2, width/3, width/3);
  playerMove();
  displayBullets();
  if (attackState === "bullets") {
    bulletAttack();
  }
  if (attackState === "lazers") {
    lazerAttack();
  }
  if (attackState === "text") {
    //createTextbox();
  }
  

}

function displayCursor() {
  // placeholder 
  fill("blue");
  noStroke();
  circle(mouseX, mouseY, 15);
}

function keyPressed() {
  if (keyCode === 70) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
  if (keyCode === 32) {
    if (gameState === "gameBegins") {
      if (j === Object.keys(textArray[i]).length && j === Object.keys(spriteArray[i]).length) {
        i= i+1;
        j = 0;
      }
      else {
        j++;
      }
      if (textArray[i][j] === "END") {
        gameState = "startBattle"; 
        //fadeOut();    
      }   
    }
    if (gameState === "startBattle") {
      i = i+1;
      attackState = "bullets";
      bulletState = "top";
  
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  startX = windowWidth/2;
  startY = windowHeight/2;
}


function bulletAttack() {
  if (gameState === "startBattle") {
    if (k === 0) {
      position = "top";
    }
    if (k === 1) {
      position = "right";
    }
    if (k === 2) {
      position = "bottom";
    }
    if (k === 3) {
      position = "left";
    }

       
    if (position === "top") {
      let topBullet = new Bullets(bulletPosX, bulletPosY, random(-6, 6), random(2, 6));
      if (bullets.length < 50 && bulletShoot === true) {
        bulletShoot = true;
        bullets.push(topBullet);
      }
      hit = collideCircleCircle(startX + x, startY + y, 20, bulletX, bulletY, 30);
      if (bullets.length === 50 && bulletShoot === true) {
        bulletShoot = false;
        k++;
      }
      if (bullets.length === 0 && bulletShoot ===false) {
        bulletShoot = true;
      }
    }
    if (position === "right") {
      // bulletState = "right";
      bulletPosX = width;
      bulletPosY = height/2;
      let rightBullet = new Bullets(bulletPosX, bulletPosY, random(-5, -6), random(-5, 5));
      if (bullets.length < 50 && bulletShoot === true) {
        bullets.push(rightBullet);
      }
      if (bullets.length === 50 && bulletShoot === true) {
        bulletShoot = false;
        k++;
      }
      if (bullets.length === 0 && bulletShoot ===false) {
        bulletShoot = true;
      }
    }
    if (position === "bottom") {
      // bulletState = "right";
      bulletPosX = width/2;
      bulletPosY = height;
      let bottomBullet = new Bullets(bulletPosX, bulletPosY, random(-6, 6), random(-6, -2));
      if (bullets.length < 50 && bulletShoot === true) {
        bullets.push(bottomBullet);
      }
      if (bullets.length === 50 && bulletShoot === true) {
        bulletShoot = false;
        k++;
      }
      if (bullets.length === 0 && bulletShoot ===false) {
        bulletShoot = true;
      }
    }
    if (position === "left") {
      // bulletState = "right";
      bulletPosX = 0;
      bulletPosY = height/2;
      let leftBullet = new Bullets(bulletPosX, bulletPosY, random(5, 6), random(-5, 5));
      if (bullets.length < 50 && bulletShoot === true) {
        bullets.push(leftBullet);
      }
      if (bullets.length === 50 && bulletShoot === true) {
        bulletShoot = false;
        attackState = "text";
      }
      if (bullets.length === 0 && bulletShoot ===false) {
        bulletShoot = true;
      }
    }
  }  
}

function displayBullets() {
  for(let topBullet of bullets) {    
    topBullet.display();
    topBullet.move();
  }
  for(let rightBullet of bullets) {    
    rightBullet.display();
    rightBullet.move(); 
  }
  for(let bottomBullet of bullets) {    
    bottomBullet.display();
    bottomBullet.move(); 
  } 
  for(let leftBullet of bullets) {    
    leftBullet.display();
    leftBullet.move(); 
  } 
  for (let i = bullets.length-1; i >=0; i--) {
    if (bullets[i].isDead()) {
      bullets.splice(i,1);
    }
  }
  
}

function lazerAttack() {

}


function playerMove() {
  let edge = 19;
  let speed = 9; 
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

function fadeOut() {
  
  noStroke();
  
  for (let a = 255; a > 0; a--) {
    if (a < 255) {
      rect(width/2, height/2, width, height);
      fill(0,0,0,a);
    }

    if (a === 0) {
      gameState = "startBattle";
    }
    
  }





}

