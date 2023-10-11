//game constants and variables
let inputdir = { x: 0, y: 0 };
const foodsound = new Audio('music/food.mp3');
const gameoversound = new Audio('music/gameover.mp3');
const movesound = new Audio('music/move.mp3');
const musicsound = new Audio('music/music.mp3');
let speed = 10 ; 
let lastPaintTime = 0;
let snakearr = [
    { x: 13, y: 15 }
]

food = { x: 6, y: 7 };
let score=0;

//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function iscollide(snake)
{
    //if you bump into yourself
    for(let i=1;i<snakearr.length;i++)
    {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)
        {
            return true;
        }
    }
    //if u bump into the wall
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
        {
            return true;
        }
}

function gameEngine() {
    //part 1:updating the snake array
    if(iscollide(snakearr))
    {
        gameoversound.play();
        musicsound.pause();
        inputdir={x:0,y:0};
        alert("Game over. press any key to play again");
        snakearr=[{x:13,y:15}];
        // musicsound.play();
        score=0;
    }

    //if you have eaten the food, incremenet the score and regenrate the food
    if(snakearr[0].y===food.y && snakearr[0].x===food.x)
    {
        foodsound.play();
        score++;
        if(score>hiscoreval)
        {
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="Highscore : " + hiscoreval;

        }
        scoreBox.innerHTML = "Score : " + score;
        snakearr.unshift({x:snakearr[0].x + inputdir.x , y:snakearr[0].y + inputdir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }
    //moving the snake
    for(let i=snakearr.length-2;i>=0;i--)
    {
        // const element=array[i];
        snakearr[i+1]={...snakearr[i]}; //imp new object banaya hai(triple dots se) 
    }
    snakearr[0].x+=inputdir.x;
    snakearr[0].y+=inputdir.y;
    //part 2: display the snake and food
    //display the snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

//main logic starts here
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval= JSON.parse(hiscore);
    hiscoreBox.innerHTML="Highscore : " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 } //start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x=0;
            inputdir.y=-1;
            break;
        case "ArrowDown":
            console.log ("ArrowDown");
            inputdir.x=0;
            inputdir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x=-1;
            inputdir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x=1;
            inputdir.y=0;
            break;
        default:
            break;
    }
});
