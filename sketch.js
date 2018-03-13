var drawing = []
var currentPath = [];
var isDrawing = false;

// 
//const {createStore, Pixel,Path} = require('./service.js')

//const store = createStore(initialState)

//var createStore
//console.log("---->>", createStore)
console.log("---->>", new Pixel())


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mousePressed(startPath)
  canvas.mouseReleased(endPath)

  strokeWeight(10)
  stroke(0)
  noFill()
}

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
  
  store.currentPath = new Path()
  store.addPath()
  console.log('-->', mouseX, mouseY)
}

function endPath() {
  isDrawing = false;
  console.log('<->', drawing.length)

}

function draw() {
  ellipse(50, 50, 130, 130)
  if (isDrawing) {
    var point = {
      x: mouseX,
      y: mouseY
    }
    currentPath.push(point);
    const eachPoint = new Pixel(point, [0,0,0], 3)
    store.drawPathWith(eachPoint)
  }

  stroke(0);
  strokeWeight(4);
  noFill();
  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i];
    beginShape();
    for (var j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y)
    }
    endShape();
  }
}

//https://github.com/CodingTrain/website/blob/1c684717859e228684d7e2fed6f379e01d949328/CodingChallenges/CC_45_FirebaseSavingDrawing/sketch.js

