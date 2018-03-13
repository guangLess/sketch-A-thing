
class Pixel {
    constructor(point, color, stroke){
        this.point =  point
        this.color = color
        this.stroke = stroke
    }
}

let _pathData = new WeakMap()

class Path {
    // draw : add pixels
    constructor(initialPath = []){
        //firebase method for add a new path
        _pathData.set(this, initialPath)
    }

    addPath(data){
        //firebase method later to extends this path, now add locally 
        let collection = _pathData.get(this)
        collection.push(data)
        _pathData.set(this, collection)
    }

}

// swift like does not work seems
// let Pixe = {
//     point:  {x : 0, y : 0},
//     color: [0,0,0],
//     stroke: 0,
//     init: (point, color, stroke)  =>  {point, color, stroke}
//   };

//add point, get point 
class Store {
    constructor(state, currentPath = new Path()){
        this.state = state
        this.currentPath = currentPath
        this.getState = this.getState.bind(this)
        this.add = this.add.bind(this)
    }
    getState() {
        return this.state
    }
    add(data){
        const nextState = [...this.getState(), data]
        console.log("------>>", nextState)
        this.state = nextState       
    }
    collectToPath(){

    }
}

const createStore = (initialState) => {
    const store = new Store(initialState)
    return store
}

module.exports = {Pixel, createStore}
