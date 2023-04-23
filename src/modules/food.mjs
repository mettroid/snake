class Food {
    constructor(x, y, w, h, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
    }
}
export {Food}