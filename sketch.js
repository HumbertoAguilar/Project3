var balon,balonImg,balonGroup;
var rival,rivalImg, rivalGroup;
var portero, porteroImg;
var campo, campoImg;
var invisibleGround
var puntuacion
var vidas
var youwonIMG,youWon
var gameState="intro"
var gameOver, gameOverImg
var level1Img,level1
var level2,level2Img
var level3,level3Img
var fondoImg;
var fondo;
function preload(){
  campoImg=loadImage("campo.jpg")
  porteroImg=loadImage("u.png")
rivalImg=loadImage("tacleador.png")
  balonImg=loadImage("balon.png")
  gameOverImg=loadImage("gameOver.png")
  youwonIMG=loadImage("youwin.png")
level1Img=loadImage("LEVEL1.png")
level2Img=loadImage("LEVEL2.png")
level3Img=loadImage("LEVEL3.png")
fondoImg=loadImage("fondo.jpeg");
}

function setup() {
  createCanvas(400,400)
  fondo=createSprite(200,200)
  fondo.addImage("fondo",fondoImg)
  fondo.visible=false
  fondo.scale=0.5
campo=createSprite(200,200)
  campo.addImage("campo",campoImg)
  campo.velocityX=-2
  campo.visible=false
 portero=createSprite(55,330)
  portero.addImage("portero",porteroImg)
  portero.scale=.15
  invisibleGround=createSprite(200,390,400,10)
  invisibleGround.visible=false
  rivalGroup=new Group();
  balonGroup=new Group();
  puntuacion=0
  vidas=3
  gameOver=createSprite(190,200)
  gameOver.addImage("gameover",gameOverImg)
  gameOver.scale=0.8
gameOver.visible=false
youWon=createSprite(190,200)
youWon.addImage("youwon",youwonIMG)
youWon.visible=false;
level1=createSprite(190,100)
level1.addImage("nivel1",level1Img);
level1.visible=false
level1.scale=0.7
level2=createSprite(190,100)
level2.addImage("nivel2",level2Img)
level2.scale=0.7
level2.visible=false
level3=createSprite(190,100)
level3.addImage("nivel3",level3Img)
level3.scale=0.7
level3.visible=false

  
  
  
  
  
  
}

function draw() {
fill("black")
textSize(18)
  if(gameState==="intro"){
    background("black")

  
   fill("white")
 text("Ayuda al jugador de fútbol a romper su récord",0,180)
  text("presiona espacio para saltar, recoge los balones",0,200)
 text( "y evita ser tacleado.",0,220)
text("Presiona barra espaciadora para empezar",10,80)
  if(keyCode===32){
  gameState="play"
}
  }

  if(gameState==="play"){
    campo.visible=true
  
    
    gameOver.visible=false
    if(campo.x<100){
    campo.x=campo.width/2
     
  }
     spawnrivals();
    spawnbalon();
  if(keyDown("space")&&portero.y>=300){
    portero.velocityY=-4
  }
  portero.velocityY = portero.velocityY + 0.048
   campo.velocityX=-2
    if(campo.x<100){
    campo.x=campo.width/2
  }
  if(keyDown("space")&&portero.y>=300){
    portero.velocityY=-4
  }
  portero.velocityY = portero.velocityY + 0.048
   
    if(balonGroup.isTouching(portero)){
      balonGroup.destroyEach();
      puntuacion+=+2
    }
    if(rivalGroup.isTouching(portero)){
      vidas=vidas-1
      rivalGroup.destroyEach();
      
    }

    
    if(vidas===0){
      gameState="end"
      gameOver.visible=true
    }
    drawSprites();
    if(puntuacion<15){
      level1.visible=true
    }
     if(puntuacion>15&&puntuacion<30){
   level2.visible=true
      rival.velocityX=-6
      balon.velocityX=-4
      level1.visible=false
    }
    if(puntuacion>29&&puntuacion<45){
   level3.visible=true
      rival.velocityX=-7
      balon.velocityX=-6
      level2.visible=false
    }
    if(puntuacion===46){
level3.visible=false
youWon.visible=true;
portero.destroy();
    balonGroup.destroyEach();
    rivalGroup.destroyEach();
    text("Presionar r para volver a jugar",70,260)
    if(keyDown("r")){
      puntuacion=0
      vidas=3
      gameState="play"
      portero=createSprite(55,330)
      portero.addImage("portero",porteroImg)
      portero.scale=.11
      gameOver.visible=false
    }
    }
  }
  if(gameState==="end"){
    level1.visible=false
    level3.visible=false
    level2.visible=false
    balon.lifetime=-1
  rival.lifetime=-1
  balon.velocityX=0
  rival.velocityX=0
    campo.velocityX=0
    portero.destroy();
    balonGroup.destroyEach();
    rivalGroup.destroyEach();
    gameOver.visible=true
    text("Presionar r para reiniciar",70,260)
    if(keyDown("r")){
      
      puntuacion=0
      vidas=3
      gameState="play"
      portero=createSprite(55,330)
      portero.addImage("portero",porteroImg)
      portero.scale=.11
      gameOver.visible=false
    }
    
  
  }
    
  
  
  portero.collide(invisibleGround)
  
 
    text("Puntuación: "+puntuacion,20,30)
  text("Vidas: "+vidas,320,30)
     
}

function spawnrivals(){
  if(frameCount%300===0){
    rival=createSprite(440,357,20,20)
    rival.addImage("rival",rivalImg)
    
   rival.velocityX=-4
    rival.scale=0.15
    rivalGroup.add(rival)
    rival.lifetime=170
  }
function reset(){
  gameState="play"
}
  
}

function spawnbalon(){
  if(frameCount%80===0){
    balon=createSprite(450,Math.round(random(290,150)))
    balon.addImage("balon",balonImg)
    balon.scale=0.08
        balon.velocityX = -3;
    balonGroup.add(balon)
    balon.lifetime=160
  }
  
}

function reset(){
  puntuacion=0
  vidas=3
  gameState="play"
  portero=createSprite(55,330)
  portero.addImage("portero",porteroImg)
  portero.scale=.11
  gameOver.visible=false
  
}