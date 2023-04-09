var bg,bgImg;
var player, shooterImg, shooter_shooting;
var ghost,ghostGroup,ghostImg,bullet,bulletImg,bulletGroup,bullets=90


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/background1.jpg")
  ghostImg = loadImage("assets/ghost.png")
  bulletImg = loadImage("assets/bullet.png")


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40)
bg.addImage(bgImg)
bg.scale = 0.4

ghostGroup = new Group()
bulletGroup = new Group()

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


}

function draw() {
  background(0); 

spawnGhost()


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet = createSprite(displayWidth-1150,player.y-30,20,10)
 bullet.addImage(bulletImg)
 bullet.scale = 0.04
 bullet.velocityX = 20
 bulletGroup.add(bullet)
 bullet.depth=player.depth
 player.depth=player.depth+1
 if(bullets>0){
  bullets = bullets - 1
 }

 

  player.addImage(shooter_shooting)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(ghostGroup.isTouching(bulletGroup)){
  for(var i=0;i<ghostGroup.length;i++){
    if(ghostGroup[i].isTouching(bulletGroup)){
      ghostGroup[i].destroy()
      bulletGroup.destroyEach()
    }
  }
}
drawSprites();

}
function spawnGhost(){
  if(frameCount%60===0){
    ghost=createSprite(random(500,1100),random(100,500),40,40)
ghost.addImage(ghostImg)
ghost.velocityX = -3
ghost.scale = 0.4
ghost.lifetime = 500
ghostGroup.add(ghost)
  }

}
