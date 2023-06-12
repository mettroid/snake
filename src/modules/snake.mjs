import {Sprite} from './sprite.mjs';
import {isEqual} from 'lodash';
class Snake extends Sprite{
    leftPressed = false;
    rightPressed = false;
    downPressed = false;
    upPressed = false;
    trail = [];
    tail = 3;
    draw(ctx, game){
        this.trail.push({x: this.xtemp, y: this.ytemp});
        if(this.trail.length > this.tail){
            this.trail.shift();
        }
        ctx.fillStyle = this.color;
        ctx.beginPath();
        for(let i = 0; i < this.trail.length; i++){
            ctx.rect(this.trail[i].x * this.cell, this.trail[i].y * this.cell, this.w, this.h);
            if(this.trail.length < 2) continue; // если у нас пока одна голова , то уходим , не счем её сравнивать
            if(this.#derectSelfTail(i, this.trail.length - 1)){
                this.#cutTail();
                game.lives--;
                console.log(game.lives);
            }
        }
        ctx.fill();
        ctx.stroke();
    }
    detectWall(game){
        if(this.xtemp < 0 || 
           this.xtemp > 29 ||
           this.ytemp < 0 ||
           this.ytemp > 29){ 
                game.decreaseLives();
                this.getStratPosition();
        }
    }
    #derectSelfTail(bodyPos, headPos){
              if(isEqual(this.trail[headPos], this.trail[headPos - 1])) return false; // если координаты головы идентичны координатам шеи змеи
              if(isEqual(this.trail[bodyPos], this.trail[headPos]) && bodyPos !== headPos) return true; // если координаты головы равны координатам любой части тела, кроме самой себя 
              
    }
    getTempPosition(){
        if(this.rightPressed){
            this.xtemp += 1;
        }else if(this.leftPressed){
            this.xtemp -= 1;
        }else if(this.upPressed){
            this.ytemp -= 1;
        }else if(this.downPressed){
            this.ytemp += 1;
        }
    }
    detectEat(food, game){
        if( this.xtemp === food.x 
        &&  this.ytemp === food.y ){   
            
              game.increaseScores();
              food.x = this.random(1, 30);
              food.y = this.random(1, 30);
              this.#addTail();
              
            }
    }
    getStratPosition(){
        this.xtemp = 20;
        this.ytemp = 20;
        this.trail.length = 0; 
        this.clearPressed();
        this.upPressed = true;
        this.tail = 3;
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