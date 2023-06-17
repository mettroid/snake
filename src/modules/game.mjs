class Game {
    start = false;
    endGame = false;
    scores;
    lives;
    phase;
    constructor(lives, scores, phase, background){
        this.lives = lives;
        this.scores = scores;
        this.phase = phase;
        this.background = background;
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
        c_1.ctx.fillText('Game Over', x, y - 40);

        let w = 150;
        let h = 37;

        c_1.ctx.save();
        c_1.ctx.fillStyle = 'gray';
        c_1.ctx.lineWidth = 5;
        c_1.ctx.shadowOffsetX = 2;
        c_1.ctx.shadowOffsetY = 2;
        c_1.ctx.shadowBlur = 2;
        c_1.ctx.shadowColor = "rgb(94, 94, 94)";
        let path = new Path2D();
        path.roundRect(x - w / 2, y, w, h, [10]);
        c_1.ctx.fill(path);
        c_1.ctx.restore();

        c_1.ctx.save();
        c_1.ctx.strokeStyle = 'black';
        c_1.ctx.font = "20px Montserrat";
        c_1.ctx.textAlign = 'center';
        c_1.ctx.textBaseline = 'middle';
        c_1.ctx.strokeText('replay', x, y + 20);
        c_1.ctx.stroke();

    } 
    winner(c_1){
        let x = Math.floor(c_1.canvas.width / 2);
        let y = Math.floor(c_1.canvas.height / 2);
        c_1.ctx.fillStyle = 'green';
        c_1.ctx.fillRect(0, 0, c_1.canvas.width, c_1.canvas.height);
    
        c_1.ctx.fillStyle = 'black';
        c_1.ctx.font = '50px comic';
        c_1.ctx.textAlign = 'center';
    
        c_1.ctx.textBaseline = 'bottom';
        c_1.ctx.fillText(`winner - snake`, x, y);
    
        c_1.ctx.textBaseline = 'top';
        c_1.ctx.fillText(`score: ${this.scores}`, x, y);
    }
    increaseScores(){
        ++this.scores;
    }
    decreaseLives(){
        --this.lives;
    }
    isWin(){
        return this.scores == 16;
    }
    isLoser(){
        return this.lives == 0;
    }

}
export { Game };