class Gamer {
    score = 0;
    pathButton;
    constructor(lives){
        this.lives = lives;
    }
    gameOver(c_1){
        let x = Math.floor(c_1.canvas.width / 2);
        let y = Math.floor(c_1.canvas.height / 2);
        c_1.ctx.fillStyle = 'red';
        c_1.ctx.fillRect(0, 0, c_1.canvas.width, c_1.canvas.height);
        
        c_1.ctx.fillStyle = 'blue';
        c_1.ctx.font = '50px serif';
        c_1.ctx.textAlign = 'center';
        c_1.ctx.textBaseline = 'middle';
        c_1.ctx.fillText('Game Over', x, y);
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
        c_1.ctx.fillText(`score: ${this.score}`, x, y);
    }
    isWin(){
        return this.score == 6;
    }
    screenSaver(c_1, img){
        let x = Math.ceil(c_1.canvas.width / 2);
        let y = Math.ceil(c_1.canvas.height / 2);
        let w = 150;
        let h = 50;
        c_1.ctx.drawImage(img,0,0);
        c_1.ctx.fillStyle = 'red';
        let path = new Path2D();   // создание пути кнопки для старта 
        path.rect(x - w/2, y - h/2, w, h);
        c_1.ctx.fill(path);
    
        c_1.ctx.fillStyle = 'black'; // отрисовка текста кнопки
        c_1.ctx.textAlign = 'center';
        c_1.ctx.textBaseline = 'middle';
        c_1.ctx.font = '50px Serif';
        c_1.ctx.fillText('START', x, y);
    
        this.pathButton = path;
    }

}
export { Gamer };