import {update as updateSegments, draw as drawSegments, numberOfCompleteRows, checkSegmentsForDeath} from "./segments.js";








    let lastFrameTime = 0;
    const refreshInOneSecond = 2;
    const scoreBoard = document.getElementById("score");
    let score = 0;
    let gameDeath = false;






    function main(currentTime){

        if (gameDeath){
            if(confirm("you lose!!!! " + "your score: " + score + " refresh?")){
                location.reload();
            }else{
                return;
            }
        }
        window.requestAnimationFrame(main);

        let secondsSinceLastFrame = (currentTime - lastFrameTime) / 1000;

        if(secondsSinceLastFrame < 1 / refreshInOneSecond) return;

        lastFrameTime = currentTime;


        update();
        draw();
    }


    window.requestAnimationFrame(main);

    function update(){
        checkDeath();
        checkScore();
        updateSegments();
    }

    function draw(){

        drawSegments();
    }


    function checkScore(){

        score += numberOfCompleteRows() * 50;
        scoreBoard.textContent = score;

    }

    function checkDeath(){
        if(checkSegmentsForDeath()){
            gameDeath = true
        }
    }
