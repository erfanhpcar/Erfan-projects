
import {getInputDirection, getRotateDirection, setInputDirection, setRotateDirection} from "./input.js";
import {GRID_HEIGHT, GRID_WIDTH, GRID_WIDTH as width, MINI_GRID_WIDTH} from "./grid.js";


const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]


]

const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]


]

const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]


]

const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]


]

const iTetromino = [

        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]

]

const board = document.getElementById("board-game");
const miniGrid = document.querySelector(".mini-grid");


const Tetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
const colors = [ "#2980b9" , "#8e44ad", "#c0392b", "#d35400", "#27ae60"];

const miniGridTetrominos = [
    [1, MINI_GRID_WIDTH+1, MINI_GRID_WIDTH*2+1, 2],
    [0,MINI_GRID_WIDTH,MINI_GRID_WIDTH+1,MINI_GRID_WIDTH*2+1],
    [1,MINI_GRID_WIDTH,MINI_GRID_WIDTH+1,MINI_GRID_WIDTH+2],
    [0,1,MINI_GRID_WIDTH,MINI_GRID_WIDTH+1],
    [1,MINI_GRID_WIDTH+1,MINI_GRID_WIDTH*2+1,MINI_GRID_WIDTH*3+1]
]



createDivElements(width, GRID_HEIGHT);
let segments = document.querySelectorAll("#board-game div");

let randomTetromino = getRandomTetromino();
let nextRandomTetromino = getRandomTetromino();
let current = JSON.parse(JSON.stringify(Tetrominos[randomTetromino]));
let miniGridCurrent =  JSON.parse(JSON.stringify(miniGridTetrominos[nextRandomTetromino]));
const miniGridDivs = document.querySelectorAll(".mini-grid div");
let witchColor = randomTetromino;
let rotationRate = 0;
let currentPosition = 4;

function createDivElements(grid_width, grid_height){

    for (let i = 0; i < grid_width * (grid_height + 1); i++){
        let divElement = document.createElement('div');

        if (i >= grid_width * grid_height){
            divElement.classList.add("taken");
        }
        board.appendChild(divElement);
    }


    for (let i = 0; i < 16; i++){
        let gridDivElement = document.createElement("div");
        miniGrid.appendChild(gridDivElement);
    }


}


export function update(){


    let inputDirection = getInputDirection();
    let rotateDirection = getRotateDirection();
    if (inputDirection === 1){

        if(current[rotationRate].some(function(segment){
            return ((currentPosition + segment) % width) + 1 >= width;

        })){

            inputDirection = 0;
        }

    }else if (inputDirection === -1){

        if(current[rotationRate].some(function(segment){
            return  ((currentPosition + segment) % width) + 1 <= 1;

        })){
            inputDirection = 0;
        }

    }





    if (!current[rotationRate].some(index => {
        return (segments[(currentPosition + index + width + inputDirection)].classList.contains("taken") );

    })){
        current.forEach((rotation, index1) => {
            rotation.forEach(function(index, index2){


                index += width + inputDirection;

                current[index1][index2] = index;



            });
        });

        if(rotateDirection === 1){
            if(rotationRate === 3){
                rotationRate = 0;
            }else{

                rotationRate++;

            }
        }else if(rotateDirection === -1){
            if(rotationRate === 0){
                rotationRate = 3;
            }else{
                rotationRate--;
            }
        }
        setInputDirection(0);
        setRotateDirection(0);


    }else{

        current[rotationRate].forEach(index => {
            segments[(currentPosition + index)].classList.add("taken");
        });

        randomTetromino = nextRandomTetromino;

        current = JSON.parse(JSON.stringify(Tetrominos[nextRandomTetromino]));

        nextRandomTetromino = getRandomTetromino();

        miniGridCurrent = JSON.parse(JSON.stringify(miniGridTetrominos[nextRandomTetromino]));
    }









}

export function draw(){





    // console.log("draw " + availableTetrominos);

    segments.forEach(div => {
        if (!div.classList.contains("taken")){


            div.classList.remove("seg-part");
            div.style.backgroundColor = '';

        }
    })


    current[rotationRate].forEach(index => {


        let segmentPart = segments[(currentPosition + index)];
        segmentPart.classList.add("seg-part");
        segmentPart.style.backgroundColor = colors[randomTetromino];


    });

    miniGridDivs.forEach(div =>{
        div.classList.remove("seg-part");
        div.style.backgroundColor = '';
    })


    miniGridCurrent.forEach(index => {
        miniGridDivs[index].classList.add("seg-part");
        miniGridDivs[index].style.backgroundColor = colors[nextRandomTetromino];
    })








}


function getRandomTetromino(){
    return Math.floor(Math.random() * 5);
}

export function numberOfCompleteRows(){
    let numberOfRowsComplete = 0
    let rowsComplete = [];
    for (let i=0; i < GRID_HEIGHT; i++){
        let rowComplete = true;
        for (let j=0; j < GRID_WIDTH; j++){
            if (!segments[i * GRID_WIDTH + j].classList.contains('taken')){
                rowComplete = false;
            }
        }
        if (rowComplete === true){
            numberOfRowsComplete++;
            rowsComplete.push(i);
        }
    }

    if (numberOfRowsComplete != 0){
        clearCompletedRows(rowsComplete);

    }


    return numberOfRowsComplete;
}

function clearCompletedRows(rowsComplete){
    rowsComplete.forEach(row => {

        let takenSegments = []
        for (let i=0; i < row; i++){

            for (let j=0; j < GRID_WIDTH; j++){
                if (segments[i * GRID_WIDTH + j].classList.contains("taken")){
                    takenSegments.push((i * GRID_WIDTH + j));
                    segments[i * GRID_WIDTH + j].classList.remove("taken");
                }
            }
        }

        for (let j=0; j < GRID_WIDTH; j++){
            segments[row * GRID_WIDTH + j].classList.remove('taken');
        }

        takenSegments.forEach(index =>{
            segments[index + width].classList.add('taken');
        })

    });
}

export function checkSegmentsForDeath(){
    for (let j=0; j < GRID_WIDTH; j++){
        if (segments[j].classList.contains('taken')){
            return true;
        }
    }
    return false;
}


