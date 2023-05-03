import "./index.html";
import "./index.scss";
import background from "./images/back.png";
import * as Loader from "./modules/loaderPic.mjs";
import {Canvas} from './modules/canvas.mjs';
import {pathObj} from './modules/globalPath.mjs';
import * as GameOver from './modules/gameOver.mjs';
import * as Winner from './modules/winner.mjs';

let c_1 = new Canvas('basicCanvas', document.querySelector('.wrapField'));
c_1.create();

let start = false;
let food, snake;

let cells = 30;
let cellsSize = 20;

let timer = null;

window.onload = function(){
    console.log('onload');
    init();
}
function keyDownHandler(e){
    if(!start) return;
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
    if(!pathObj[0]) return;
    let isPointInPath = c_1.ctx.isPointInPath(pathObj[0], e.offsetX, e.offsetY);
    if(isPointInPath){
        start = true; 
        delete pathObj[0];
        let {Food} = await import('./modules/food.mjs'); // загрузим класс для еды
        let {Snake} = await import('./modules/snake.mjs');
        food = new Food(15, 15, cellsSize, cellsSize, 'lime');
        snake = new Snake(20, 20, cellsSize, cellsSize, 'red');

        timer = window.setInterval(function(){
            c_1.ctx.clearRect(0, 0, c_1.canvas.width, c_1.canvas.height);
            food.draw(c_1.ctx);
            snake.draw(c_1.ctx, food);

            if(snake.checkCrashWall()){  // если столкнулись со стеной
                window.clearInterval(timer);
                GameOver.draw(c_1);
                setTimeout(function(){
                    document.location.reload();
                }, 2000);
            }
            if(Winner.isWin(snake)){
                clearInterval(timer);
                Winner.draw(c_1, snake.score);
                setTimeout(function(){
                    document.location.reload();
                }, 2000);
            }
        }, 100);
    }
}

async function init(){
    
    try{
        let img = await Loader.loadImage(background);
        let ScrSaver = await import('./modules/screensaver.mjs');
            ScrSaver.draw(c_1, img); // начинаем отрисовку фона
        c_1.canvas.addEventListener('click', game);
        document.addEventListener('keydown', keyDownHandler);
    } catch (err){
        alert(err.message);
    }
}
function dirrect(e){
    console.log('e.code');
}