

let inputDirection = 0;
let rotateDirection = 0;


window.addEventListener('keydown', function(e){
    switch(e.key){
        case 'a':
            inputDirection = -1;
            break;
        case 'd':
            inputDirection = 1;
            break;
    }
    switch(e.key){
        case 'q':
            rotateDirection = -1;
            break;
        case 'e':
            rotateDirection = 1;
            break;
    }


})

export function setInputDirection(inpt){
    inputDirection = inpt;
}

export function setRotateDirection(inpt){

    rotateDirection = inpt;
}


export function getInputDirection(){
    return inputDirection;
}

export function getRotateDirection(){
    return rotateDirection;
}