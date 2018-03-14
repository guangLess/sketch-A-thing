
class Pixel {
    //TODO: this needs to be a node (tree=gy thing)
    constructor(point, color, stroke){
        this.point =  point
        this.color = color
        this.stroke = stroke
    }
}
//let _pathData = new WeakMap()

class Path {
    // draw : add pixels
    constructor(initialPath = []){
        //firebase method for add a new path
        //_pathData.set(this, initialPath)
        self._pathData = initialPath
    }

    addPoint(data){
        //firebase method later to extends this path, now add locally 
        //let collection = _pathData.get(this)
        if(data instanceof Pixel === true){
            let collection = self._pathData.slice()
            collection.push(data)
            //_pathData.set(this, collection)
            self._pathData = collection.slice()   
        }
    }
    getPath(){
        return self._pathData
    }
}


class Store {
    constructor(state, currentPath = new Path()){
        this.state = state
        this.currentPath = currentPath
        this.getState = this.getState.bind(this)
        this.addPath = this.addPath.bind(this)
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
