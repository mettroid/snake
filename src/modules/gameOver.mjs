const draw = function(c_1){
    c_1.ctx.clearRect(0, 0, c_1.canvas.width, c_1.canvas.height);
    let x = Math.floor(c_1.canvas.width / 2);
    let y = Math.floor(c_1.canvas.height / 2);
    c_1.ctx.fillStyle = 'red';
    c_1.ctx.font = '50px serif';
    c_1.ctx.textAlign = 'center';
    c_1.ctx.textBaseline = 'middle';
    c_1.ctx.fillText('Game Over', x, y);
}
export {draw}