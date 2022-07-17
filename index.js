// [xPos, yPos, color]
let dataset = [];
let predictMode = false;

// Get canvas
let canvas = document.getElementById("imgCanvas");
let context = canvas.getContext("2d");
context.fillStyle = "#0000ff";

// Add listeners
document.getElementById("colorpicker").addEventListener("change", function (e) {
  let color = e.target.value;
  context.fillStyle = color;
});
canvas.addEventListener("click", draw);
document.getElementById("predict").addEventListener("change", function () {
  predictMode = document.getElementById("predict").checked;
});

// Draw function and push to datase
function draw(e) {
  let pos = getMousePos(canvas, e);
  posx = pos.x;
  posy = pos.y;
  if (predictMode) {
    const knn = new KNN(dataset);
    context.fillStyle = knn.predict(posx, posy, 5);
  }
  context.beginPath();
  context.arc(posx, posy, 10, 0, 2 * Math.PI);
  context.fill();
  if (!predictMode) dataset.push([posx, posy, context.fillStyle]);
}

function getMousePos(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

function resetCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
