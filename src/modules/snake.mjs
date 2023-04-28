import {Sprite} from './sprite.mjs';
import {isEqual} from 'lodash';
class Snake extends Sprite{
    leftPressed = false;
    rightPressed = false;
    downPressed = false;
    upPressed = false;
    trail = [];
    tail = 3;
    draw(ctx, food){
        this.checkKey();
        ctx.fillStyle = this.color;
        ctx.beginPath(); //head
        for(let i = 0; i < this.trail.length; i++){
            ctx.rect(this.trail[i].x * this.cell, this.trail[i].y * this.cell, this.w, this.h);
        }
        this.trail.push({x: this.x, y: this.y});
        if(this.trail.length > this.tail){
            this.trail.shift();
        }
        this.eat(food);
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
    eat(food){
        if(isEqual(this.trail[this.trail.length - 1] , food.getPosition())){
              food.x = this.random(1, 30);
              food.y = this.random(1, 30);
              this.addTail();
            }
    }
    addTail(){
        this.tail++;
    }

}
export {Snake}