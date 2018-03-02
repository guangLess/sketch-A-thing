
const {createStore, Pixel} = require('./service.js')

const pixel = new Pixel({x:1, y:3}, [100, 0, 0], 5)
const initialState = [pixel]
const store = createStore(initialState)
const pixelTwo = new Pixel({x:2, y: 6}, [100, 0, 0], 5)

store.add(pixelTwo)