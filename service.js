
class Pixel {
    constructor(point, color, stroke){
        this.point =  point || {x : 0, y : 0}
        this.color = color || [0, 0, 155]
        this.stroke = stroke || 3
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
    constructor(state){
        this.state = state
        this.getState = this.getState.bind(this)
        this.add = this.add.bind(this)
    }
    getState() {
        return this.state
    }
    add(data){
        const nextState = {pixel: [...this.getState(), data]}
        this.state = nextState       
    }
}

const createStore = (initialState) => {
    const store = new Store(initialState)
    return store
}

module.exports = {Pixel, createStore}
