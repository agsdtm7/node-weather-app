// NOTE IMPORTANT: THE import syntax works because I added type="module" inside the <script>
// IMPORTS
import Paddle from "./paddle.js"
import Ball from "./ball.js"
import InputHandler from "./input.js"

// IMAGE
let imgBall = document.getElementById('imgball')


// ON THE CANVAS
console.log("this is from canvas")
let canvas = document.getElementById("gameScreen")
let ctx = canvas.getContext("2d")

const GAME_WIDTH = 800
const GAME_HEIGHT = 600

ctx.clearRect(0, 0, 800, 600);

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT)
let ball = new Ball(GAME_WIDTH, GAME_HEIGHT)
new InputHandler(paddle)

let lastTime = 0

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime
    lastTime = timestamp

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    paddle.update(deltaTime)
    paddle.draw(ctx)

    ball.draw(ctx)
    ball.update(deltaTime)



    requestAnimationFrame(gameLoop)

}

gameLoop()