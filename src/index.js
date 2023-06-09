import "./index.html";
import "./index.scss";
import background from "./images/back.png";
import * as Loader from "./modules/loaderPic.mjs";
import { Canvas } from './modules/Sanvas.mjs';
import { buttonsSettings } from "./modules/ButtonsSettings.mjs";
import { Animation } from "./modules/Animation.mjs";

let scores = document.querySelector('#scores');
let lives = document.querySelector('#lives');
let c_1 = new Canvas('basicCanvas', document.querySelector('.wrapField'));
let animate = new Animation();
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
function iterAnimations(){
    animate.getAnim().forEach((anim, ind, arr)=> anim() );
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

                  
                    animate.updateTime(deltaTime);
                    iterAnimations();
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
        let {Food} = await import('./modules/Food.mjs');
        let {Snake} = await import('./modules/Snake.mjs');
        let {EventsMenu} = await import('./modules/EventsMenu.mjs');
        let {EventsGame} = await import('./modules/EventsGame.mjs');
        let {Button} = await import('./modules/Button.mjs');
        game = new Game(3, 0,'screen_saver', img);
        food = new Food(15, 15, cellsSize, cellsSize, 'lime');
        snake = new Snake(20, 20, cellsSize, cellsSize, 'red');
        btnStart = new Button(c_1, buttonsSettings.btnStart);
        btnReStart = new Button(c_1, buttonsSettings.btnReStart);
        eventsMenu = new EventsMenu(c_1, game, btnStart, btnReStart, animate);
        eventsGame = new EventsGame(snake, game);

        c_1.canvas.addEventListener('mousedown', eventsMenu);
        c_1.canvas.addEventListener('mouseup', eventsMenu);
        c_1.canvas.addEventListener('click', eventsMenu);
        c_1.canvas.addEventListener('mousemove', eventsMenu)
        document.addEventListener('keydown', eventsGame);

        startGame();
    } catch (err){
        console.log(err.message);
    }
}
