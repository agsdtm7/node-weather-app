import Ball from "./ball.js"
import Paddle from "./paddle.js"
import InputHandler from "./input.js"
import Brick from "./brick.js"
import { buildLevel, level1 } from "./levels.js"

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        this.gamestate = GAMESTATE.MENU
        this.ball = new Ball(this)
        this.paddle = new Paddle(this)
        this.gameObjects = []
        new InputHandler(this.paddle, this)
    }

    start() {
        if (this.gamestate !== GAMESTATE.MENU) return
        let bricks = buildLevel(this, level1)

        this.gameObjects = [this.ball, this.paddle, ...bricks]   // We want to put game objects into an array in order to simplify our syntaxes, to add an array to an existing array we use spread operator 
        this.gamestate = GAMESTATE.RUNNING
    }

    update(deltaTime) {
        if (this.gamestate == GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU) return

        // this.paddle.update(deltaTime)    // first refactor
        // this.ball.update(deltaTime)      // first refactor
        this.gameObjects.forEach((object) => object.update(deltaTime))  // to simplify, we use an array and its method forEach so that we don't need to repeat things
        this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion)
    }

    draw(ctx) {
        //this.paddle.draw(ctx)  // first refactor
        //this.ball.draw(ctx)   // first refactor

        this.gameObjects.forEach((object) => object.draw(ctx))
        if (this.gamestate == GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight)
            ctx.fillStyle = "rgba(0,0,0,0.5)"
            ctx.fill()

            ctx.font = "30px Arial"
            ctx.fillStyle = "white"
            ctx.textAlign = "center"
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2)
        }

        if (this.gamestate == GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight)
            ctx.fillStyle = "rgba(0,0,0)"
            ctx.fill()

            ctx.font = "30px Arial"
            ctx.fillStyle = "white"
            ctx.textAlign = "center"
            ctx.fillText("Error 404 Page", this.gameWidth / 2, this.gameHeight / 2 - 50)
            ctx.fillText("Press SPACEBAR To Start", this.gameWidth / 2, this.gameHeight / 2)
        }
    }

    togglePause() {
        if (this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING
        } else {
            this.gamestate = GAMESTATE.PAUSED
        }
    }
}