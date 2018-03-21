/* eslint-disable */

var drawing = []
var currentPath = [];
var isDrawing = false;

const store = createStore([])
var colorV = 0
var currentKey

var database = firebase.database()
var drawRef = firebase.database().ref('drawing')
var currentLineRef = firebase.database().ref('tempLine')
var lineCount

const preDrawingData = []
var count = 0

drawRef.on('value', snap => {
  snap.forEach(data => {
    const fireValue = data.val()
    preDrawingData.push(fireValue)
  })
  count = preDrawingData.length
})

function setup() {
  canvas = createCanvas(windowWidth, windowHeight)
  canvas.mousePressed(startPath)
  canvas.mouseReleased(endPath)
  background(51)
  smooth()
  noFill()

  strokeWeight(30)
  stroke(255,163,3)
  point(100,400)
}

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
  store.currentPath = new Path()
  store.addPath()

  count += 1
  lineCount = 'line' + (count).toString(16)

  // save the last or first key or something?
  const startPoint = {
    x: mouseX,
    y: mouseY
  }

  currentLineRef.set({0: null})

  // add path
  /*
  const testP = 0//{path : null}//new Pixel(startPoint, [0, 0, 0], 1)}
  drawRef.push(testP)
  drawRef.on('child_added', (snapshot, prevChildKey) => {
    console.log('>--key should change--->>>', snapshot.key, prevChildKey)
    currentKey = snapshot.key
  })*/
  //
  const htext = document.getElementById('lines')
  htext.innerText = currentKey
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
      y: Math.floor(mouseY)
    }

    //Fixme: currentPath should be called tracker? or move it somewhere else
    //if (currentPath.length === 5) currentPath = []
    currentPath.push(point)

    if (currentPath.length > 2) {
      const pointx = currentPath.slice(-3)[0].x
      const pointy = currentPath.slice(-3)[0].y


      if (pointx !== point.x && pointy !== point.y) {
        const currentColor = colorV.toFixed(2)
         eachColor = [255,163,3]//[(255 - currentColor), (300 - currentColor), currentColor]
         strokeV = 1//map(currentColor, 0, 255, 0, 25)
        const eachPoint = new Pixel(point, eachColor, strokeV.toFixed(2))
        currentLineRef.push(eachPoint)        
        store.drawPathWith(eachPoint)
        //colorV += 1
      }
    }
    if (colorV === 250) colorV = 0
  }

  // drawing with current status

  for (var i = 0; i < store.getState().length; i++) {
    var path = store.getState()[i].getPath()
    beginShape()
    for (var j = 0; j < path.length; j++) {
      const colorData = path[j].color
      const strokeData = path[j].stroke
      //const color = color(colorData[0], colorData[1], colorData[2])
      stroke(color(colorData[0], colorData[1], colorData[2]))
      strokeWeight(strokeData)
      vertex(path[j].point.x, path[j].point.y)
    }
    endShape()
  }

  // drawing from firebase 

  //FIXME: this should be a node tree structure....
  if (preDrawingData.length > 0)
  {
    //delete 'hello world'
    // draw
    for (var i = 0; i < preDrawingData.length; i++) {
      const eachLine = preDrawingData[i]
      beginShape()
      for (var j in eachLine) {
        const colorData = eachLine[j].color
        const strokeData = eachLine[j].stroke
       //const color = color(colorData[0], colorData[1], colorData[2])
       stroke(color(colorData[0], colorData[1], colorData[2]))
       strokeWeight(strokeData)
       vertex(eachLine[j].point.x, eachLine[j].point.y)
       //rect(preDrawingData[j].point.x, preDrawingData[j].point.y, strokeData, strokeData)
       //point(preDrawingData[j].point.x, preDrawingData[j].point.y)
     }
      endShape()
   }
  }
  
}