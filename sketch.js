//Global Variables
var monkey, banana, obstacle, obstacleGroup, bananaGroup, backImage, bananaImage, obstacleImage, backgr, monkey_running, invisibleGround ;

var score = 0;

var PLAY=1;
var End=0;
var gameState = PLAY;
var gameState = END;

var ground, groundImage;
function preload()
{
  backImage = loadImage("jungle.jpg");
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
}


function setup() 
{
  createCanvas(800,400);
    
  backgr = createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width/2;
  backgr.velocityX = -5;
  backgr.velocityX = -(6+3*score/100);
  
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
   
  ground = createSprite(400,350,800,10);
  ground.velocityX = -5;
  ground.x = ground.width/2;
  ground.visible = false;
  ground.velocityX = -(6+3*score/100);
  
  
  invisibleGround = createSprite(400,400,800,10);
  invisibleGround.visible = false;
  //invisibleGround.velocityX = -(6+3*score/100);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw()
{
  background(255); 
 
  if(gameState===PLAY)
  {
    spawnObstacles();
  
    spawnBanana();
    if(keyDown("space") && monkey.y>=350) 
    {
      monkey.velocityY = -20;
    }

    if(keyDown("UP_ARROW") && monkey.y>=350) 
    {
      monkey.velocityY = -20;
    }

    if(keyDown("DOWN_ARROW")) 
    {
      monkey.velocityY = 20;
    }
      if(bananaGroup.isTouching(monkey))
    {
      score = score+20;
      bananaGroup.destroyEach();
    }
    monkey.velocityY = monkey.velocityY +0.1;

    score = score+Math.round(getFrameRate()/60);
  }
  
  
  if(obstacleGroup.isTouching(monkey))
    {
    gameState=END; 
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    }
  
   
  if(gameState===END)
  {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  
  monkey.velocityY = monkey.velocityY + 1

  if(ground.x<200)
  {
 ground.x = ground.width/2; 
  }

  if(backgr.x<100)
 {
  backgr.x = backgr.width/2;
 }
 
 
  monkey.collide(invisibleGround);
  
  drawSprites();
  
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,500,50);
  
}
function spawnObstacles()
{
  if(World.frameCount % 100===0)
  {
   var obstacle = createSprite(800,340,100,100);
   obstacle.velocityX = -7;
   obstacle.lifetime = 150;
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.3;
   obstacle.velocityX = -(6+3*score/200);
   obstacle.debug = true;
   obstacle.setCollider("circle",0,0,120);
  }
     

}

function spawnBanana()
{
 if(World.frameCount % 100===0)
  {
   var banana = createSprite(800,250,100,100);
   banana.velocityX = -7;
   banana.lifetime = 150;
   banana.addImage(bananaImage);
   banana.scale = 0.05;
   bananaGroup.add(banana);   
   banana.velocityX = -(6+3*score/200);
   //banana.debug = true;
  }
}
