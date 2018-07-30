function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  frameRate(10000);
  noCursor();

}

function draw() {
   ellipse(mouseX, mouseY, 50, 50);
}