class Food {
    constructor(x, y, w, h, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    draw(canvasOpt){
        canvasOpt.ctx.fillStyle = this.color;
        canvasOpt.ctx.rect(this.x, this.y, this.w, this.h);
        canvasOpt.ctx.fill();
    }
}
export {Food}