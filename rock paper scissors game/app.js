const userOptions = document.querySelector(".user-options");
const youCounter = document.querySelector("#you-counter");
const youResult = document.querySelector("#you-result");
const computerCounter = document.querySelector("#computer-counter");
const computerResult = document.querySelector("#computer-result");

let uCounter = 0;
let cCounter = 0;
userOptions.addEventListener("click", function(e){
    let userChoice = e.target.parentNode.id;

    let options = ["rock", "paper", "scissors"];
    let random = Math.floor(Math.random() * 3);
    let computerChoice = options[random];
    
    if(userChoice == computerChoice){
        insert("user", userChoice, "lose");
        insert("computer", computerChoice, "lose");
    }else if(userChoice == "rock" && computerChoice == "paper"){
        insert("user", userChoice, "lose");
        insert("computer", computerChoice, "win");
        cCounter++;
        computerCounter.innerHTML = cCounter;
    }else if(userChoice == "rock" && computerChoice == "scissors"){
        insert("user", userChoice, "win");
        insert("computer", computerChoice, "lose");
        uCounter++;
        youCounter.innerHTML = uCounter;
    }else if(userChoice == "paper" && computerChoice == "rock"){
        insert("user", userChoice, "win");
        insert("computer", computerChoice, "lose");
        uCounter++;
        youCounter.innerHTML = uCounter;
    }else if(userChoice == "paper" && computerChoice == "scissors"){
        insert("user", userChoice, "lose");
        insert("computer", computerChoice, "win");
        cCounter++;
        computerCounter.innerHTML = cCounter;
    }else if(userChoice == "scissors" && computerChoice == "rock"){
        insert("user", userChoice, "lose");
        insert("computer", computerChoice, "win");
        cCounter++;
        computerCounter.innerHTML = cCounter;
    }else if(userChoice == "scissors" && computerChoice == "paper"){
        insert("user", userChoice, "win");
        insert("computer", computerChoice, "lose");
        uCounter++;
        youCounter.innerHTML = uCounter;

    }
});



function insert(side ,object, clas){
    let resultContainer
    
    if(side == "user"){
        
        resultContainer = youResult;
        
    }else if(side == "computer"){
        resultContainer = computerResult;
    }
    
    
    switch(object){
        case "rock":
            let content1 = document.createElement("h1")
            content1.innerHTML = "✊";
            
            content1.classList.add(clas);
            resultContainer.prepend(content1);
            break;
        case "paper":
            let content2 = document.createElement("h1")
            content2.innerHTML = "✋";
            content2.classList.add(clas);
            resultContainer.prepend(content2);
            break;
        case "scissors":
            let content3 = document.createElement("h1")
            content3.innerHTML = "✌️";
            content3.classList.add(clas);
            resultContainer.prepend(content3);
            break;
    }
}