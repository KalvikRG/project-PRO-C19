var bg , bgImg , maskbutton , maskbuttonImg , panel , particals;
var object , objectImg , ObjectsGroup; 
var invisibleBlock , gameOver , gameOverImg;
var gamestate = "play";
var score = 0;


function preload()
{

    bgImg = loadImage("Background.png");        


    objectImg = loadImage("Obstacle.png")
    panelImg = loadImage("WoodenPanel.png")

    gameOverImg = loadImage("gameOver.png")
    maskbuttonImg = loadImage("Maskbutton.png")


    particals = loadImage("Particle.png")                          
    playerImg = loadImage("Player.png")
    

}
function setup() 
{
    createCanvas(800,450)

    bg = createSprite(0,0,900,450);
    bg.addImage("bg", bgImg);
    bg.x = width/2
    bg.velocityX = -6

    player = createSprite(100,190,10,10)
    player.addImage("player" , playerImg) 
    player.scale = 0.2
    player.setCollider('rectangle',0,0,660,300)

    invisibleBlock = createSprite(0,0,10,890)
    invisibleBlock.visible = false;

    gameOver = createSprite(400,200,80,60);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.4
  
    maskbutton = createSprite(400,240,20,90);
    maskbutton.addImage(maskbuttonImg);
    maskbutton.scale = 0.1

    
   
    ObjectsGroup = new Group

    gameOver.visible = false;
    maskbutton.visible = false;
    
    score = 0;
}


function draw() 
{
    background("bg");
    // player.debug = true;
    text("Score: "+ score,300,200);
    textSize(20);
    fill("black")
   //text("Score: "+ score,30,50);
    

    if(gamestate === "play"){

        if(bg.x < 0)
        {
            bg.x = bg.width/2;
        }

        if(keyDown("up_arrow"))
        {
            player.y -= 10
        }

        if(keyDown("down_arrow"))
        {
            player.y += 10
        }

        if(keyDown("shift"))
        {
            player.y = 190
        }
    

        gameOver.visible = false;
        maskbutton.visible = false;


         spawnObject();
            
    }
    

    if(ObjectsGroup.isTouching(player))
    {

     gamestate = "end";
     
      
    
    }
         if (gamestate === "end")
    { 
        gameOver.visible = true;
        maskbutton.visible = true;
        
        bg.velocityX = 0;
        player.velocityY = 0;
        
        ObjectsGroup.setVelocityXEach(0);
        ObjectsGroup.setLifetimeEach(-1);
        
        if(mousePressedOver(maskbutton)) {      
            reset();
            ObjectsGroup.destroyEach();
          }

    }
    
    
    drawSprites();
}




function spawnObject()
{
    if(frameCount % 60 === 0) 
    {
         var object = createSprite(200,-50);
         object.y = Math.round(random(90,290));
         object.x = Math.round(random(800,600));

         object.velocityX = -(2 + 3*score/100);

     object.setCollider('circle',0,0,200)
     object.addImage("ob" , objectImg)
     object.velocityX = -10;

     object.debug = true;
        var rand = Math.round(random(3,6));
        switch(rand) 
        {
            case 1: object.addImage(objectImg);
                     break;
            default: break;
        }
   
        object.scale = 0.2;
        object.lifetime = 200;
    
       
        ObjectsGroup.add(object)
     
    }
}

function reset()
{
    gameState = "play";

    gameOver.visible = false;
    maskbutton.visible = false;

    ObjectsGroup.destroyEach();

    score = 0;
}

