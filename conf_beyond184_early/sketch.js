// conf_beyond_184_early

// directions
const NORTH = 0;
const EAST = 1;
const SOUTH = 2;
const WEST = 3;

// types of things on the ground
const EMPTY = 0;
const ROAD  = 1;

// types of road "contents"
const CAR = -1;
const WRECK = -2;

function Cell() {
    this.type = EMPTY;
    this.content = new Content();
};

function Content() {
    this.type = EMPTY;
    this.cooldown = 0;
    this.wait = 0;
}

//resolution
var resX = 16;
var resY = 16;

//the two fields
var lifeField = [];
var lifeField2 = [];

//variables for swapping around
var currentLF;
var lastLF;
var temp;

//dimensions of the field
var a;
var b;

var iterations = 0;

//mode to place cells
var setupMode = true;
//mode where each cell has a 1 in 10000 chance of randomly changing 



function setup() {
    createCanvas(800, 800);
    //get dimensions
    a = parseInt(width/resX);
    b = parseInt(height/resY);

    a = 50;
    b = 50;

    frameRate(10);

    //create two empty fields
    for(var i = 0; i < a; i++) {
        lifeField[i] = [];
        lifeField2[i] = [];
        for(var j = 0; j < b; j++) {
            lifeField[i][j] = new Cell();
            lifeField2[i][j] = new Cell();
        }
    }
 

    currentLF = lifeField;
    lastLF = lifeField2;

    createRoad(11, 10, ROAD, EAST);
    createRoad(12, 10, ROAD, EAST);
    createRoad(13, 10, ROAD, EAST);
    createRoad(14, 10, ROAD, EAST);
    createRoad(15, 10, ROAD, EAST);
    createRoad(16, 10, ROAD, EAST);
    createRoad(17, 10, ROAD, EAST);
    createRoad(18, 10, ROAD, EAST);
    createRoad(19, 10, ROAD, EAST);
    createRoad(19, 11, ROAD, SOUTH);
    createRoad(19, 12, ROAD, SOUTH);
    createRoad(19, 13, ROAD, SOUTH);
    createRoad(19, 14, ROAD, SOUTH);
    createRoad(19, 15, ROAD, SOUTH);
    createRoad(19, 16, ROAD, SOUTH);
    createRoad(19, 17, ROAD, SOUTH);
    createRoad(19, 18, ROAD, SOUTH);
    createRoad(19, 19, ROAD, SOUTH);
    createRoad(10, 19, ROAD, WEST);
    createRoad(11, 19, ROAD, WEST);
    createRoad(12, 19, ROAD, WEST);
    createRoad(13, 19, ROAD, WEST);
    createRoad(14, 19, ROAD, WEST);
    createRoad(15, 19, ROAD, WEST);
    createRoad(16, 19, ROAD, WEST);
    createRoad(17, 19, ROAD, WEST);
    createRoad(18, 19, ROAD, WEST);
    createRoad(10, 18, ROAD, NORTH);
    createRoad(10, 17, ROAD, NORTH);
    createRoad(10, 16, ROAD, NORTH);
    createRoad(10, 15, ROAD, NORTH);
    createRoad(10, 14, ROAD, NORTH);
    createRoad(10, 13, ROAD, NORTH);
    createRoad(10, 12, ROAD, NORTH);
    createRoad(10, 11, ROAD, NORTH);
    createRoad(10, 10, ROAD, NORTH);

    createRoad(9, 9, ROAD, WEST);
    createRoad(10, 9, ROAD, WEST);
    createRoad(11, 9, ROAD, WEST);
    createRoad(12, 9, ROAD, WEST);
    createRoad(13, 9, ROAD, WEST);
    createRoad(14, 9, ROAD, WEST);
    createRoad(15, 9, ROAD, WEST);
    createRoad(16, 9, ROAD, WEST);
    createRoad(17, 9, ROAD, WEST);
    createRoad(18, 9, ROAD, WEST);
    createRoad(19, 9, ROAD, WEST);
    createRoad(20, 9, ROAD, NORTH);
    createRoad(20, 10, ROAD, NORTH);
    createRoad(20, 11, ROAD, NORTH);
    createRoad(20, 12, ROAD, NORTH);
    createRoad(20, 13, ROAD, NORTH);
    createRoad(20, 14, ROAD, NORTH);
    createRoad(20, 15, ROAD, NORTH);
    createRoad(20, 16, ROAD, NORTH);
    createRoad(20, 17, ROAD, NORTH);
    createRoad(20, 18, ROAD, NORTH);
    createRoad(20, 19, ROAD, NORTH);
    createRoad(10, 20, ROAD, EAST);
    createRoad(11, 20, ROAD, EAST);
    createRoad(12, 20, ROAD, EAST);
    createRoad(13, 20, ROAD, EAST);
    createRoad(14, 20, ROAD, EAST);
    createRoad(15, 20, ROAD, EAST);
    createRoad(16, 20, ROAD, EAST);
    createRoad(17, 20, ROAD, EAST);
    createRoad(18, 20, ROAD, EAST);
    createRoad(19, 20, ROAD, EAST);
    createRoad(20, 20, ROAD, EAST);
    createRoad(9, 20, ROAD, SOUTH);
    createRoad(9, 19, ROAD, SOUTH);
    createRoad(9, 18, ROAD, SOUTH);
    createRoad(9, 17, ROAD, SOUTH);
    createRoad(9, 16, ROAD, SOUTH);
    createRoad(9, 15, ROAD, SOUTH);
    createRoad(9, 14, ROAD, SOUTH);
    createRoad(9, 13, ROAD, SOUTH);
    createRoad(9, 12, ROAD, SOUTH);
    createRoad(9, 11, ROAD, SOUTH);
    createRoad(9, 10, ROAD, SOUTH);
    createRoad(9, 10, ROAD, SOUTH);

    //createContent(9, 9, CAR, 0, 0);
    //createContent(10, 10, WRECK, 0, 30);
    createContent(19, 19, CAR, 2, 0);
    createContent(19, 20, CAR, 2, 0);
}

function createContent(x, y, type, cooldown, wait) {
    currentLF[x][y].content.type = type;
    currentLF[x][y].content.cooldown = cooldown;
    currentLF[x][y].content.wait = wait;
    lastLF[x][y].content.type = type;
    lastLF[x][y].content.cooldown = cooldown;
    lastLF[x][y].content.wait = wait;
}


function createRoad(x, y, type, direction) {
    currentLF[x][y].type = type;
    currentLF[x][y].direction = direction;
    lastLF[x][y].type = type;
    lastLF[x][y].direction = direction;
}

function getCell(x, y) {
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

    return currentLF[x][y];
}
function getLastCell(x, y) {
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

    return lastLF[x][y];
}

function getLastNeighborWithDirectionalOffset(x, y, i) {
    switch(getCell(x, y).direction) {
        case NORTH:
            return getLastCell(x, y - i); 
        case EAST:
            return getLastCell(x + i, y); 
        case SOUTH:
            return getLastCell(x, y + i); 
        case WEST:
            return getLastCell(x - i, y); 
    }
}

// returns a cell depending on given cell's direction
function getLastDirectionalNeighbor(x, y) {
    return getLastNeighborWithDirectionalOffset(x, y, -1);
}
// returns a cell depending on given cell's direction
function getLastForwardsDirectionalNeighbor(x, y) {
    return getLastNeighborWithDirectionalOffset(x, y, 1);
}

//if there is something ahead, return true
function isThereAnObstacleAhead(x, y) {
    for (var i = 1; i < 4; i++) {
        neighbor = getLastNeighborWithDirectionalOffset(x, y, i); 
        if (neighbor.type != ROAD || neighbor.content.type != EMPTY) {
            return true;
        }
    }
    return false;
}

//step process for a single cell
function cellStep(x, y) {
    if (getLastCell(x, y).type == ROAD) {
        //operate on cell "contents"
        if (getLastCell(x, y).content.type == WRECK) {
            getCell(x, y).content.type = WRECK;
            getCell(x, y).content.wait = getLastCell(x, y).content.wait - 1;
            
            if (getCell(x, y).content.wait == 0) {
                getCell(x, y).content.type = EMPTY;
            }
        }
        else if (getLastCell(x, y).content.type == EMPTY) {
            neighbor = getLastDirectionalNeighbor(x, y);
            if (neighbor.content.type == CAR && neighbor.content.wait == 0) {
                getCell(x, y).content.type = CAR;
                getCell(x, y).content.cooldown = neighbor.content.cooldown;
                getCell(x, y).content.wait = getCell(x, y).content.cooldown;
                
                //if there is something ahead, slow down
                if (isThereAnObstacleAhead(x, y) == true) {
                    if (getCell(x, y).content.cooldown < 2) {
                        getCell(x, y).content.cooldown++;
                    }
                    getCell(x, y).content.wait = getCell(x, y).content.cooldown;
                    return;
                }
                //else, speed up
                if (getCell(x, y).content.cooldown > 0) {
                    getCell(x, y).content.cooldown--;
                    getCell(x, y).content.wait = getCell(x, y).content.cooldown;
                }
            }
            else {
                getCell(x, y).content.type = EMPTY;
            }
        }
        else if (getLastCell(x, y).content.type == CAR) {
            //check for incoming crashes first
            neighbor = getLastDirectionalNeighbor(x, y);
            if (neighbor.content.type == CAR && neighbor.content.cooldown != 2 && neighbor.content.wait == 0 && getLastCell(x, y).content.wait != 0) {
                print("crash");
                getCell(x, y).content.type = WRECK;
                getCell(x, y).content.cooldown = 10;
                return;
            }

            if (getLastCell(x, y).content.cooldown == 2) {
                if (getLastCell(x, y).content.wait == 0) {
                    if (getLastForwardsDirectionalNeighbor(x, y).content.type == EMPTY) {
                        getCell(x, y).content.type = EMPTY;
                    }
                    else {
                        getCell(x, y).content.type = CAR;
                        getCell(x, y).content.cooldown = 2;
                        getCell(x, y).content.wait = 0; 
                    }
                }
                else {
                    getCell(x, y).content.type = CAR;
                    getCell(x, y).content.cooldown = 2;
                    getCell(x, y).content.wait = getLastCell(x, y).content.wait - 1;
                }
            }
            else if (getLastCell(x, y).content.cooldown == 1) {
                if (getLastCell(x, y).content.wait == 0) {
                    //we didn't stop so go and crash
                    getCell(x, y).content.type = EMPTY;
                }
                else {
                    getCell(x, y).content.type = CAR;
                    getCell(x, y).content.cooldown = 1;
                    getCell(x, y).content.wait = 0;
                }
            }
            
            else if (getLastCell(x, y).content.cooldown == 0) {
                //go no matter what
                getCell(x, y).content.type = EMPTY;
            }
        }
    }
}

//swaps the two fields
function swapFields() {
    temp = currentLF;
    currentLF = lastLF;
    lastLF = temp;
}

//perform a single step
function lifeStep() {
    swapFields();
    for(var i = 0; i < a; i++) {
        for(var j = 0; j < b; j++) {
            cellStep(i, j);
        }
    }
    iterations++;
}
function keyPressed() {
    //mode to place cells on screen
    if (key == ' ') {
        setupMode = !setupMode;
    }
    if (keyCode === 67) {
    }
    //place a bunch of random cells on screen
    if (keyCode === 82) {
    }
    if (keyCode === 190) {
        lifeStep();
    }
    if (keyCode === 188) {
        swapFields();
    }
}

//toggle cell where the mouse is
function mousePressed() {
    x = Math.floor(mouseX/resX);
    y = Math.floor(mouseY/resY);
    print(getCell(x, y).content);
    if (setupMode == true) {
    }
}


function draw() {
    
    //change background depending on mode
    if(setupMode == false) {
        background(100);
        //only swap field pointers if not in setup mode
        lifeStep();
    }
    else {
        background(0, 0, 255);
    }

    for(var i = 0; i < a; i++) {
        for(var j = 0; j < b; j++) {
            cc = currentLF[i][j];

            if (cc.type == ROAD) {
                fill(0, 0, 0);
                rect(i * resX, j * resY, resX, resY);
                
                t = "";
                switch(cc.direction) {
                    case NORTH:
                        t = "^";
                        break;
                    case EAST:
                        t = ">";
                        break;
                    case SOUTH:
                        t = "V";
                        break;
                    case WEST:
                        t = "<";
                        break;
                    default:
                        t = " ";
                }
                fill(255);
                text(t, i * resX + 5, j * resY + 13);
                
                if (cc.content.type != EMPTY) {
                    if (cc.content.type == CAR) {
                        fill(200, 200, 0);
                    }
                    else if (cc.content.type == WRECK) {
                        fill(255, 0, 0);
                    }

                    rect(i * resX, j * resY, resX, resY);
                    
                    fill(255);
                    text(cc.content.wait, i * resX, j * resY + 13);
                }
            }
        }
    }

    fill(255);
    text('Mouse X = ' + parseInt(mouseX/resX) + " | Mouse Y = " + parseInt(mouseY/resY) +
         "\nIteration: " + iterations + 
         "\nSetup Mode: " + setupMode + " (Space to toggle)", 
         10, 20);
}
