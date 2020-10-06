// FOR PADDLE CLASS
export default class Paddle {
    constructor(game) { // has been refactored
        this.gameWidth = game.gameWidth // has been refactored

        this.width = 150
        this.height = 30

        this.maxSpeed = 5
        this.speed = 0

        this.position = {
            x: game.gameWidth / 2 - this.width / 2, // has been refactored
            y: game.gameHeight - this.height - 10, // has been refactored
        }
    }

    moveLeft() {
        this.speed = -this.maxSpeed
    }

    moveRight() {
        this.speed = this.maxSpeed
    }

    stop() {
        this.speed = 0
    }

    draw(abc) {
        abc.fillStyle = '#00A'
        abc.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(deltaTime) {

        this.position.x += this.speed

        if (this.position.x < 0) this.position.x = 0
        if (this.position.x + this.width > this.gameWidth) this.position.x = this.position.x = this.gameWidth - this.width
    }
}