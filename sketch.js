var rocket, rocketImg
var scene, sceneImg
var invEdge
var starImg, meteorImg
var collectedStars = 0
var gameOver, gameOverImg, restart, restartImg
var start = 1
var play = 2
var end = 0
var gameState = 1
var score = 0






function preload(){
sceneImg = loadImage("space.png")
starImg = loadImage("star-removebg-preview.png")
meteorImg = loadImage("meteor-removebg-preview.png")
gameOverImg = loadImage("gameOver-removebg-preview.png")
restartImg = loadImage("restart-removebg-preview.png")
rocketImg = loadImage("rocket-removebg-preview.png")

}

function setup() {
 createCanvas(400, 400)

 scene = createSprite(200, 200, 400, 400)
 scene.addImage(sceneImg)
 scene.velocityY = 2

 rocket = createSprite(200, 300, 20, 20)
 rocket.addImage(rocketImg)
 rocket.scale = 0.2

 invEdge = createSprite(200, 350, 400, 10)
 invEdge.visible = false

 gameOver = createSprite(200, 200, 50, 50)
 gameOver.visible = false
 gameOver.addImage(gameOverImg)
 gameOver.scale = 1.5

 restart = createSprite(200, 300, 50, 50)
 restart.visible = false
 restart.addImage(restartImg)
 restart.scale = 0.2

 starsG = new Group()
 meteorsG = new Group()
}

function draw() {
 background(190)
 
 if(gameState == 1) {
  scene.velocityY = 0
  starsG.setVelocityEach(0, 0)
  meteorsG.setVelocityEach(0,0)

  if(keyDown("space")) {
    gameState = 2
  }

  rocket.collide(invEdge)
 }

 if(gameState == 2) {
  score = score + Math.round(getFrameRate() / 59.955)
  genStar()
  mov()
  genMeteor()
  invEdge.destroy()
  scene.velocityY = 2
  if(scene.y > 400) {
    scene.y = 200
 }

 if(rocket.isTouching(starsG)) {
  starsG.destroyEach()
  collectedStars++
 }

 if(rocket.y > 400 || rocket.isTouching(meteorsG)) {
  gameState = 0
 }

 rocket.velocityY = rocket.velocityY + 0.4
 }

 if(gameState == 0) {
  scene.velocityY = 0
  starsG.setVelocityEach(0, 0)
  meteorsG.setVelocityEach(0,0)
  rocket.destroy()
  meteorsG.setLifetimeEach(-1)
  starsG.setLifetimeEach(-1)
  gameOver.visible = true
  restart.visible = true
  score = 0

  if(mousePressedOver(restart)) {
    gameState = 1
    rocket = createSprite(200, 300, 20, 20)
    rocket.addImage(rocketImg)
    rocket.scale = 0.2
    gameOver.visible = false
    restart.visible = false
    meteorsG.destroyEach()
    starsG.destroyEach()
    collectedStars = 0
    meteorsG.setLifetimeEach(150)
    starsG.setLifetimeEach(150)
  }
 }

 

 


 
 
 drawSprites()
 fill(255)
 text("Estrelas coletadas: "+collectedStars, 50, 50)
 fill(255)
 text("Score: "+score, 50, 100)
 
}

function mov() {
  if(keyDown("left_arrow")) {
    rocket.x = rocket.x -5
  }
  if(keyDown("right_arrow")) {
    rocket.x = rocket.x +5
  }
  if(keyDown("space")) {
    rocket.velocityY = -7
  }
}

function genStar() {
  if(frameCount % 150 == 0) {
    var star = createSprite(random(50, 350),-10, 20, 20)
    star.velocityY = 3
    star.addImage(starImg)
    star.scale = 0.17
    star.lifetime = 150
    starsG.add(star)
  }
}

function genMeteor() {
  if(frameCount % 100 == 0) {
    var meteor = createSprite(random(50, 350),-10, 20, 20)
    meteor.velocityY = 5
    meteor.addImage(meteorImg)
    meteor.scale = 0.4
    meteor.lifetime = 150
    meteorsG.add(meteor)
  }
}