class Sprite {
    constructor(x, y, w, h, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.cell = w;
        this.color = color;
        this.xtemp = x;
        this.ytemp = y;
    }   
    random(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }  
}
export {Sprite}