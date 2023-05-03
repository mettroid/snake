import {Sprite} from './sprite.mjs';
import {isEqual} from 'lodash';
class Snake extends Sprite{
    leftPressed = false;
    rightPressed = false;
    downPressed = false;
    upPressed = false;
    trail = [];
    tail = 3;
    draw(ctx, food, gamer){
        this.checkKey();
        this.trail.push({x: this.x, y: this.y});
        if(this.trail.length > this.tail){
            this.trail.shift();
        }
        ctx.fillStyle = this.color;
        ctx.beginPath();
        for(let i = 0; i < this.trail.length; i++){
            ctx.rect(this.trail[i].x * this.cell, this.trail[i].y * this.cell, this.w, this.h);
            if(this.trail.length < 2) continue; // если у нас пока одна голова , то уходим , не счем её сравнивать
            if(this.#checkCrashSelf(i, this.trail.length - 1)){
                this.#cutTail();
                gamer.lives--;
                console.log(gamer.lives);
            }
        }
        this.eat(ctx, food, gamer);
        ctx.fill();
        ctx.stroke();
    }
    checkCrashWall(){
        let head = this.trail[this.trail.length-1];
        if(head.x < 0 || 
           head.x > 29 ||
           head.y < 0 ||
           head.y > 29){ 
                return true;
        }
    }
    #checkCrashSelf(bodyPos, headPos){
              if(isEqual(this.trail[headPos], this.trail[headPos - 1])) return false; // если координаты головы идентичны координатам шеи змеи
              if(isEqual(this.trail[bodyPos], this.trail[headPos]) && bodyPos !== headPos) return true; // если координаты головы равны координатам любой части тела, кроме самой себя 
              
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
    eat(ctx, food, gamer){
        if(isEqual(this.trail[this.trail.length - 1] , food.getPosition())){
              
              gamer.score++;
              food.x = this.random(1, 30);
              food.y = this.random(1, 30);
              this.#addTail();
            }
    }
    setStratPosition(){
        this.x = 20;
        this.y = 20; 
        this.clearPressed();
        this.upPressed = true;
        this.#cutTail();
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