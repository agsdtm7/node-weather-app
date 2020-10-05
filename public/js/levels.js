import Brick from "./brick.js"

export function buildLevel(game, level) {
    let bricks = []

    level1.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            if (brick === 1) {
                let position = {
                    x: 80 * brickIndex,
                    y: 20 + 24 * rowIndex
                }
                bricks.push(new Brick(game, position))
            }
        })
    })
}

export const level1 = [
    [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]