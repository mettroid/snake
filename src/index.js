import "./index.html";
import "./index.scss";
import background from "./images/back.png";
import * as Loader from "./modules/loaderPic.mjs";
import {Canvas} from './modules/canvas.mjs';

let result = document.getElementById('result');
let c_1 = new Canvas('basicCanvas', document.querySelector('.wrapField'));
c_1.create();

let begin = false;
let gamer;
let food, snake;

let cells = 30;
let cellsSize = 20;

let timer = null;

window.onload = function(){
    console.log('onload');
    start();
}
function keyDownHandler(e){
    if(!begin) return;
    switch(e.code){
        case "ArrowLeft":
            snake.rightPressed || snake.clearPressed() && (snake.leftPressed = true);
        break;
        case "ArrowRight":
            snake.leftPressed || snake.clearPressed() && (snake.rightPressed = true);
        break;
        case "ArrowUp":
            snake.downPressed || snake.clearPressed() && (snake.upPressed = true);
        break;
        case "ArrowDown":
            snake.upPressed || snake.clearPressed() && (snake.downPressed = true);
        break;
    }
}
async function game(e){
    if(!gamer.pathButton) return;
    let isPointInPath = c_1.ctx.isPointInPath(gamer.pathButton, e.offsetX, e.offsetY);
    if(isPointInPath){
        begin = true; 
        gamer.pathButton = null;

        timer = window.setInterval(function(){
            c_1.ctx.clearRect(0, 0, c_1.canvas.width, c_1.canvas.height);
            food.draw(c_1.ctx);
            snake.draw(c_1.ctx, food, gamer, result);

            if(snake.checkCrashWall()){  // если столкнулись со стеной
                gamer.lives--;
                console.log(gamer.lives);
                snake.setStratPosition();
                if(gamer.lives === 0){ 
                    window.clearInterval(timer);
                    setTimeout(function(){
                        document.location.reload();
                    }, 2000);
                    gamer.gameOver(c_1);
                }
            }
            if(gamer.isWin()){
                clearInterval(timer);
                setTimeout(function(){
                    document.location.reload();
                }, 2000);
                gamer.winner(c_1);
            }
        }, 100);
    }
}

async function start(){
    
    try{
        let img = await Loader.loadImage(background);
        let {Gamer} = await import('./modules/game.mjs');
        let {Food} = await import('./modules/food.mjs');
        let {Snake} = await import('./modules/snake.mjs');
        gamer = new Gamer(3);
        food = new Food(15, 15, cellsSize, cellsSize, 'lime');
        snake = new Snake(20, 20, cellsSize, cellsSize, 'red');
        gamer.screenSaver(c_1, img);
        c_1.canvas.addEventListener('click', game);
        document.addEventListener('keydown', keyDownHandler);
    } catch (err){
        alert(err.message);
    }
}
function dirrect(e){
    console.log('e.code');
}