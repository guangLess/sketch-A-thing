
class Pixel {
    constructor(point, color, stroke){
        this.point =  point
        this.color = color
        this.stroke = stroke
    }
}
/*
let _pathData = new WeakMap()

class Path {
    // draw : add pixels
    constructor(initialPath = []){
        //firebase method for add a new path
        _pathData.set(this, initialPath)
    }

    addPoint(data){
        //firebase method later to extends this path, now add locally 
        let collection = _pathData.get(this)
        collection.push(data)
        _pathData.set(this, collection)
    }

}


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

    addPath(){
        const nextState = [...this.getState(), this.currentPath]
        console.log("------>>", nextState)
        this.state = nextState       
    }

    drawPathWith(point){
        this.currentPath.addPoint(point)
    }
}

const createStore = (initialState) => {
    const store = new Store(initialState)
    return store
}

//module.exports = {Pixel, Path, createStore}
*/