const canvasContainer = document.querySelector('.game-container')
const canvasWidth = canvasContainer.offsetWidth
const canvasHeight = canvasContainer.offsetHeight

console.log("HEY")

function setup() {
    let sketch = createCanvas(canvasWidth, canvasHeight)
    sketch.parent("game-container");
    background(255)
    socket.on('mouse',
        function (data) {
            console.log(data)
            stroke(127)
            line((canvasWidth * data.x) / 100, (canvasHeight * data.y) / 100, (canvasWidth * data.px) / 100, (canvasHeight * data.py) / 100);
        }
    )
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// function mouseDragged() {
//     let color = {
//         r: getRandomInt(255),
//         g: getRandomInt(255),
//         b: getRandomInt(255)
//     }
//     fill(color.r, color.g, color.b)
//     stroke(127);
//     line(mouseX, mouseY, 10, 100);
//     sendmouse(mouseX, mouseY, color);
// }

function draw() {
    if(mouseIsPressed === true) {
        stroke(127)
        let userX = 100 / (canvasWidth / mouseX)
        let userY = 100 / (canvasHeight / mouseY)
        let userPX = 100 / (canvasWidth / pmouseX)
        let userPY = 100 / (canvasHeight / pmouseY)
        let markerX = (canvasWidth * userX) / 100
        let markerY = (canvasHeight * userY) / 100
        let markerPX = (canvasWidth * userPX) / 100
        let markerPY = (canvasHeight * userPY) / 100
        line(markerX, markerY, markerPX, markerPY)
        sendmouse(userX, userY, userPX, userPY);
    }
}

function sendmouse(xPos, yPos, pxPos, pyPos) {
    console.log("sendmouse: " + xPos + " " + yPos);
    var data = {
        x: xPos,
        y: yPos,
        px: pxPos,
        py: pyPos
    };
    socket.emit('mouse', data);
}