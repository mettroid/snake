import {pathObj} from './globalPath.mjs';
const draw = function(c, img){       // c = canvasOpt
    let x = Math.ceil(c.canvas.width / 2);
    let y = Math.ceil(c.canvas.height / 2);
    let w = 120;
    let h = 50;
    c.ctx.drawImage(img,0,0);
    c.ctx.fillStyle = 'red';
    let path = new Path2D();
    path.rect(x - w/2, y - h/2, w, h);
    c.ctx.fill(path);

    c.ctx.fillStyle = 'black';
    c.ctx.textAlign = 'center';
    c.ctx.textBaseline = 'middle';
    c.ctx.font = '50px Serif';
    c.ctx.fillText('Hello', x, y);

    pathObj[0] = path;
}
export {draw}