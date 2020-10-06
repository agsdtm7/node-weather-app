import { detectCollision } from "./collisionDetection.js"

// class Ball
export default class Ball {
    constructor(game) { // has been refactored
        this.gameWidth = game.gameWidth // has been refactored
        this.gameHeight = game.gameHeight // has been refactored

        this.image = document.getElementById('imgball')

        this.game = game;
        this.position = { x: 10, y: this.gameHeight / 2 - 100 }
        this.speed = { x: 4, y: 4 }
        this.size = 16
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size)
    }

    update() {
        this.position.x += this.speed.x
        this.position.y += this.speed.y

        // Wall on left or right
        if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
            this.speed.x = -this.speed.x
        }
        // Wall on top or bottom
        if (this.position.y + this.size > this.gameHeight || this.position.y < 0) {
            this.speed.y = -this.speed.y
        }

        // check collision with paddle
        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y
            this.position.y = this.game.paddle.position.y - this.size
        }

    }
}