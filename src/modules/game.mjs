class Game {
    start = false;
    endGame = false;
    scores;
    lives;
    phase;
    myReq;
    constructor(lives, scores, phase, background){
        this.lives = lives;
        this.scores = scores;
        this.phase = phase;
        this.background = background;
        this.myReq = this.myReq;
    }
    screen_saver(c_1){
        c_1.ctx.save();
        c_1.ctx.drawImage(this.background, 0, 0);
        c_1.ctx.fillStyle = 'red';
        c_1.ctx.restore();
    }    
    game_over(c_1){
        let x = Math.floor(c_1.canvas.width / 2);
        let y = Math.floor(c_1.canvas.height / 2);
        c_1.ctx.fillStyle = 'blue';
        c_1.ctx.fillRect(0, 0, c_1.canvas.width, c_1.canvas.height);
        
        c_1.ctx.fillStyle = 'red';
        c_1.ctx.font = '50px serif';
        c_1.ctx.textAlign = 'center';
        c_1.ctx.textBaseline = 'middle';
        c_1.ctx.fillText('Game Over', x, y - 60);

    } 
    winner(c_1){
        let x = Math.floor(c_1.canvas.width / 2);
        let y = Math.floor(c_1.canvas.height / 2);
        c_1.ctx.fillStyle = 'green';
        c_1.ctx.fillRect(0, 0, c_1.canvas.width, c_1.canvas.height);
    
        c_1.ctx.fillStyle = 'black';
        c_1.ctx.font = '50px comic';
        c_1.ctx.textAlign = 'center';
    
        c_1.ctx.textBaseline = 'alphabetic';
        c_1.ctx.fillText(`winner - snake`, x, y - 90);
    
        c_1.ctx.textBaseline = 'top';
        c_1.ctx.fillText(`score:${this.scores}`, x, y - 80);
    }
    increaseScores(){
        ++this.scores;
    }
    decreaseLives(){
        --this.lives;
    }
    isWin(){
        return this.scores == 1;
    }
    isLoser(){
        return this.lives == 0;
    }

}
export { Game };