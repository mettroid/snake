class Button {
    name;
    constructor(name, c_1, w, h, offsetY, radiusRect, colorBtn, sizeShadow, colorShadow, styleText, text){
        this.xCenter = Math.ceil(c_1.canvas.width / 2);
        this.yCenter = Math.ceil(c_1.canvas.height / 2);
        this.name = name;
        this.w = w;
        this.h = h;
        this.offsetY = offsetY;
        this.radiusRect = radiusRect;
        this.colorBtn = colorBtn;
        this.sizeShadow = sizeShadow;
        this.colorShadow = colorShadow;
        this.styleText = styleText;    
        this.text = text;
    }
    draw(c_1){
        this.#button(c_1);
        this.#text(c_1);
    }
    #button(c_1){
        c_1.ctx.save();
        c_1.ctx.strokeStyle = 'black';
        c_1.ctx.fillStyle = this.colorBtn;
        c_1.ctx.beginPath();
        c_1.ctx.roundRect(this.xCenter - this.w / 2, this.yCenter - this.h / 2, this.w, this.h, [this.radiusRect]);        
        c_1.ctx.fill();
        c_1.ctx.stroke();
        c_1.ctx.closePath();
        c_1.ctx.restore();
    }
    #text(c_1){
        c_1.ctx.save();
        c_1.ctx.fillStyle = 'black';
        c_1.ctx.shadowOffsetX = this.sizeShadow;
        c_1.ctx.shadowOffsetY = this.sizeShadow;
        c_1.ctx.shadowBlur = this.sizeShadow;
        c_1.ctx.shadowColor = this.colorShadow;
        c_1.ctx.textAlign = 'center';
        c_1.ctx.textBaseline = 'middle';
        c_1.ctx.font = this.styleText;
        c_1.ctx.fillText(this.text, this.xCenter, this.yCenter + 3, this.w - 5); 

        c_1.ctx.restore();
    }
}
export {Button}