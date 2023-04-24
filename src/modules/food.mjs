import {Sprite} from './sprite.mjs'
class Food extends Sprite{
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.rect(this.x * this.cell, this.y * this.cell, this.w, this.h);
        ctx.fill();
    }
}
export {Food}