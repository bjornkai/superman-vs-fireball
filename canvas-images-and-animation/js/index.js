// get the canvas tag using .getElementById() method
const myCanvas = document.getElementById("my-canvas");

// context has all the methods for drawing things
const ctx = myCanvas.getContext("2d");

// global variables:
    let score = 0;
    let isOver = false;

function drawBackground(){
    ctx.fillStyle = "pink";
    // 1000 ===> width of the canvas which I got from the index.html
    // 500 ===> is the height of the canvas which I also got from the index.html
    ctx.fillRect(0, 0, 1000, 500);

    // add some text
    ctx.fillStyle = "green";
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${score} `, 800, 50);
}
// drawBackground();

const fireballImg = new Image();
const supermanImg = new Image();

// "src" has to point as the image is used in HTML file
fireballImg.src = "images/fireball.png";
supermanImg.src = "images/superman.png";

let fireballX = 800;
let fireballY = 200;

let supermanX = 0;
let supermanY = 200;


// fireballImg.onload = function(){
//     // ctx.drawImage(whichImage, x, y, width, height);
//     ctx.drawImage(fireballImg, fireballX, fireballY, 50, 50);
// }

// supermanImg.onload = function(){
//     // ctx.drawImage(whichImage, x, y, width, height);
//     ctx.drawImage(supermanImg, supermanX, supermanY, 150, 150);
// }

// MOVING SUPERMAN!

document.onkeydown = function(event){
    // console.log(event.keyCode);
    switch(event.keyCode){
        case 37:// left
            supermanX -= 10;
            break;
        case 39: // right
            supermanX += 10;
            break;
        case 38: // up
            supermanY -= 10;
            break; 
        case 40: // down
            supermanY += 10;
            break;
    }
}

// ANIMATE THE CANVAS 

function drawingLoop(){
    // erase the whole canvas before drawing everything again

    //            x  y  width height
    //            ^  ^    ^    ^
    //            |  |    |    |
    ctx.clearRect(0, 0, 1000, 500);

    drawBackground();

    // start moving fireball by changing it X coordinate in every loop call
    fireballX -= 5;

    // when the fireball disappears from the canvas
    if(fireballX < -50){
        // set its x again to fireballX=1000
        fireballX = 1000;
        // and for each ball pick random Y in range 0 to 500 (which is height of the canvas)
        fireballY = Math.floor(Math.random() * 450);
    }

    drawEverything();

    if(isOver === false)


    // re-draw the whole sceen
    requestAnimationFrame(function(){
        // sets up a recursive loop (function calls itself multiple times)
        drawingLoop();
    });
}

    function drawEverything(){
  // ctx.drawImage(whichImage, x, y, width, height);
  ctx.drawImage(fireballImg, fireballX, fireballY, 50, 50);

  // ctx.drawImage(whichImage, x, y, width, height);
  ctx.drawImage(supermanImg, supermanX, supermanY, 150, 150);

    if(checkCollision(supermanX, supermanY, fireballX, fireballY)){
        // console.log("CRASHED!!!");
        gameOver();
    }


    if(fireballX === 0){
        score++;
    }
}

function checkCollision(obj1x, obj1y, obj2x, obj2y){
    // supermanY + superman-height that is >= fireballY
    return obj1y + 100 >= obj2y
    // supermanY <= fireballY + fireball-height
        && obj1y <= obj2y + 50
        // supermanX + superman-width >= fireballX
        && obj1x + 10 >= obj2x
        // supermanX <= fireballX + fireball-width
        && obj1x <= obj2x + 50
}

function gameOver(){
    // clears the canvas because I dont want to see alive superman or fireball
    ctx.clearRect(0, 0, 1000, 500);
    // redraws the background
    drawBackground();
    // creates superman-tired image
    const tiredSupermanImg = new Image();
    // points to the src of the image
    tiredSupermanImg.src = "images/superman-tired.png";
    tiredSupermanImg.onload = function(){
        ctx.drawImage(tiredSupermanImg, 480, 300, 150, 150);
    }
    // change the value of isOver to true
    isOver = true;
    // displays Game Over
    ctx.font= "bold 70px Arial";
    ctx.fillStyle= "red";
    ctx.fillText("Game Over", 400, 225);
}

// call drawingLoop() to start looping (after this point it will recursively call itself)
drawingLoop();
