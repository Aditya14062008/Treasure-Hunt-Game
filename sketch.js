
var gameState = "start";
var player,player_running,player_dead ;
var enemyGroup, enemyImg;
var bg,bgImg,bg2,bg2Img;
var rock, rockImg;
var crab, crabImg;
var coin, coinImg;
var score=0
var ig;
var edges;
var confetti,confettiImg;
var reset,resetImg;
var fire,fireImg;
var treasure,treasureImg;
var start, startImg, gameover, gameoverImg;

var lives=3

function preload() {

player_running =loadAnimation("Run0.png","Run1.png","Run2.png");
player_dead = loadImage("Dead1.png");
bgImg=loadImage("bg.jpg");
coinSound=loadSound("coin.mp3");
dieSound=loadSound("die.mp3");
fireSound=loadSound("fire.mp3");
bg2Img=loadImage("bg3.png");
confettiImg=loadImage("star.png")
treasureImg=loadImage("t1.png");
startImg=loadImage("start.png");
gameoverImg=loadImage("gameover.png");
coinImg=loadImage("coin.png")
rockImg=loadImage("fire.png");
fireImg=loadImage("rock.png");
crabImg=loadImage("bomb-removebg-preview (1).png");
enemyImg=loadImage("enemy1.png")
resetImg=loadImage("RESET.png")
}

function setup(){
   createCanvas(800,400);
   edges=createEdgeSprites();

   start=createSprite(width/2,height/2+125); 
   start.addImage(startImg);
   start.scale=0.15;
    start.visible = true;
 
  setLevelOne();
  setLevelTwo();
  setEnd();
  
}


function draw(){
    background("cyan");
   
   drawSprites();   



  
    //START Gamestate
    if(gameState==="start"){
      startState();
    }
  
    //LEVEL 1 Gamestate
    if(gameState==="LevelOne"){
        playLevelOne();
    }
  
    //LEVEL 2 Gamestate
    if(gameState==="LevelTwo"){
     playLevelTwo();

    }
  
   // END State
    if(gameState === "End"){
     endState();
    }
  
    //END2 State
    if(gameState === "End2"){
      end2State();
    }
  
   // Win State
    if(gameState === "Win"){
      Win();
    }
  }
  
  function startState(){
      player.visible=false
      fill(254,182,21);
      stroke("cyan");
      
      text("Treasure Hunt Game");
      textSize(20)
      text("Treasure Hunt Game \n\n\nInstructions :\n 1) Use the up key to jump\n 2) Avoid the obstacles in your way\n 3) You have to get the treasure at Level 2",width/2-250,height/2-50);
  
      
  
      if(mousePressedOver(start)){
        //resetSound.play();
          clear();
        gameState="LevelOne";
      }
  }
  
  
  
  function setLevelOne(){
   
   bg=createSprite(width/2,height/2,width,height);
   bg.addImage(bgImg);
   bg.scale=1.7
   bg.visible = false;

   bg2=createSprite(400,200,10,10);
    bg2.addImage(bg2Img);
    bg2.scale=1.2
    bg2.visible=false;
     
   ig=createSprite(400,380,800,10);
   ig.visible=false;

   player=createSprite(100,160,20,50);
   player.addAnimation("running",player_running);
   
   player.scale = 0.2;
   
    
  
    rockGroup = new Group();
    rock2Group = new Group();
    coinGroup = new Group();
      
  }
  
  function playLevelOne(){
      
      bg.visible = true;
      start.visible=false;

           player.visible=true
      textSize(25);
    textStyle(BOLD);
    fill(0);
      text("Score: " + score, width-200,100);
    text("Level 1",width/2,50);
      
    if(keyDown("up") && player.y>300){
        player.velocityY = -30;
    }
    if(keyDown("right") ){
      player.x += 5;
  }
  if(keyDown("left") ){
    player.x -= 5;
}
    player.velocityY=player.velocityY+1;
    
    
    

    player.collide(ig);
    player.collide(edges);
      
  
    if(score>=1000){
      //clear();
      rockGroup.destroyEach();
      rock2Group.destroyEach();
      coinGroup.destroyEach();
        bg.destroy()
     
     gameState="LevelTwo";
    
    }
  
      for (var i = 0; i < coinGroup.length; i++) {
      
          if(coinGroup.get(i).isTouching(player)){
        coinSound.play();
              coinGroup.get(i).remove()
              score =score+100;
          }
      }
      
      if(rockGroup.isTouching(player) || rock2Group.isTouching(player)){
     gameState = "End";
      }
      
    rocks();
      createCoins();
      
  }
  
  function rocks() {
  
    if (frameCount % 70 === 0) {
      rock = createSprite(width, Math.round(random(50,height-150)), 20 , 20);
      rock.addImage(rockImg);
      rock.scale=0.2;
      rock.velocityX = -8;
      rock.lifetime = 300;
  
      crab= createSprite(-50, Math.round(random(50,height-150)), 50 , 50);
      crab.addImage(crabImg);
      crab.scale=0.3;
      crab.velocityX = 10;
      crab.lifetime = 300;
      
      
     rockGroup.add(rock);
     rock2Group.add(crab);
     
    }
  }
  
  function createCoins(){
   
      if (frameCount % 150 === 0) {
          coin = createSprite(Math.round(random(50,width-100)), -50, 20 , 20);
          coin.addImage(coinImg);
          coin.scale=0.15;
          coin.velocityY = 4;
          coin.lifetime = 100;
          coinGroup.add(coin);  
    }
  }
  
  function setLevelTwo(){
    
    
  
    enemy = createSprite(750,height/2,50,50);
    enemy.addImage(enemyImg);
    enemy.scale=0.5;
    enemy.visible = false;
    
  
    treasure = createSprite(750,height-300,50,50);
    treasure.addImage(treasureImg);
    treasure.scale=0.2;
    treasure.visible = false;
  
    fireGroup = new Group();
    
  }
  
  function playLevelTwo(){
      
    bg2.visible = true;
   
    player.visible = true;
    
    enemy.visible = true;

    treasure.visible = true;
    enemy.velocityY = -10;
    enemy.bounceOff(ig);
    player.bounceOff(ig);
    enemy.bounceOff(edges);
    
      
      textSize(25);
    textStyle(BOLD);
    fill(255);
      text("Lives: " + lives, width/2-300,50);
    text("Level 2",width/2,50);
  
      if(keyDown(UP_ARROW)){
        player.velocityY = -5;
        
      }
  
      if(keyDown(LEFT_ARROW)){
        player.x = player.x - 5;
       
      }
  
      if(keyDown(RIGHT_ARROW)){
        player.x = player.x + 5;
        
      }
  
      player.velocityY = player.velocityY + 0.5;
      
  
     
      player.collide(edges);
     

  
      if(lives===0){
        dieSound.play();
        gameState = "End2";
      }
  
      for (var i = 0; i < fireGroup.length; i++) {
        
        if(fireGroup.get(i).isTouching(player)){
          dieSound.play();
          fireGroup.get(i).remove()
          lives--;
        }
      }
  
      if(player.isTouching(treasure)){
        //winSound.play();
        gameState = "Win";
        
      }
      
  
      createFire();
  }
  
  function createFire() {
  
    if(frameCount % 50 === 0){
      fire= createSprite(width-150, Math.round(random(50,height-50)), 75, 20);
      fire.velocityX = -12;
      fire.addImage(fireImg);
      fire.scale=0.2;
      fire.lifetime = 1000;
      fire.y = enemy.y;
      fireGroup.add(fire);
      fireSound.play();
      
    }
    
  }
  
  function setEnd(){
    gameOver = createSprite(width/2,height/2-100,100,100);
    gameOver.addImage(gameoverImg);
    gameOver.scale = 0.1;
    gameOver.visible = false;
    player.visible=false;
    reset = createSprite(width/2,height-100,100,100);
    reset.addImage(resetImg);
    reset.scale = 0.3;
    reset.visible = false;
    
  }
  
  function endState(){
      rockGroup.destroyEach();
    rock2Group.destroyEach();
      coinGroup.destroyEach();
      //player.visible=false
    player.setVelocity(0,0);
    player.visible=false;
      gameOver.visible = true;
    reset.visible = true;
    if(player.isTouching(enemy)){
      gameState="end2State";
    }
  
    if(mousePressedOver(reset)){
      //resetSound.play();
      score = 0;
      gameState = "LevelOne";
      gameOver.visible = false;
      reset.visible = false;
    }
  
  }
  
  function end2State(){
      fireGroup.destroyEach();
    player.setVelocity(0,0);
    
    enemy.setVelocity(0,0);
      gameOver.visible = true;
    reset.visible = true;
  
    if(mousePressedOver(reset)){
      resetSound.play();
      lives = 3;
      gameState = "LevelTwo";
      gameOver.visible = false;
      reset.visible = false;
    }
  
  }
  
  function Win(){
  
      fireGroup.destroyEach();
      player.setVelocity(0,0);
    player.visible=false
    enemy.visible=false;
    reset.visible = true;
    treasure.scale=0.8
    treasure.visible=false;
    textSize(30)
    text("YOU WIN ",350,200)
    if(frameCount % 15 === 0){
      confetti = createSprite(Math.round(random(50,width-100)),-10,100,100);
      confetti.addImage(confettiImg);
      confetti.scale=0.1;
      confetti.velocityY = 5;
      
    }
    
    
    if(mousePressedOver(reset)){
     //resetSound.play();
     location.reload();
   }
  
  }
  
  
  
  
  
  
  
