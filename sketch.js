/* eslint-disable */


var drawing = []
var currentPath = [];
var isDrawing = false;

const store = createStore([])

// pTest = new Pixel(0,0,0)
// console.log("---->>", pTest)

var colorV = 0
//var tempColor = [0,0,0]

var database = firebase.database()
var drawRef = firebase.database().ref('drawing')

// drawRef.on('value', snap => console.log("===> snap",snap.val()))
//const testPix = new Pixel({x:10, y:10}, [0,0,0], 1)
// drawRef.push(testPix)

const preDrawingData = []
drawRef.once('value', snap => {
    console.log("===> snap", snap.val())
    snap.forEach( data => {
      //console.log(data.key, data.val())
      const fireValue = data.val()
      const eachPix = new Pixel(fireValue.point, fireValue.color, fireValue.stroke)
      preDrawingData.push(eachPix)
    })
  }
)

function setup() {
  canvas = createCanvas(windowWidth, windowHeight)
  canvas.mousePressed(startPath)
  canvas.mouseReleased(endPath)
  background(51)
  smooth()
  noFill()

  strokeWeight(30)
  stroke(255,255,255)
  point(100,400)
}

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
  store.currentPath = new Path()
  store.addPath()
  const htext = document.getElementById('lines')
  htext.innerText = drawing.length
}

function endPath() {
  isDrawing = false;
  //console.log('<->', drawing.length)

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

    if (currentPath.length > 2) {
      const pointx = currentPath.slice(-3)[0].x
      const pointy = currentPath.slice(-3)[0].y

      if (pointx !== point.x && pointy !== point.y) {
        const currentColor = colorV
        //const eachColor = color((255- currentColor), (300 - currentColor), currentColor)
        const eachColor = [(255 - currentColor), (300 - currentColor), currentColor]
        const strokeV = map(currentColor, 0, 255, 0.1, 25)
        const eachPoint = new Pixel(point, eachColor, strokeV)
        drawRef.push(eachPoint)
        store.drawPathWith(eachPoint)
        colorV += 1
      }
    }
    if (colorV === 250) colorV = 0
  }


  // drawing with current status

  for (var i = 0; i < store.getState().length; i++) {
    var path = store.getState()[i].getPath()
    beginShape()
    //console.log("------>>", path)
    for (var j = 0; j < path.length; j++) {
      const colorData = path[j].color
      const strokeData = path[j].stroke
      //const color = color(colorData[0], colorData[1], colorData[2])
      stroke(color(colorData[0], colorData[1], colorData[2], 0.95))
      strokeWeight(strokeData)
      vertex(path[j].point.x, path[j].point.y)
    }
    endShape()
  }
  

  // drawing from firebase 

  if (preDrawingData.length > 1)
  {
      //beginShape()
    for (var j = 0; j < preDrawingData.length; j++) {
      const colorData = preDrawingData[j].color
      const strokeData = preDrawingData[j].stroke
      //const color = color(colorData[0], colorData[1], colorData[2])
      stroke(color(colorData[0], colorData[1], colorData[2], 0.95))
      strokeWeight(strokeData)
      vertex(preDrawingData[j].point.x, preDrawingData[j].point.y)
      rect(preDrawingData[j].point.x, preDrawingData[j].point.y, strokeData, strokeData)

      //point(preDrawingData[j].point.x, preDrawingData[j].point.y)
    }
    //endShape()
  }
}