const W = "white"
const B = "black"

// const white = [255,255,255]
// const black = [0,0,0]

class PColor {
    constructor(char) {
        if (char === W) this.color = [255, 255, 255]
        if (char === B) this.color = [0, 0, 0]
        else {
            console.error('color input went wrong')
        }
    }
}