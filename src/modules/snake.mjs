import {Sprite} from './sprite.mjs';
class Snake extends Sprite{
    leftPressed = false;
    rightPressed = false;
    downPressed = false;
    upPressed = false;
    trail = [];
    tail = 3;
    draw(ctx, canvas){
        this.checkKey();
        ctx.fillStyle = this.color;
        ctx.beginPath(); //head
        for(let i = 0; i < this.trail.length; i++){
            ctx.rect(this.trail[i].x * this.cell, this.trail[i].y * this.cell, this.w, this.h);
        }
        this.trail.push({x: this.x, y: this.y});
        if(this.trail.length > 3){
            this.trail.shift();
        }
        ctx.fill();
    }
    checkKey(){
        if(this.rightPressed && this.x < 29){
            this.x += 1;
        }else if(this.leftPressed && this.x > 0){
            this.x -= 1;
        }else if(this.upPressed && this.y > 0){
            this.y -= 1;
        }else if(this.downPressed && this.y < 29){
            this.y += 1;
        }
    }

}
export {Snake}