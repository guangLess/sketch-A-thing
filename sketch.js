/* eslint-disable */

const store = createStore([])

var currentPath = [];
var isDrawing = false;

var database = firebase.database()
var drawRef = firebase.database().ref('drawing')
var currentLineRef = firebase.database().ref('tempLine')
var count

const preDrawingData = []

drawRef.on('value', snap => {
  snap.forEach(data => {
    const fireValue = data.val()
    preDrawingData.push(fireValue)
  })
})

function setup() {
  canvas = createCanvas(windowWidth, windowHeight)
  canvas.mousePressed(startPath)
  canvas.mouseReleased(endPath)
  //background(51)
  smooth()
  noFill()

  strokeWeight(3)
  stroke(255,163,3)
  point(100,400)
}

function startPath() {
  isDrawing = true;
  currentPath = [];
  store.currentPath = new Path()
  store.addPath()

  count += 1
  lineCount = 'line' + (count).toString(16)

  currentLineRef.set({0: null})
  const htext = document.getElementById('lines')
  htext.innerText = lineCount
}

function endPath() {
  isDrawing = false;
  // tempLine capture the current path, when drawing(mouseXY) stopped, then clean out the current tempLine and add that node to the drawing node / main collection
  currentLineRef.once('value', snap => drawRef.push(snap.val())) 
}

function draw() {
  ellipse(50, 50, 130, 130)
  if (isDrawing) {
    var point = {
      x: mouseX,
      y: mouseY
    }

    //Fixme: currentPath should be called tracker? or move it somewhere else
    currentPath.push(point)

    if (currentPath.length > 2) {
      const pointx = currentPath.slice(-3)[0].x
      const pointy = currentPath.slice(-3)[0].y

      if (pointx !== point.x && pointy !== point.y) {
         eachColor = [255,163,3]//[(255 - currentColor), (300 - currentColor), currentColor]
         strokeV = 1//map(currentColor, 0, 255, 0, 25)
        const eachPoint = new Pixel(point)//, eachColor, strokeV.toFixed(2))
        currentLineRef.push(eachPoint)        
        store.drawPathWith(eachPoint)
      }
    }
  }

  // drawing with current status
  for (var i = 0; i < store.getState().length; i++) {
    var path = store.getState()[i].getPath()
    beginShape()
    for (var j = 0; j < path.length; j++) {
      vertex(path[j].point.x, path[j].point.y)
    }
    endShape()
  }
  // drawing from firebase 
  //FIXME: this should be a node tree structure....
  if (preDrawingData.length > 0) {
    // draw
    for (var i = 0; i < preDrawingData.length; i++) {
      const eachLine = preDrawingData[i]
      beginShape()
      for (var j in eachLine) {
        vertex(eachLine[j].point.x, eachLine[j].point.y)
      }
      endShape()
    }
  }
}