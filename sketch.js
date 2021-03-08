var monkey, monkeyAnimation;
var obstacle, obstacleImage;
var ground, groundImage;
var banana, bananaImage;
var bananaGroup, obstacleGroup;
var infiniteMode, infiniteModeImage; 
var attackMode, attackModeImage; 
var timedGame, timedGameImage; 
var spaceBar, spaceBarImage; 
var batterylife, batterylifeImage; 
var battery1, battery1Image;
var battery2, battery2Image
var batteryFull, batteryFullImage;
var batteryEmpty, batteryEmptyImage;  
var INFINITE = 0;
var STONEATTACK = 1; 
var HOME = 2; 
var STONEATTACKOVER = 3; 
var THREESTRIKES = 4;
var BATTERY = 5; 
var TIMERINTRODUCTION = 6;
var TIMER = 7;
var gameState = HOME; 
var homeMonkey, homeMonkeyAnimation;
var score;
var timer1;
var timer2;
var threestones, threestonesImage;
var obstacleHit;

function preload(){
  monkeyAnimation = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  obstacleImage = loadImage("stone.png");
  groundImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  spaceBarImage = loadImage("spacebar.png");
  infiniteModeImage = loadImage("InfiniteMode.png");
  attackModeImage = loadImage("StoneAttack.png");
  threestonesImage = loadImage("3stones.png");
  batterylifeImage = loadImage("BatteryLifeline.png");
  battery1Image = loadImage("Battery1.png");
  battery2Image = loadImage("Battery2.png");
  batteryEmptyImage = loadImage("BatteryEmpty.png");
  batteryFullImage = loadImage("BatteryFull.png");
  timedGameImage = loadImage("timedGame.png");
  homeMonkeyAnimation = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
}

function setup() {
  createCanvas(450, 450);
  
  ground = createSprite(200,180,400,20);
  ground.scale = 0.55;
  ground.addImage(groundImage);
  ground.visible = false;
  
  monkey = createSprite(100,320,20,50);
  monkey.addAnimation("monkey", monkeyAnimation);
  monkey.scale = 0.08;
  monkey.visible = false;
  monkey.setCollider("circle",20,20,60);

  homeMonkey = createSprite(100,423,20,50);
  homeMonkey.addAnimation("homepage",homeMonkeyAnimation);
  homeMonkey.scale = 0.1;
  homeMonkey.visible = false;

  battery1 = createSprite(200,435,50,50);
  battery1.addImage(battery1Image);
  battery1.scale = 0.2;
  battery1.visible = false; 

  battery2 = createSprite(200,435,50,50);
  battery2.addImage(battery2Image);
  battery2.scale = 0.2;
  battery2.visible = false; 

  batteryEmpty = createSprite(300,427.5,50,50);
  batteryEmpty.addImage(batteryEmptyImage);
  batteryEmpty.scale = 0.2;
  batteryEmpty.visible = false; 

  batteryFull = createSprite(200,435,50,50);
  batteryFull.addImage(batteryFullImage);
  batteryFull.scale = 0.2;
  batteryFull.visible = false; 

  threestones = createSprite(300,200,100,50);
  threestones.addImage(threestonesImage);
  threestones.scale = 0.2; 
  threestones.visible = false;

  spaceBar = createSprite(400,425,150,25);
  spaceBar.addImage(spaceBarImage);
  spaceBar.scale = 0.2;
  spaceBar.visible = false; 
  
  infiniteMode = createSprite(150, 200, 100,50);
  infiniteMode.scale = 0.2;
  infiniteMode.addImage(infiniteModeImage);
  infiniteMode.visible = false; 
  

  attackMode = createSprite(150,300,100,50);
  attackMode.addImage(attackModeImage);
  attackMode.scale = 0.2;
  attackMode.visible = false;

  batterylife = createSprite(300,300,100,50);
  batterylife.addImage(batterylifeImage);
  batterylife.scale = 0.2; 
  batterylife.visible = false; 

  timedGame = createSprite(300,400,100,50);
  timedGame.addImage(timedGameImage);
  timedGame.scale = 0.2; 
  timedGame.visible = false; 

  invisibleGround = createSprite(200,345 ,400,10);
  invisibleGround.visible = false; 
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  monkeyGroup = new Group();
  
  score = 0;
  obstacleHit = 0;
  timer1 = 6; 
  timer2 = 181; 
  

}

function draw() {
  background(220);
  
  if(gameState === HOME){
    background(174,229,224);

    stroke("black");
    textSize(30);
    fill("black");
    text("GrowMonkeyGrow",100,50);

    stroke("white");
    textSize(10);
    fill("white");
    textFont("Calibri");
    text("CREATED BY CODINGWITHVB",250,75);

    attackMode.visible = true; 
    infiniteMode.visible = true; 
    homeMonkey.visible = true;
    threestones.visible = true;
    batterylife.visible = true;
    timedGame.visible = true;

    monkey.visible = false;
    ground.visible = false; 
    spaceBar.visible = false; 

    score = 0;
    timer1 = 6;
    timer2 = 181;
    obstacleHit = 0;

  obstacleGroup.setLifetimeEach(0);
  bananaGroup.setLifetimeEach(0);

    monkey.collide(invisibleGround);

    if(mousePressedOver(infiniteMode)){
      gameState = INFINITE;
    }
    if(mousePressedOver(attackMode)){
      gameState = STONEATTACK;
    }
    if(mousePressedOver(threestones)){
      gameState = THREESTRIKES;
    }
    if(mousePressedOver(batterylife)){
      gameState = BATTERY;
    }
    if(mousePressedOver(timedGame)){
      gameState = TIMERINTRODUCTION; 
    }
  }

  if(gameState === INFINITE){
    background(220);

    attackMode.visible = false;
    infiniteMode.visible = false; 
    homeMonkey.visible = false; 
    threestones.visible = false;
    batterylife.visible = false; 

    monkey.visible = true; 
    ground.visible = true;
    spaceBar.visible = true;

    spawnFood();
  spawnObstacles();

    if(keyDown("space")&& monkey.y >= 310 ) {
      monkey.velocityY = -15;
    }
  
    if(mousePressedOver(spaceBar) && monkey.y >= 310){
      monkey.velocityY = -15;
    }

    if(keyDown("h")){
      gameState = HOME; 
    }

    if(keyDown("s")){
      gameState = STONEATTACK;
    }

    monkey.velocityY = monkey.velocityY + 0.8 
  
    monkey.collide(invisibleGround);
    
   if(bananaGroup.isTouching(monkey)){
     score = score + 2;
     bananaGroup.destroyEach();
   }

   if(obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.08;
    score = 0;
  }

  switch(score){
    case 10: monkey.scale = 0.09;
    break;  
    case 20: monkey.scale = 0.1;
    break;
    case 30: monkey.scale = 0.11;
    break;
    case 40: monkey.scale = 0.12;
    break;
    case 50: monkey.scale = 0.13;
    break;
    default: break;
}
stroke("black");
textSize(20);
fill("black");
text("Score:"+ score, 10,435);

stroke("black");
textSize(15);
fill("brown")
text("GrowMonkeyGrow: Infinite", 115,420);
  }

  if(gameState === STONEATTACK){
    background(220);
  
    attackMode.visible = false;
    infiniteMode.visible = false; 
    homeMonkey.visible = false;
    threestones.visible = false;
    batterylife.visible = false; 

    monkey.visible = true; 
    ground.visible = true;
    spaceBar.visible = true;

    spawnFood();
  spawnObstacles();

  stroke("black");
  textSize(20);
  fill("black");
  text("Score:"+ score, 10,435);

  stroke("black");
  textSize(15);
  fill("brown")
  text("GrowMonkeyGrow: Stone Attack", 115,420);


    if(keyDown("space")&& monkey.y >= 310 ) {
      monkey.velocityY = -15;
    }
  
    if(mousePressedOver(spaceBar) && monkey.y >= 310){
      monkey.velocityY = -15;
    }

    monkey.velocityY = monkey.velocityY + 0.8 
  
    monkey.collide(invisibleGround);
    
   if(bananaGroup.isTouching(monkey)){
     score = score + 2;
     bananaGroup.destroyEach();
   }

   if(obstacleGroup.isTouching(monkey)){
    gameState = STONEATTACKOVER;
   }

  switch(score){
    case 10: monkey.scale = 0.09;
    break;  
    case 20: monkey.scale = 0.1;
    break;
    case 30: monkey.scale = 0.11;
    break;
    case 40: monkey.scale = 0.12;
    break;
    case 50: monkey.scale = 0.13;
    break;
    default: break;  
}

  }
  if(gameState === THREESTRIKES){
    background(220);
  
    attackMode.visible = false;
    infiniteMode.visible = false; 
    homeMonkey.visible = false;
    threestones.visible = false;
    batterylife.visible = false;
    
    monkey.visible = true; 
    ground.visible = true;
    spaceBar.visible = true;

    spawnFood();
  spawnObstacles();

  stroke("black");
  textSize(20);
  fill("black");
  text("Score:"+ score, 10,435);

  stroke("black");
  textSize(12.5);
  fill("brown")
  text("GrowMonkeyGrow: 3 Stones And You're Out!", 100,420);


    if(keyDown("space")&& monkey.y >= 310 ) {
      monkey.velocityY = -15;
    }
  
    if(mousePressedOver(spaceBar) && monkey.y >= 310){
      monkey.velocityY = -15;
    }

    monkey.velocityY = monkey.velocityY + 0.8 
  
    monkey.collide(invisibleGround);
    
   if(bananaGroup.isTouching(monkey)){
     score = score + 2;
     bananaGroup.destroyEach();
   }

   console.log(obstacleHit);

   if(obstacleGroup.isTouching(monkey)){
    obstacleHit = obstacleHit + 1; 
   }

   if(obstacleHit <= 15 && obstacleHit > 1){
     text("Hit:1", 170,435);
   }

   if(obstacleHit >= 16){
     text("Hit:2",170,435);
   }


    if(obstacleHit <= 42 && obstacleHit > 30){
     obstacleHit = 0;
     gameState = STONEATTACKOVER;
   } 

  switch(score){
    case 10: monkey.scale = 0.09;
    break;  
    case 20: monkey.scale = 0.1;
    break;
    case 30: monkey.scale = 0.11;
    break;
    case 40: monkey.scale = 0.12;
    break;
    case 50: monkey.scale = 0.13;
    break;
    default: break;  
}
  }

  if(gameState === BATTERY){

    attackMode.visible = false;
    infiniteMode.visible = false; 
    homeMonkey.visible = false;
    threestones.visible = false;
    batterylife.visible = false;

    monkey.visible = true; 
    ground.visible = true;
    spaceBar.visible = true;
    batteryFull.visible = true;

    spawnFood();
  spawnObstacles();

  stroke("black");
  textSize(20);
  fill("black");
  text("Score:"+ score, 10,435);

  stroke("black");
  textSize(12.5);
  fill("brown")
  text("GrowMonkeyGrow: Battery Lifeline!", 100,420);


    if(keyDown("space")&& monkey.y >= 310 ) {
      monkey.velocityY = -15;
    }
  
    if(mousePressedOver(spaceBar) && monkey.y >= 310){
      monkey.velocityY = -15;
    }

    monkey.velocityY = monkey.velocityY + 0.8 
  
    monkey.collide(invisibleGround);
    
   if(bananaGroup.isTouching(monkey)){
     score = score + 2;
     bananaGroup.destroyEach();
   }

   if(obstacleGroup.isTouching(monkey)){
    obstacleHit = obstacleHit + 1; 
   }

   console.log(obstacleHit);

   if(obstacleHit <= 15 && obstacleHit > 1){
     battery1.visible = true; 
     batteryFull.visible = false; 
   }

   if(obstacleHit >= 16){
     battery2.visible = true; 
     battery1.visible = false; 
     batteryFull.visible = false; 
   }


    if(obstacleHit <= 42 && obstacleHit > 31){
     obstacleHit = 0;

     batteryFull.visible = false; 
     battery1.visible = false; 
     battery2.visible = false; 
     batteryEmpty.visible = true; 

     gameState = STONEATTACKOVER;
   } 

  switch(score){
    case 10: monkey.scale = 0.09;
    break;  
    case 20: monkey.scale = 0.1;
    break;
    case 30: monkey.scale = 0.11;
    break;
    case 40: monkey.scale = 0.12;
    break;
    case 50: monkey.scale = 0.13;
    break;
    default: break;  
}
  }
  if(gameState === TIMERINTRODUCTION){
    background(174,229,224);
  
    attackMode.visible = false;
    infiniteMode.visible = false; 
    homeMonkey.visible = false;
    threestones.visible = false;
    batterylife.visible = false;
    timedGame.visible = false;

    stroke("white");
    textFont("Arial");
    fill("white");
    textSize(200);
    text(timer1, 175,300);
  
  if (frameCount % 30 == 0) { 
    timer1 = timer1 - 1;
  }

  if(timer1 == 0){
    textSize(25);
    text("Go! Go! Go!", 175,400);
  }
  if (timer1 < 0) {
    gameState = TIMER;
  }
  }

  if(gameState === TIMER){

    attackMode.visible = false;
    infiniteMode.visible = false; 
    homeMonkey.visible = false;
    threestones.visible = false;
    batterylife.visible = false; 

    monkey.visible = true; 
    ground.visible = true;
    spaceBar.visible = true;

    stroke("black");
    textFont("Arial");
    fill("black");
    textSize(25);
    text(timer2, 200,445);
  
  if (frameCount % 30 == 0) { 
    timer2 = timer2 - 1;
  }

    spawnFood();
  spawnObstacles();

  stroke("black");
  textSize(20);
  fill("black");
  text("Score:"+ score, 10,435);

  stroke("black");
  textSize(15);
  fill("brown")
  text("GrowMonkeyGrow: Timed Game", 115,420);


    if(keyDown("space")&& monkey.y >= 310 ) {
      monkey.velocityY = -15;
    }
  
    if(mousePressedOver(spaceBar) && monkey.y >= 310){
      monkey.velocityY = -15;
    }

    monkey.velocityY = monkey.velocityY + 0.8 
  
    monkey.collide(invisibleGround);
    
   if(bananaGroup.isTouching(monkey)){
     score = score + 2;
     bananaGroup.destroyEach();
   }

   if(obstacleGroup.isTouching(monkey)){
     monkey.scale = 0.08;
     
     stroke("red");
     fill("red");
     textSize(25);
     text(timer2, 200,445);

    timer2 = timer2 - 1;
   }

   if( timer2 <= 0){
     gameState = STONEATTACKOVER;
   }

   if(keyDown("e")){
     gameState = STONEATTACKOVER;
   }

  switch(score){
    case 10: monkey.scale = 0.09;
    break;  
    case 20: monkey.scale = 0.1;
    break;
    case 30: monkey.scale = 0.11;
    break;
    case 40: monkey.scale = 0.12;
    break;
    case 50: monkey.scale = 0.13;
    break;
    default: break;  
}
  }

  if(gameState === STONEATTACKOVER){
    stroke("black");
  textSize(15);
  fill("brown")
  text("Game Over! You scored " + score,5,435);

  if(score < 10){
    text("points!",180,435);
  }
  if(score >= 10){
    text("points!", 190,435);
  }
  
  obstacleGroup.setVelocityXEach(0);
  bananaGroup.setVelocityXEach(0);

  obstacleGroup.setLifetimeEach(-150);
  bananaGroup.setLifetimeEach(-150);

  if(keyDown("h")){
    obstacleGroup.visible = false;
    bananaGroup.visible = false;
    batteryEmpty.visible = false;
    gameState = HOME;
  }

 monkey.y = 335;

  monkey.collide(invisibleGround);
  }

  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(450,350,10,40);
    obstacle.addImage("obstacles", obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    obstacleGroup.add(obstacle);
  }
} 

function spawnFood() {
  if (frameCount % 135 === 0) {
    var banana = createSprite(450,220,40,10);
    banana.y = Math.round(random(200,220));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 200;
     bananaGroup.add(banana);
  }
}
