// dima_
// Dima Konev
//

cellCount = 80;

//the two fields
var lifeField = [];
var lifeField2 = [];

//variables for swapping around
var currentLF;
var lastLF;
var temp;

const EMPTY = 0;
const CAR = 1;
const WRECK = 2;

const STOPPED = 3;


function Cell(type) {
    this.type = type;
    this.cooldown = 0;
    this.wait = 0;
}

function setup() {
    createCanvas(800, 800);

    for (var i = 0; i < cellCount; i++) {
        lifeField[i] = new Cell(EMPTY);
        lifeField2[i] = new Cell(EMPTY);
    }

    currentLF = lifeField;
    lastLF = lifeField2;
    frameRate(60);

    currentLF[0].type = CAR;
    currentLF[0].cooldown = 2;
    currentLF[0].wait = 2;
    //slowest car
    currentLF[7].type = CAR;
    currentLF[7].cooldown = 1;
    currentLF[7].wait = 1;

    currentLF[10].type = WRECK;
    currentLF[10].cooldown = 20;
    currentLF[10].wait = 20;

    currentLF[17].type = CAR;
    currentLF[17].cooldown = 0;
    currentLF[17].wait = 0;
    currentLF[18].type = CAR;
    currentLF[18].cooldown = 2;
    currentLF[18].wait = 2;
}


function getLastCell(x) {
    //wraparound
    if(x < 0) {
        x = cellCount + x;
    }
    else if (x >= cellCount) {
        x = x - cellCount;
    }

    return lastLF[x];
}
function getCell(x) {
    //wraparound
    if(x < 0) {
        x = cellCount + x;
    }
    else if (x >= cellCount) {
        x = x - cellCount;
    }

    return currentLF[x];
}

function cellStep(x) {
    if (getLastCell(x).type == WRECK) {
        getCell(x).type = WRECK;
        getCell(x).cooldown = getLastCell(x).cooldown - 1;
        getCell(x).wait = getLastCell(x).wait - 1;
        
        if (getCell(x).wait == 0) {
            getCell(x).type = EMPTY;
        }
    }

    else if (getLastCell(x).type == EMPTY) {
        //put a car in an empty cell
        if (getLastCell(x - 1).type == CAR && getLastCell(x - 1).wait == 0) {
            getCell(x).type = CAR;
            getCell(x).cooldown = getLastCell(x - 1).cooldown;
            getCell(x).wait = getCell(x).cooldown;
            
            //if there is something ahead, slow down
            for (var i = 1; i < 4; i++) {
                if (getLastCell(x + i).type != EMPTY) {
                    if (getCell(x).cooldown < 2) {
                        getCell(x).cooldown++
                    }
                    getCell(x).wait = getCell(x).cooldown;
                    return;
                }
            }
            //else, speed up
            if (getCell(x).cooldown > 0) {
                getCell(x).cooldown--
                getCell(x).wait = getCell(x).cooldown;
            }
        }
        else {
            getCell(x).type = EMPTY;
        }
    }
    else if (getLastCell(x).type == CAR) {
        //check for incoming crashes first
        if (getLastCell(x - 1).type == CAR && getLastCell(x - 1).cooldown != 2 && getLastCell(x - 1).wait == 0 && getLastCell(x).wait != 0) {
            print("crash");
            getCell(x).type = WRECK;
            getCell(x).cooldown = 10;
            getCell(x).wait = 10;
            return;
        }
        if (getLastCell(x).cooldown == 2) {
            if (getLastCell(x).wait == 0) {
                if (getLastCell(x + 1).type == EMPTY) {
                    getCell(x).type = EMPTY;
                }
                else {
                    getCell(x).type = CAR;
                    getCell(x).cooldown = 2;
                    getCell(x).wait = 0; 
                }
            }
            else {
                getCell(x).type = CAR;
                getCell(x).cooldown = 2;
                getCell(x).wait = getLastCell(x).wait - 1;
            }
        }
        else if (getLastCell(x).cooldown == 1) {
            if (getLastCell(x).wait == 0) {
                //we didn't stop so go and crash
                getCell(x).type = EMPTY;
            }
            else {
                getCell(x).type = CAR;
                getCell(x).cooldown = 1;
                getCell(x).wait = 0;
            }
        }
        
        else if (getLastCell(x).cooldown == 0) {
            if (getLastCell(x + 1).type == EMPTY) {
                getCell(x).type = EMPTY;
            }
            else {
                //we didn't stop, so go and crash
                getCell(x).type = EMPTY;
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
function keyPressed() {
    if (keyCode === 190) {
        lifeStep();
    }
    if (keyCode === 188) {
        swapFields();
    }
    //c
    if (keyCode === 67) {
         getCell(Math.floor(mouseX/width * cellCount)).type = CAR;
         getCell(Math.floor(mouseX/width * cellCount)).cooldown = 2;
         getCell(Math.floor(mouseX/width * cellCount)).wait = 2;
    }
    //z
    if (keyCode === 90) {
         getCell(Math.floor(mouseX/width * cellCount)).type = WRECK;
         getCell(Math.floor(mouseX/width * cellCount)).cooldown = 10;
         getCell(Math.floor(mouseX/width * cellCount)).wait = 10;

    }
    //q
    if (keyCode === 81) {
         getCell(Math.floor(mouseX/width * cellCount)).type = EMPTY;
    }

    //q
    if (keyCode === 80) {
        autoPlay = -autoPlay;
    }

}
function lifeStep() {
    swapFields();
    for (var i = 0; i < cellCount; i++) {
        cellStep(i);
    }

}

var autoPlay = true;

function draw() {
    background(0, 0, 0);

    for (var i = 0; i < cellCount; i++) {
        if (currentLF[i].type == EMPTY) {
            fill(255, 255, 255);
        }
        else if (currentLF[i].type == CAR) {
            fill(0, 200, 200);
            text(currentLF[i].type + "\n" + currentLF[i].cooldown + "\n" + currentLF[i].wait, width/cellCount * i, height/4 - 35);
        }
        else if (currentLF[i].type == WRECK) {
            fill(200, 0, 0);
            text(currentLF[i].type + "\n" + currentLF[i].cooldown + "\n" + currentLF[i].wait, width/cellCount * i, height/4 - 35);
        }
        rect(width/cellCount * i, height/4, width/cellCount, width/cellCount);
    }
    fill(255, 0, 0);
    text(frameCount + "\n" + 
         Math.floor(mouseX/width * cellCount), 10, 10);
    if (frameCount % 10 == 0 && autoPlay == true) {
        lifeStep();
    }
}
