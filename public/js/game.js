import Ball from "./ball.js"
import Paddle from "./paddle.js"
import InputHandler from "./input.js"
import Brick from "./brick.js"

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
    }

    start() {
        this.ball = new Ball(this)
        this.paddle = new Paddle(this)

        let bricks = []
        for (let i = 0; i < 10; i++) {
            bricks.push(new Brick(this, { x: i * 80, y: 30 }))
        }

        this.gameObjects = [this.ball, this.paddle, ...bricks]   // We want to put game objects into an array in order to simplify our syntaxes, to add an array to an existing array we use spread operator 

        new InputHandler(this.paddle)
    }

    update(deltaTime) {
        // this.paddle.update(deltaTime)    // first refactor
        // this.ball.update(deltaTime)      // first refactor
        this.gameObjects.forEach((object) => object.update(deltaTime))  // to simplify, we use an array and its method forEach so that we don't need to repeat things
    }

    draw(ctx) {
        //this.paddle.draw(ctx)  // first refactor
        //this.ball.draw(ctx)   // first refactor

        this.gameObjects.forEach((object) => object.draw(ctx))
    }

}