class Food {
    constructor(x, y, w, h, color){
        this.x = x;
        thix.y = y;
        thix.w = w;
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