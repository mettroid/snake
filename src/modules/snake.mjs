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
        for(let i = 0; i <= this.trail.length - 1; i++){
            ctx.rect(this.trail[i].x * this.cell, this.trail[i].y * this.cell, this.w, this.h);
            if(i === this.trail.length - 1){ this.#checkCrashSelf(i, i) }
        }
        this.trail.push({x: this.x, y: this.y});
        if(this.trail.length > this.tail){
            this.trail.shift();
        }
        this.eat(food);
        ctx.fill();
        ctx.stroke();
    }
    checkCrashWall(){
        let endObj = this.trail[this.trail.length-1];
        if(endObj.x < 0 || 
           endObj.x > 30 ||
           endObj.y < 0 ||
           endObj.y > 30){ 
                return true;
        }
    }
    #checkCrashSelf(pos, length){
    outer: for(let j = 0; j < length; j++){
                if(isEqual(this.trail[j], this.trail[pos])){
                    this.trail.splice(0, this.trail.length - 3);
                    this.tail = 3;
                    break outer;
                }
            }
    }
    checkKey(){
        if(this.rightPressed){
            this.x += 1;
        }else if(this.leftPressed){
            this.x -= 1;
        }else if(this.upPressed){
            this.y -= 1;
        }else if(this.downPressed){
            this.y += 1;
        }
    }
    eat(food){
        if(isEqual(this.trail[this.trail.length - 1] , food.getPosition())){
              let result = document.getElementById('result');
              result.innerHTML = Number(result.innerHTML) + 1;

              food.x = this.random(1, 30);
              food.y = this.random(1, 30);
              this.addTail();
            }
    }
    clearPressed(){
        this.leftPressed = false;
        this.rightPressed = false;
        this.downPressed = false;
        this.upPressed = false;
        return true;
    }
    crash(){

    }
    addTail(){
        this.tail++;
    }

}
export {Snake}