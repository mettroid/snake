import {Sprite} from './sprite.mjs';
class Snake extends Sprite{
    leftPressed = false;
    rightPressed = false;
    downPressed = false;
    upPressed = false;
    dx = 1;
    dy = 1;
    draw(ctx, canvas){
        this.checkKey();
        ctx.fillStyle = this.color;
        ctx.beginPath(); //head
        ctx.rect(this.x * this.cell, this.y * this.cell, this.w, this.h);
        ctx.fill();
    }
    checkKey(){
        if(this.rightPressed && this.x < 29){
            this.x += 1;
        }
        if(this.leftPressed && this.x > 0){
            this.x -= 1;
        }
        if(this.upPressed && this.y > 0){
            this.y -= 1;
        }
        if(this.downPressed && this.y < 29){
            this.y += 1;
        }
    }

}
export {Snake}