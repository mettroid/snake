class Food {
    constructor(x, y, w, h, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.cell = w;
        this.color = color;
    } 
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.rect(this.x * this.cell, this.y * this.cell, this.w, this.h);
        ctx.fill();
    }
}
export {Food}