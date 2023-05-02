const draw = function(c_1, score){
    let x = Math.floor(c_1.canvas.width / 2);
    let y = Math.floor(c_1.canvas.height / 2);
    c_1.ctx.fillStyle = 'green';
    c_1.ctx.fillRect(0, 0, c_1.canvas.width, c_1.canvas.height);

    c_1.ctx.fillStyle = 'black';
    c_1.ctx.font = '50px comic';
    c_1.ctx.textAlign = 'center';

    c_1.ctx.textBaseline = 'bottom';
    c_1.ctx.beginPath();
    c_1.ctx.fillText(`winner - snake`, x, y);
    c_1.ctx.closePath();

    c_1.ctx.textBaseline = 'top';
    c_1.ctx.beginPath();
    c_1.ctx.fillText(`score: ${score}`, x, y);
    c_1.ctx.closePath();
}
const isWin = function(snake){
    return snake.score > 1;
}
export {draw, isWin};