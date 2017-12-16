// conf_3dtest
// 

var heights = [];

function setup() {
    createCanvas(800, 800, WEBGL);

    for (var i = 0; i < 100; i++) {
        heights[i] = [];
        for (var j = 0; j < 100; j++) {
            if (i % 10 == 0 || j % 5 == 0) {
                heights[i][j] = 0;
            }
            else {
                heights[i][j] = Math.floor(random(500));
            }
        }
    }
}

function getBox(x, y) {
    a = 100;
    b = 100;

    x = x % a;
    y = y % b;
    //wraparound
    if(x < 0) {
        x = a + x;
    }
    else if (x >= a) {
        x = x - a;
    }
    if(y < 0) {
        y = b + y;
    }
    else if (y >= b) {
        y = y - b;
    }


    return heights[x][y];
}

function putBox(width, height, depth) {
    push();
        translate(0, 0, depth/2);
        box(width, height, depth);
    pop();
}

var x = 0;
var y = 0;
var z = 100;
var rotX = 0;
var rotY = 0;

function keyPressed() {
    if (keyCode === 87) {
        y-=80;
    }
    if (keyCode === 83) {
        y+=80;
    }
    if (keyCode === 65) {
        x-=80;
    }
    if (keyCode === 68) {
        x+=80;
    }

    mod = 0.1;
    if (keyCode === 81) {
        rotY -= mod;
    }
    if (keyCode === 69) {
        rotY += mod;
    }

    if (keyCode === 90) {
        rotX -= mod;
    }
    if (keyCode === 88) {
        rotX += mod;
    }
}

function draw() {
    
    pointLight(255, 0.01 * frameCount, 0.01 * frameCount, 0);
    //camera(2 * mouseX, 0, 2 * mouseY);
    rotateY(rotY);
    rotateX(rotX);
    translate(x, y, z);
    background(60, 60, 100);
    fill(0);
    strokeWeight(5);
    stroke(100);
    push();
    //rotateY(0.01 * frameCount);
    fill(255);
    box(10, 10, 10);
    /*
    fill(0);
    translate(400, 400, -1000);
    putBox(100, 100, 100);
    translate(100, 100);
    putBox(100, 100, 400);
    translate(100, 0);
    putBox(100, 100, 400);
    translate(100, 0);
    putBox(100, 100, 100);
    pop();
    */
    translate(0, 0, -1000);
    fill(0);
    
    putBox(100, 100, 100);

    for (var i = -100; i < 200; i++) {
        for (var j = -100; j < 200; j++) {
            if (getBox(i, j) > 0) {
                push();
                if (Math.sqrt(Math.pow(-x - 100 * i, 2) + Math.pow(-y - 100 * j, 2)) < 1000) {
                    fill(255 * Math.abs(Math.sin(i + j)));
                    translate(100 * i, 100 * j, 0);
                    putBox(100, 100, getBox(i, j));
                }
                pop();
            }
        }
    }
   
    pop();
}
