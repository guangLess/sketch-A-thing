

function setup(){
    createCanvas(windowWidth, windowHeight);
	strokeWeight(10)
	stroke(0);
}

function draw(){
    ellipse(50, 50, 130, 130 );
}

function touchMoved() {
    line(mouseX, mouseY, pmouseX, pmouseY);
    return false;
}