import "./index.html";
import "./index.scss";
import background from "./images/back.png";
import * as Loader from "./modules/loaderPic.mjs";
import {Canvas} from './modules/canvas.mjs';
import {pathObj} from './modules/globalPath.mjs';

let c_1 = new Canvas('basicCanvas', document.querySelector('.wrapField'));
c_1.create();

let food, snake;

let cells = 30;
let cellsSize = 20;

let timer = null;

window.onload = function(){
    console.log('onload');
    start();
}
function keyDownHandler(e){
    switch(e.code){
        case "ArrowLeft":
            snake.leftPressed = true;
        break;
        case "ArrowRight":
            snake.rightPressed = true;
        break;
        case "ArrowUp":
            snake.upPressed = true;
        break;
        case "ArrowDown":
            snake.downPressed = true;
            
            console.log('!');
        break;
    }
}
function keyUpHandler(e){
    switch(e.code){
        case "ArrowLeft":
            snake.leftPressed = false;
        break;
        case "ArrowRight":
            snake.rightPressed = false;
        break;
        case "ArrowUp":
            snake.upPressed = false;
        break;
        case "ArrowDown":
            snake.downPressed = false;
        break;
    }
}
async function game(e){
    let isPointInPath = c_1.ctx.isPointInPath(pathObj[0], e.offsetX, e.offsetY);
    if(isPointInPath){
        let {Food} = await import('./modules/food.mjs'); // загрузим класс для еды
        let {Snake} = await import('./modules/snake.mjs');
        food = new Food(15, 15, cellsSize, cellsSize, 'lime');
        snake = new Snake(20, 20, cellsSize, cellsSize, 'red');
        timer = window.setInterval(function(){
            c_1.ctx.clearRect(0, 0, c_1.canvas.width, c_1.canvas.height);
            food.draw(c_1.ctx);
            snake.draw(c_1.ctx, c_1.canvas);
        }, 100);
    }
}

async function start(){
    
    try{
        let img = await Loader.loadImage(background);
        let ScrSaver = await import('./modules/screensaver.mjs');
            ScrSaver.draw(c_1, img); // начинаем отрисовку фона
        c_1.canvas.addEventListener('click', game);
        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);
    } catch (err){
        alert(err.message);
    }
}
function dirrect(e){
    console.log('e.code');
}