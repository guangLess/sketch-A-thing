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

drawRef.on('value', snap => console.log("===> snap",snap.val()))

function setup() {
  canvas = createCanvas(windowWidth, windowHeight)
  canvas.mousePressed(startPath)
  canvas.mouseReleased(endPath)
  background(51)
  smooth()
  noFill()
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

    //console.log("---currentPath--->>", currentPath)
    if (currentPath.length > 2) {
      const pointx = currentPath.slice(-3)[0].x
      const pointy = currentPath.slice(-3)[0].y

      if (pointx !== point.x && pointy !== point.y) {
        const currentColor = colorV
        //const eachColor = color((255- currentColor), (300 - currentColor), currentColor)
        const eachColor = [(255- currentColor), (300 - currentColor), currentColor]
        const strokeV = map(currentColor, 0, 255, 0.1, 25)
        const eachPoint = new Pixel(point, eachColor, strokeV)
        drawRef.push(eachPoint)
        store.drawPathWith(eachPoint)
        colorV += 1
      }
    }
    if (colorV === 250) colorV = 0
  }
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
}