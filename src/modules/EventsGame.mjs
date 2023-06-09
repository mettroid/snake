class EventsGame {
    constructor(snake, game){
        this.snake = snake;
        this.game = game;
    }
    handleEvent(e){
        if(!this.game.start) return;
        this[e.code](e);
        console.log(e.code);
    }
    ArrowLeft(){
            this.snake.rightPressed || this.snake.clearPressed() && (this.snake.leftPressed = true);
    }
    ArrowRight(){
            this.snake.leftPressed || this.snake.clearPressed() && (this.snake.rightPressed = true);
    }
    ArrowUp(){
            this.snake.downPressed || this.snake.clearPressed() && (this.snake.upPressed = true);
    }
    ArrowDown(){
            this.snake.upPressed || this.snake.clearPressed() && (this.snake.downPressed = true);
    }     
}
export {EventsGame}