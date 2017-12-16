// conf_beyond184_illustration

// EMPTY anything is zero
const EMPTY = 0;

// directions
const NORTH = 1;
const EAST = 2;
const SOUTH = 3;
const WEST = 4;

// types of things on the ground
const ROAD  = 1;
const INTERSECTION = 2;

// types of road "contents"
const CAR = -1;
const WRECK = -2;


function Cell() {
    this.type = EMPTY;

    this.direction = EMPTY;
    this.destination = EMPTY;

    this.content = new Content();
};

function Content() {
    this.type = EMPTY;
    this.cooldown = 0;
    this.wait = 0;
}

//resolution
var resX = 8;
var resY = 8;

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
var setupMode = false;
//mode where each cell has a 1 in 10000 chance of randomly changing 



function setup() {
    res = 48;
    resX = res;
    resY = res;
    createCanvas(800, 800);
    //get dimensions
    a = parseInt(width/resX);
    b = parseInt(height/resY);

    a = 50;
    b = 50;


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

    /*
    for(var i = 5; i < a; i+=20) {
        for(var j = 0; j < b; j++) {
            createRoad(i, j, SOUTH, SOUTH);
            createRoad(i + 1, j, NORTH, NORTH);
        }
    }
    for(var j = 5; j < b; j+=10) {
        for (var i = 0; i < a; i++) {
            if (getCell(i, j).type == ROAD) {
                createIntersection(i, j, WEST, getCell(i, j).direction, WEST, getCell(i, j).destination);
            }
            else {
                createRoad(i, j, WEST, WEST);
            }
            if (getCell(i, j + 1).type == ROAD) {
                createIntersection(i, j + 1, EAST, getCell(i, j + 1).direction, EAST, getCell(i, j + 1).destination);
            }
            else {
                createRoad(i, j + 1, EAST, EAST);
            }
        }
    }


    carCounter = 0;
    for(var i = 0; i < a / 2; i++) {
        for(var j = 0; j < b / 2; j++) {
            carCounter++;
            if (getCell(i, j).type != EMPTY) {
                if (carCounter % 1 == 0) {
                    createContent(i, j, CAR, 2, 2);
                }
            }
        }
    }

    */

    createRoad(11, 10, EAST, EAST);
    createRoad(12, 10, EAST, EAST);
    createRoad(13, 10, EAST, EAST);
    createRoad(14, 10, EAST, EAST);
    createRoad(15, 10, EAST, EAST);
    createRoad(16, 10, EAST, EAST);
    createRoad(17, 10, EAST, EAST);
    createRoad(18, 10, EAST, EAST);
    createRoad(19, 10, EAST, SOUTH);
    createRoad(19, 11, SOUTH, SOUTH);
    createRoad(19, 12, SOUTH, SOUTH);
    createRoad(19, 13, SOUTH, SOUTH);
    createRoad(19, 14, SOUTH, SOUTH);
    createRoad(19, 15, SOUTH, SOUTH);
    createRoad(19, 16, SOUTH, SOUTH);
    createRoad(19, 17, SOUTH, SOUTH);
    createRoad(19, 18, SOUTH, SOUTH);
    createRoad(19, 19, SOUTH, WEST);
    createRoad(10, 19, WEST, NORTH);
    createRoad(11, 19, WEST, WEST);
    createRoad(12, 19, WEST, WEST);
    createRoad(13, 19, WEST, WEST);
    createRoad(14, 19, WEST, WEST);
    createRoad(15, 19, WEST, WEST);
    createRoad(16, 19, WEST, WEST);
    createRoad(17, 19, WEST, WEST);
    createRoad(18, 19, WEST, WEST);
    createRoad(10, 18, NORTH, NORTH);
    createRoad(10, 17, NORTH, NORTH);
    createRoad(10, 16, NORTH, NORTH);
    createRoad(10, 15, NORTH, NORTH);
    createRoad(10, 14, NORTH, NORTH);
    createRoad(10, 13, NORTH, NORTH);
    createRoad(10, 12, NORTH, NORTH);
    createRoad(10, 11, NORTH, NORTH);
    createRoad(10, 10, NORTH, EAST);

    createRoad(10, 9, WEST, WEST);
    createRoad(11, 9, WEST, WEST);
    createRoad(12, 9, WEST, WEST);
    createRoad(13, 9, WEST, WEST);
    createRoad(14, 9, WEST, WEST);
    createRoad(15, 9, WEST, WEST);
    createRoad(16, 9, WEST, WEST);
    createRoad(17, 9, WEST, WEST);
    createRoad(18, 9, WEST, WEST);
    createRoad(19, 9, WEST, WEST);
    createRoad(20, 9, NORTH, WEST);
    createRoad(20, 10, NORTH, NORTH);
    createRoad(20, 11, NORTH, NORTH);
    createRoad(20, 12, NORTH, NORTH);
    createRoad(20, 13, NORTH, NORTH);
    createRoad(20, 14, NORTH, NORTH);
    createRoad(20, 15, NORTH, NORTH);
    createRoad(20, 16, NORTH, NORTH);
    createRoad(20, 17, NORTH, NORTH);
    createRoad(20, 18, NORTH, NORTH);
    createRoad(20, 19, NORTH, NORTH);
    createRoad(10, 20, EAST, EAST);
    createRoad(11, 20, EAST, EAST);
    createRoad(12, 20, EAST, EAST);
    createRoad(13, 20, EAST, EAST);
    createRoad(14, 20, EAST, EAST);
    createRoad(15, 20, EAST, EAST);
    createRoad(16, 20, EAST, EAST);
    createRoad(17, 20, EAST, EAST);
    createRoad(18, 20, EAST, EAST);
    createRoad(19, 20, EAST, EAST);
    createRoad(20, 20, EAST, NORTH);
    createRoad(9, 20, SOUTH, EAST);
    createRoad(9, 19, SOUTH, SOUTH);
    createRoad(9, 18, SOUTH, SOUTH);
    createRoad(9, 17, SOUTH, SOUTH);
    createRoad(9, 16, SOUTH, SOUTH);
    createRoad(9, 15, SOUTH, SOUTH);
    createRoad(9, 14, SOUTH, SOUTH);
    createRoad(9, 13, SOUTH, SOUTH);
    createRoad(9, 12, SOUTH, SOUTH);
    createRoad(9, 11, SOUTH, SOUTH);
    createRoad(9, 10, SOUTH, SOUTH);
    createRoad(9, 10, SOUTH, SOUTH);

    createRoad(8, 9, WEST, WEST);
    createRoad(7, 9, WEST, WEST);
    createRoad(6, 9, WEST, WEST);
    createRoad(5, 9, WEST, NORTH);
    createRoad(5, 8, NORTH, NORTH);
    createRoad(5, 7, NORTH, NORTH);
    createRoad(5, 6, NORTH, NORTH);
    createRoad(5, 5, NORTH, EAST);
    createRoad(6, 5, EAST, EAST);
    createRoad(7, 5, EAST, EAST);
    createRoad(8, 5, EAST, EAST);
    createRoad(9, 5, EAST, SOUTH);
    createRoad(9, 6, SOUTH, SOUTH);
    createRoad(9, 7, SOUTH, SOUTH);
    createRoad(9, 8, SOUTH, SOUTH);

    createRoad(8, 10, EAST, EAST);
    createRoad(7, 10, EAST, EAST);
    createRoad(6, 10, EAST, EAST);
    createRoad(5, 10, EAST, EAST);
    createRoad(4, 10, SOUTH, EAST);
    createRoad(4, 9, SOUTH, SOUTH);
    createRoad(4, 8, SOUTH, SOUTH);
    createRoad(4, 7, SOUTH, SOUTH);
    createRoad(4, 6, SOUTH, SOUTH);
    createRoad(4, 5, SOUTH, SOUTH);
    createRoad(4, 4, WEST, SOUTH);
    createRoad(5, 4, WEST, WEST);
    createRoad(6, 4, WEST, WEST);
    createRoad(7, 4, WEST, WEST);
    createRoad(8, 4, WEST, WEST);
    createRoad(9, 4, WEST, WEST);
    createRoad(10, 4, NORTH, WEST);
    createRoad(10, 5, NORTH, NORTH);
    createRoad(10, 6, NORTH, NORTH);
    createRoad(10, 7, NORTH, NORTH);
    createRoad(10, 8, NORTH, NORTH);

    createIntersection(9, 9, WEST, SOUTH, SOUTH, WEST);
    createIntersection(10, 9, WEST, NORTH, NORTH, WEST);
    createIntersection(9, 10, EAST, SOUTH, SOUTH, EAST);
    createIntersection(10, 10, EAST, NORTH, NORTH, EAST);

    
    createContent(9, 9, CAR, 0, 0);
    createContent(9, 8, CAR, 0, 0);
    createContent(10, 9, CAR, 0, 0);
    createContent(10, 10, WRECK, 0, 50);
    createContent(19, 19, CAR, 2, 0);
    createContent(19, 20, CAR, 2, 0);
    createContent(14, 9, CAR, 2, 0);
    createContent(15, 9, CAR, 2, 0);
    createContent(16, 9, CAR, 2, 0);

    createContent(9, 9, CAR, 1, 0);
    createContent(10, 9, CAR, 1, 1);
   
    
    setupMode = true;


    //createContent(11, 9, CAR, 1, 0);
    //createContent(12, 9, CAR, 0, 0);
}

function swapDestinationFor9x9() {
    if (getCell(9, 9).destination == SOUTH) {
        getCell(9, 9).destination = WEST;
        getLastCell(9, 9).destination = WEST;
    }
    else if (getCell(9, 9).destination == WEST) {
        getCell(9, 9).destination = SOUTH;
        getLastCell(9, 9).destination = SOUTH;
    }
}


function createContent(x, y, type, cooldown, wait) {
    currentLF[x][y].content.type = type;
    currentLF[x][y].content.cooldown = cooldown;
    currentLF[x][y].content.wait = wait;

    lastLF[x][y].content.type = type;
    lastLF[x][y].content.cooldown = cooldown;
    lastLF[x][y].content.wait = wait;
}

//delta for roads - don't rewrite all of them every single step
function createIntersection(x, y, direction, iDirection, destination, iDestination) {
    currentLF[x][y].type = INTERSECTION;
    currentLF[x][y].direction = direction;
    currentLF[x][y].iDirection = iDirection;
    currentLF[x][y].destination = destination;
    currentLF[x][y].iDestination = iDestination;

    lastLF[x][y].type = INTERSECTION;
    lastLF[x][y].direction = direction;
    lastLF[x][y].iDirection = iDirection;
    lastLF[x][y].destination = destination;
    lastLF[x][y].iDestination = iDestination;
}

function createRoad(x, y, direction, destination) {
    currentLF[x][y].type = ROAD;
    currentLF[x][y].direction = direction;
    currentLF[x][y].destination = destination;

    lastLF[x][y].type = ROAD;
    lastLF[x][y].direction = direction;
    lastLF[x][y].destination = destination;
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
    var direction;
    if (i > 0) {
        direction = getLastCell(x, y).destination;
    }
    else if (i < 0) {
        direction = getLastCell(x, y).direction;
    }
    else {
        return getLastCell(x, y);
    }

    return getLastNeighborAtDirection(x, y, i, direction);
}

function getLastNeighborAtDirection(x, y, i, direction) {
    switch(direction) {
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

//traverse roads somewhat similarly to a linked list, return car count
function getCarCount(originX, originY, originDestination) {
    var carCount = 0;

    var x = originX;
    var y = originY;
    var destination = originDestination;

    var lastCell = getLastCell(x, y);

    for (var i = 0; i < 20; i++) {
        switch(destination) {
            case NORTH:
                y = y - 1; 
                break;
            case EAST:
                x = x + 1; 
                break;
            case SOUTH:
                y = y + 1; 
                break;
            case WEST:
                x = x - 1; 
                break;
        }
        
        currentCell = getLastCell(x, y);
        
        //going from origin cell to first neighbor to check ignores destination-destination matching
        if ((x != originX && y != originY) && lastCell.destination != currentCell.direction) {
            break;
        }
        
        if (currentCell.content.type == CAR) {
            carCount++;
        }

        lastCell = currentCell;
        destination = lastCell.destination;
    }
    return carCount;
}

function getCarCountBackwards(originX, originY, originDirection) {
    var carCount = 0;

    var x = originX;
    var y = originY;
    var direction = originDirection;

    var lastCell = getLastCell(x, y);

    for (var i = 0; i < 5; i++) {
        switch(direction) {
            case NORTH:
                y = y + 1; 
                break;
            case EAST:
                x = x - 1; 
                break;
            case SOUTH:
                y = y - 1; 
                break;
            case WEST:
                x = x + 1; 
                break;
        }
        
        currentCell = getLastCell(x, y);
        
        //going from origin cell to first neighbor to check ignores direction-destination matching
        if ((x != originX && y != originY) && lastCell.direction != currentCell.destination) {
            break;
        }
        
        if (currentCell.content.type == CAR) {
            carCount++;
        }

        lastCell = currentCell;
        direction = lastCell.direction;
    }
    return carCount;
}




//step process for a single cell
function cellStep(x, y) {
    if (getLastCell(x, y).type == INTERSECTION) {
        if (getLastCell(x, y).iDirection != EMPTY) {
            var carCount = getCarCountBackwards(x, y, getLastCell(x, y).direction);
            var iCarCount = getCarCountBackwards(x, y, getLastCell(x, y).iDirection);

            if (carCount > iCarCount) {
                getCell(x, y).direction = getLastCell(x, y).direction;
                getCell(x, y).iDirection = getLastCell(x, y).iDirection;
            }
            else {
                getCell(x, y).direction = getLastCell(x, y).iDirection;
                getCell(x, y).iDirection = getLastCell(x, y).direction;
            }
        }
        
        if (getLastCell(x, y).iDestination != EMPTY) {
            var carCount = getCarCount(x, y, getLastCell(x, y).destination);
            var iCarCount = getCarCount(x, y, getLastCell(x, y).iDestination);

            if (carCount < iCarCount) {
                getCell(x, y).destination = getLastCell(x, y).destination;
                getCell(x, y).iDestination = getLastCell(x, y).iDestination;
            }
            else {
                getCell(x, y).destination = getLastCell(x, y).iDestination;
                getCell(x, y).iDestination = getLastCell(x, y).destination;
            }
        }

        neighbor = getLastDirectionalNeighbor(x, y);
        iNeighbor = getLastNeighborAtDirection(x, y, -1, getLastCell(x, y).iDirection);
        if (iNeighbor.destination == getLastCell(x, y).iDirection && iNeighbor.content.type == CAR && iNeighbor.content.cooldown != 2 && iNeighbor.content.wait == 0 && neighbor.content.type == CAR && neighbor.content.wait == 0) {
                getCell(x, y).content.type = WRECK;
                getCell(x, y).content.wait = 10;
                print("crash " + iterations);
                return;
        }
        else if (iNeighbor.content.type == CAR && iNeighbor.content.cooldown != 2 && iNeighbor.content.wait == 0 && iNeighbor.destination == getLastCell(x, y).iDirection) {
            getCell(x, y).content.type = CAR;
            getCell(x, y).content.cooldown = iNeighbor.content.cooldown;
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
            return;
        }
    }

    if (getLastCell(x, y).type != EMPTY) {
        neighbor = getLastDirectionalNeighbor(x, y);
        //operate on cell "contents"
        if (getLastCell(x, y).content.type == WRECK) {
            getCell(x, y).content.type = WRECK;
            getCell(x, y).content.wait = getLastCell(x, y).content.wait - 1;
            
            if (getCell(x, y).content.wait == 0) {
                getCell(x, y).content.type = EMPTY;
            }
        }
        else if (getLastCell(x, y).content.type == EMPTY || (getLastCell(x, y).content.type == CAR && getLastCell(x, y).content.cooldown != 2 && getLastCell(x, y).content.wait == 0 && neighbor.content.cooldown != 2 && neighbor.content.wait == 0)) {
            if (neighbor.content.type == CAR && neighbor.content.wait == 0 && neighbor.destination == getLastCell(x, y).direction) {
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
                if (getCell(x, y).content.cooldown > 0 && getLastCell(x, y).type == ROAD) {
                    getCell(x, y).content.cooldown--;
                    getCell(x, y).content.wait = getCell(x, y).content.cooldown;
                }
                return;
            }
            else {
                getCell(x, y).content.type = EMPTY;
            }
        }
        else if (getLastCell(x, y).content.type == CAR) {
            //check for incoming crashes first
            neighbor = getLastDirectionalNeighbor(x, y);
            if (neighbor.destination == getLastCell(x, y).direction && neighbor.content.type == CAR && neighbor.content.cooldown != 2 && neighbor.content.wait == 0 && getLastCell(x, y).content.wait != 0) {
                print("crash " + iterations);
                getCell(x, y).content.type = WRECK;
                getCell(x, y).content.wait = 10;
                return;
            }

            if (getLastCell(x, y).content.cooldown == 2) {
                if (getLastCell(x, y).content.wait == 0) {
                    forwardsNeighbor = getLastForwardsDirectionalNeighbor(x, y);
                    if (forwardsNeighbor.type != EMPTY && forwardsNeighbor.content.type == EMPTY && forwardsNeighbor.direction == getLastCell(x, y).destination) {
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
        iterations--;
        swapFields();
    }
}

//toggle cell where the mouse is
function mousePressed() {
    x = Math.floor(mouseX/resX);
    y = Math.floor(mouseY/resY);
    print(getCell(x, y));
    if (setupMode == true) {
    }
}

function drawSquare(x, y) {
    cc = currentLF[x][y];
    push();
        rectMode(CENTER);
        translate((x + 0.5) * resX, (y + 0.5) * resY);
        noFill();
        strokeWeight(4);
        rect(0, 0, resX, resY);
        if(cc.type == ROAD) {
            stroke(0);
        }
        else if (cc.type == INTERSECTION) {
            stroke(150);
        }
        strokeWeight(4);
        push();
            switch(cc.direction) {
                case NORTH:
                    break;
                case EAST:
                    rotate(0.5 * PI);
                    break;
                case SOUTH:
                    rotate(PI);
                    break;
                case WEST:
                    rotate(-0.5 * PI);
                    break;
            }
            line(0, 0, 0, resY/2 - 8);
            if (cc.type == INTERSECTION) {
                line(-6, resY/2 - 8, 6, resY/2 - 8);
            }
        pop();

        push();
            switch(cc.destination) {
                case NORTH:
                    rotate(PI);
                    break;
                case EAST:
                    rotate(-0.5 * PI);
                    break;
                case SOUTH:
                    break;
                case WEST:
                    rotate(0.5 * PI);
                    break;
            }
            line(0, 0, 0, resY/2 - 8);
            line(8, resY/3 - 8, 0, resY/3);
            line(-8, resY/3 - 8, 0, resY/3);
        pop();
    pop();
}
        

var carCount;

function draw() {
    
    //change background depending on mode
    if(setupMode == false) {
        background(100);
        //only swap field pointers if not in setup mode
        //lifeStep();
        swapFields();
        iterations++;
    }
    else {
        background(0, 0, 255);
    }
    background(255);

    for(var i = 0; i < a; i++) {
        for(var j = 0; j < b; j++) {
            cellStep(i, j);
            cc = currentLF[i][j];

            if (cc.type != EMPTY) {
                fill(0, 0, 0);
                //rect(i * resX, j * resY, resX, resY);
                
                if (cc.content.type != EMPTY) {
                    if (cc.content.type == CAR) {
                        carCount++;
                        /*
                        switch(cc.content.cooldown) {
                            case 2:
                                fill(0, 200, 200);
                                break;
                            case 1:
                                fill(100, 200, 0);
                                break;
                            case 0:
                                fill(200, 200, 0);
                                break;
                        }
                        */
                        fill(200, 200, 200, 100);
                    }
                    else if (cc.content.type == WRECK) {
                        fill(255, 0, 0);
                    }

                    rect(i * resX, j * resY, resX, resY);
                    
                    fill(0);
                   // text(cc.content.wait, i * resX + 2, j * resY + 13);
                }
                drawSquare(i, j);
            }
        }
    }

    if (frameCount % 11 == 0) {
        //swapDestinationFor9x9();
    }

    fill(0);
    text('Mouse X = ' + parseInt(mouseX/resX) + " | Mouse Y = " + parseInt(mouseY/resY) +
         "\nIteration: " + iterations + 
         "\nSetup Mode: " + setupMode + " (Space to toggle)" +
         "\nCars: " + carCount,
         10, 20);
    carCount = 0;
}
