var drawing = []
var currentPath = [];
var isDrawing = false;

// 
//const {createStore, Pixel,Path} = require('./service.js')

const store = createStore([])

//var createStore
console.log("---->>", store)

pTest = new Pixel(0,0,0)
console.log("---->>", pTest)


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
    //Fixme: currentPath should be called tracker? or move it somewhere else
    //if (currentPath.length === 5) currentPath = []
    currentPath.push(point)

    console.log("---currentPath--->>", currentPath)

    if (currentPath.length > 2) {
      const pointx = currentPath.slice(-3)[0].x
      const pointy = currentPath.slice(-3)[0].y

      if (pointx !== point.x && pointy !== point.y) {
        const eachPoint = new Pixel(point, [0, 0, 0], 3)
        store.drawPathWith(eachPoint)
        //console.log(store.currentPath.getPath())
        console.log("store ------>>",store.getState())

      }
    }
  }

  stroke(0);
  strokeWeight(4);
  noFill();
/*  
  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i];
    beginShape()
    for (var j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y)
    }
    endShape();
  }
*/
  
  for (var i = 0; i < store.getState().length; i++) {
    var path = store.getState()[i].getPath()
    beginShape()
    //console.log("------>>", path)
    for (var j = 0; j < path.length; j++) {
       vertex(path[j].point.x, path[j].point.y)
     }
    endShape()
  }
}

//https://github.com/CodingTrain/website/blob/1c684717859e228684d7e2fed6f379e01d949328/CodingChallenges/CC_45_FirebaseSavingDrawing/sketch.js

