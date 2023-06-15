import {Sprite} from './sprite.mjs'
import {isEqual} from 'lodash';
class Food extends Sprite{
    draw(ctx){
        this.x = this.xtemp;
        this.y = this.ytemp;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.x * this.cell, this.y * this.cell, this.w, this.h);
        ctx.stroke();
        ctx.fill();

    }
    getTempPosition(){
        return {x: this.xtemp, y: this.ytemp}
    }
    detectSnake(trail){
        this.xtemp = this.random(0, 30);
        this.ytemp = this.random(0, 30);
        for(let i = 0, len = trail.length; i < len; i++){
            if(isEqual(trail[i], this.getTempPosition())){
                this.detectSnake(trail);
                break;
            }
        }
    }

}
export {Food}