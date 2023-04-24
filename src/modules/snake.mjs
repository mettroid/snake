class Snake {
    leftPressed = false;
    rightPressed = false;
    downPressed = false;
    upPressed = false;
    dx = 1;
    dy = 1;
    constructor(x, y, w, h, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.cell = w;
        this.color = color;
    }
    draw(ctx, canvas){
        if(this.leftPressed && this.x - this.w/2 > 0){
            this.x -= 1;
        }
        if(this.rightPressed && this.x + this.w/2 < canvas.width){
            this.x += 1;
        }

        ctx.fillStyle = this.color;
        ctx.beginPath(); //head
        ctx.rect(this.x * this.cell, this.y * this.cell, this.w, this.h);
        ctx.fill();
    }

}
export {Snake}