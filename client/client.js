const connection = new WebSocket("ws://localhost:8080");
const button = document.querySelector("#send");

connection.onopen = (event) => {
  console.log("WebSocket is open now.");
};

connection.onclose = (event) => {
  console.log("WebSocket is closed now.");
};

connection.onerror = (event) => {
  console.error("WebSocket error observed:", event);
};

connection.onmessage = (event) => {
  const { mouseX, mouseY } = JSON.parse(event.data);
  fill(0);
  ellipse(mouseX, mouseY, 5, 5);
};

function setup() {
  createCanvas(400, 400);
}

function mouseDragged() {
  if (mouseX < 400 & mouseY < 400) {
    fill(0);
    ellipse(mouseX, mouseY, 5, 5);
    connection.send(JSON.stringify({ mouseX, mouseY }));
  }
  return false;
}