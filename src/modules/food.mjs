import {Sprite} from './sprite.mjs'
class Food extends Sprite{
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.x * this.cell, this.y * this.cell, this.w, this.h);
        ctx.fill();

    }
    getPosition(){
        return {x: this.x, y: this.y}
    }
}
export {Food}