import "./index.html";
import "./index.scss";
import background from "./images/back.png";
import * as Loader from "./modules/loaderPic.mjs";
import {Canvas} from './modules/canvas.mjs';

let scores = document.querySelector('#scores');
let lives = document.querySelector('#lives');
let c_1 = new Canvas('basicCanvas', document.querySelector('.wrapField'));
c_1.create();

let info = document.querySelector('.info');
let eventsMenu, eventsGame;
let game;
let food, snake;
let btnStart, btnReStart;

let cells = 30;
let cellsSize = 20;

window.onload = function(){
    start();
}
function getTempPosition(){
    snake.getTempPosition();
}
function detection(){
    snake.detectWall(game);
    snake.detectEat(food, game);
    snake.trail.push({x: snake.xtemp, y: snake.ytemp});
    if(scores.innerHTML != game.scores){
        console.log(scores.innerHTML != game.scores);
        food.detectSnake(snake.trail);
    }
}
function render(){
    snake.draw(c_1.ctx, game);
    food.draw(c_1.ctx);

}
function startGame(){
            let phase;
            let deltaTime = 0;
            let lastUpdate = performance.now();
            let myReq;
            
            function game_loop(currentTime){
                    myReq = requestAnimationFrame(game_loop);
                    deltaTime = currentTime - lastUpdate;
                    if(deltaTime < 100) return;

                    console.log(myReq);
                    c_1.ctx.clearRect(0, 0, c_1.canvas.width, c_1.canvas.height);
                    phase = game.phase;
                    switch(phase){
                        case 'screen_saver': 
                            game[phase](c_1);
                            btnStart.draw(c_1);
                            
                        break;
                        case 'game':
                            if(game.endgame) break;
                            getTempPosition();
                            detection();
                            render();
                            scores.innerHTML = game.scores;
                            lives.innerHTML = game.lives;
                            if(game.isWin()){
                                setTimeout(()=>{
                                    game.phase = 'winner';
                                    game.endgame = true;
                                    info.classList.remove('info_show');
                                }, 200);
                            }
                            if(game.isLoser()){
                                setTimeout(()=>{
                                    game.phase = 'game_over';
                                    game.endgame = true;
                                    info.classList.remove('info_show');
                                }, 200);
                            }
                        break;
                        case 'winner':
                            game[phase](c_1); 
                            btnReStart.draw(c_1);   
                        break;
                        case 'game_over':
                            game[phase](c_1);
                            btnReStart.draw(c_1);
                        break;
                        case 'reload':
                            cancelAnimationFrame(myReq);
                            location.reload();
                        break;
                    }
                    lastUpdate = currentTime;
            
            }     
            myReq = requestAnimationFrame(game_loop);
}

async function start(){
    
    try{
        let img = await Loader.loadImage(background);
        let {Game} = await import('./modules/Game.mjs');
        let {Food} = await import('./modules/food.mjs');
        let {Snake} = await import('./modules/snake.mjs');
        let {EventsMenu} = await import('./modules/EventsMenu.mjs');
        let {EventsGame} = await import('./modules/EventsGame.mjs');
        let {Button} = await import('./modules/Button.mjs');
        game = new Game(3, 0,'screen_saver', img);
        food = new Food(15, 15, cellsSize, cellsSize, 'lime');
        snake = new Snake(20, 20, cellsSize, cellsSize, 'red');
        btnStart = new Button({name: 'btnStart', 
                               c_1: c_1,
                               w: 150,
                               h: 50,
                               offsetY: 3,
                               radiusRect: 5,
                               colorBtn: 'rgb(250, 4, 4)',
                               colorBorder: 'rgb(2,2,2)',
                               sizeShadow: 0,
                               colorShadow: 'rgb(250, 4, 4)',
                               styleText: '50px Serif',
                               text: 'START'});
        btnReStart = new Button({name: 'btnReStart',
                                c_1: c_1,
                                w: 150,
                                h: 50,
                                offsetY: 3,
                                radiusRect: 10,
                                colorBtn: 'rgb(104, 104, 104)',
                                colorBorder: 'rgba(0,0,0,0)',
                                sizeShadow: 3,
                                colorShadow: 'rgb(56, 55, 55)',
                                styleText: '30px Serif',
                                text: 'RESTART'});
        eventsMenu = new EventsMenu(c_1, game, btnStart, btnReStart, start);
        eventsGame = new EventsGame(snake, game);

        c_1.canvas.addEventListener('mousedown', eventsMenu);
        c_1.canvas.addEventListener('mouseup', eventsMenu);
        c_1.canvas.addEventListener('click', eventsMenu);
        document.addEventListener('keydown', eventsGame);

        startGame();
    } catch (err){
        console.log(err.message);
    }
}
