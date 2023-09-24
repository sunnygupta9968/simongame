let gameSeq=[];
let userSeq=[];
let btnColor=["red", "green", "yellow", "purple"];
let started=false;
let level=0;
let highestScore=0;
const audio=new Audio("gamewin.wav");
const gameOver=new Audio("gameOver.mp3");
h4=document.querySelector("h4");
document.addEventListener("keypress", function(){
    if(started==false){
    console.log("Game Started");
    }
    started=true;
    if(level==0){
        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("flash");
    audio.play();
    setTimeout(function(){
        btn.classList.remove("flash");
        
    },250);
    
} 
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
} 




function levelUp(){
    userSeq=[];
    level++;
    h4.innerText=`Level ${level}`;
    let randomIdx=Math.floor(Math.random()*4);
    console.log(randomIdx);
    let randomColor=btnColor[randomIdx];
    let randomBtn=document.querySelector(`.${randomColor}`);
    gameSeq.push(`"${randomColor}"`);
    gameFlash(randomBtn);
    console.log(randomColor);
    if(highestScore<=level){
        highestScore=level;
    }
}
function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
        setTimeout(levelUp,1000);
        
    }
    }
    else{
        h4.innerHTML=`Game Over! Score is <b>${level}</b><br>Press any key to restart the game`;
      reset();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");
    
    userSeq.push(`"${userColor}"`);
    checkAns(userSeq.length-1);
   

}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
    
}


function reset(){
    started=false;
    gameSeq=[]; 
    userSeq=[];
    let hiScore=document.querySelector(".highest");
hiScore.innerText=`Highst Score : ${highestScore}`;
    level=0;
    gameOver.play();
}