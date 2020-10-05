import Game from "./game.js"

// INPUT HANDLER
export default class InputHandler {
    constructor(paddle, game) {
        document.addEventListener('keydown', (event) => {
            //console.log(event.keyCode)
            switch (event.keyCode) {
                case 37:
                    paddle.moveLeft()
                    break

                case 39:
                    paddle.moveRight()
                    break
                case 27:
                    game.togglePause()
                    break
                case 32:
                    game.start()
                    break
            }
        })

        document.addEventListener('keyup', (event) => {
            //console.log(event.keyCode)
            switch (event.keyCode) {
                case 37:
                    paddle.stop()
                    break

                case 39:
                    paddle.stop()
                    break
            }
        })
    }
}