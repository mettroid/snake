import "./index.html";
import "./index.scss";
import picPath from "./images/back.png";
import * as Loader from "./modules/loaderPic.mjs";
import {Canvas} from './modules/canvas.mjs';
import {pathObj} from './modules/globalPath.mjs';

let c_1 = new Canvas('basicCanvas', document.querySelector('.wrapField'));
c_1.create();

let food, snake;

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
        food = new Food(100,100,20,20,'lime');
        snake = new Snake(400,400,13,50,'red');
        requestAnimationFrame(function game(time){
            c_1.ctx.clearRect(0, 0, c_1.canvas.width, c_1.canvas.height);
            food.draw(c_1.ctx);
            snake.draw(c_1.ctx, c_1.canvas);
    
            requestAnimationFrame(game);
        });
    }
}

async function start(){
    
    try{
        let img = await Loader.loadImage(picPath);
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
c_1.canvas.addEventListener('keypress', function(e){
    console.log(e);
});