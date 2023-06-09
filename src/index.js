import "./index.html";
import "./index.scss";
import background from "./images/back.png";
import * as Loader from "./modules/loaderPic.mjs";
import {Canvas} from './modules/canvas.mjs';

let result = document.getElementById('result');
let c_1 = new Canvas('basicCanvas', document.querySelector('.wrapField'));
c_1.create();

let eventsMenu;
let game;
let food, snake;

let cells = 30;
let cellsSize = 20;

let timer = null;

window.onload = function(){
    console.log('onload');
    start();
}
function keyDownHandler(e){
    //if(!begin) return;
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
function getTempPosition(){
    console.log();
    snake.getTempPosition();
}
function detection(){
    snake.detectWall(game);
    snake.detectEat(food, game, result);
}
function render(){
    snake.draw(c_1.ctx, game);
    food.draw(c_1.ctx);
}
function startGame(){
            let phase;
            function game_loop(){
                c_1.ctx.clearRect(0, 0, c_1.canvas.width, c_1.canvas.height);      
                
                    phase = game.phase;
                    switch(phase){
                        case 'screen_saver': 
                            game[phase](c_1);
                        break;
                        case 'game':
                                if(game.endgame) break;
                                getTempPosition();
                                detection();
                                render();
                                if(game.isWin()){
                                    setTimeout(()=>{
                                        game.phase = 'winner';
                                        game.endgame = true;
                                    }, 500);
                                }
                                if(game.isLoser()){
                                    setTimeout(()=>{
                                        game.phase = 'game_over';
                                        game.endgame = true;
                                    }, 500);
                                }
                        break;
                        case 'winner':
                            game[phase](c_1);    
                        break;
                        case 'game_over':
                            game[phase](c_1);
                        break;
                    }
                    setTimeout(game_loop, 200);
            }
            
            game_loop();
}

async function start(){
    
    try{
        let img = await Loader.loadImage(background);
        let {Game} = await import('./modules/Game.mjs');
        let {Food} = await import('./modules/food.mjs');
        let {Snake} = await import('./modules/snake.mjs');
        let {EventsMenu} = await import('./modules/EventsMenu.mjs');
        game = new Game(3, 'screen_saver', img);
        food = new Food(15, 15, cellsSize, cellsSize, 'lime');
        snake = new Snake(20, 20, cellsSize, cellsSize, 'red');
        eventsMenu = new EventsMenu(c_1, game);
        c_1.canvas.addEventListener('click', eventsMenu);
        document.addEventListener('keydown', keyDownHandler);

        startGame();
    } catch (err){
        console.log(err.message);
    }
}
function dirrect(e){
    console.log('e.code');
}