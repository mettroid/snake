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
        this.trail.push({x: this.x, y: this.y});
        if(this.trail.length > this.tail){
            this.trail.shift();
        }
        ctx.fillStyle = this.color;
        ctx.beginPath();
        for(let i = 0; i < this.trail.length; i++){
            ctx.rect(this.trail[i].x * this.cell, this.trail[i].y * this.cell, this.w, this.h);
            if(this.#checkCrashSelf(i, this.trail.length - 1)){
                this.#cutTail();
                break;
            }
        }

        this.eat(ctx, food);
        ctx.fill();
        ctx.stroke();
    }
    checkCrashWall(){
        let endObj = this.trail[this.trail.length-1];
        if(endObj.x < 0 || 
           endObj.x > 29 ||
           endObj.y < 0 ||
           endObj.y > 29){ 
                return true;
        }
    }
    #checkCrashSelf(pos, len){
              return isEqual(this.trail[pos], this.trail[len]) && pos !== len;
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
    eat(ctx, food){
        if(isEqual(this.trail[this.trail.length - 1] , food.getPosition())){
              let result = document.getElementById('result');
              result.innerHTML = Number(result.innerHTML) + 1;

              food.x = this.random(1, 30);
              food.y = this.random(1, 30);
              this.#addTail();
            }
    }
    clearPressed(){
        this.leftPressed = false;
        this.rightPressed = false;
        this.downPressed = false;
        this.upPressed = false;
        return true;
    }
    #cutTail(){
        this.trail.splice(0, this.trail.length - 3);
        this.tail = 3;
    }
    #addTail(){
        this.tail++;
    }

}
export {Snake}