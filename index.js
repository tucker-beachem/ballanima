// const backgroundColor = [230,220,190];
const sounds = Array.from({ length: 6 });

const defaultStrokeColor = [0,0,0];
const lineColor = [0, 0, 0];
const activeLineColor = [190, 20, 110];
const lineWidth = 3;
const activelineWidth = 9;

const rightEdge = {
    x1: 400,
    y1: 0,
    x2: 400,
    y2: 800,
    color: lineColor,
    width: lineWidth,
}

const leftEdge = {
    x1: 30,
    y1: 0,
    x2: 30,
    y2: 800,
    color: lineColor,
    width: lineWidth,
}

const ball1 = {
    x: 300,
    y: 400,
    r: 100,
    speed: 1,
    fillColor: [0,210,250],
    strokeColor: defaultStrokeColor,
    outlineWidth: 6,
    soundLength: 2000, 
}

const ball2 = {
    x: 300,
    y: 250,
    r: 90,
    speed: 2,
    fillColor: [50,20,220],
    strokeColor: defaultStrokeColor,
    outlineWidth: 6,
    soundLength: 500, 
}

const ball3 = {
    x: 300,
    y: 100,
    r: 80,
    speed: 3,
    fillColor: [90,210,20],
    strokeColor: defaultStrokeColor,
    outlineWidth: 6,
    soundLength: 1000, 
}

const drawCircle = ({x, y, r, fillColor, strokeColor}) => {
    stroke(strokeColor)
    fill(fillColor)
    ellipse(x, y, r)
}

const move = (ball) => {
    ball.x += ball.speed
}




const balls = [ball1, ball2, ball3]

const lines = [leftEdge, rightEdge]

const drawLine = ({x1, y1, x2, y2, color, width}) => {
    strokeWeight(width);
    stroke(color);
    line(x1, y1, x2, y2);
}

const activateLine = (line) => {
    line.color = activeLineColor
    line.width = activelineWidth

    setTimeout(() => resetLines(line), 500);
}

const resetLines = (line) => {
    line.color = lineColor;
    line.width = lineWidth;
}

const checkEdge = (ball) => {
    if(ball.x > rightEdge.x1 - ball.r/2){
        ball.speed *= -1
        ball.rightSound.play();
        activateLine(rightEdge)
    } else if(ball.x < leftEdge.x1 + ball.r/2){
        ball.speed *= -1
        ball.leftSound.play();
        activateLine(leftEdge)
    }
}


function preload(){

    sounds.forEach((sound, i) => {
        sounds[i] = loadSound(`sounds/${i}.mp3`)
    })

    console.log(sounds);

    ball1.rightSound = sounds[0];
    ball1.leftSound = sounds[1];
    ball2.rightSound = sounds[2];
    ball2.leftSound = sounds[3];
    ball3.rightSound = sounds[4];
    ball3.leftSound = sounds[5];

    // for(let i = 0; i < sounds.length; i++){
    //     sounds[i] = loadSound(`sounds/${i}.mp3`)
    // }
}

function setup(){
    createCanvas(800, 800);
    background(30,220,190);
}

function draw(){
    background(30,220,190);
    balls.forEach(ball => {
        checkEdge (ball)
        move(ball)
        drawCircle(ball)
    });
    lines.forEach(line => {
        drawLine(line)
    });

    
}