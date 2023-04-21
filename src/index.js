import "./index.html";
import "./index.scss";
import picPath from "./images/back.png";
import * as Loader from "./modules/loaderPic.mjs";
import {Canvas} from './modules/canvas.mjs';

let c_1 = new Canvas('basicCanvas', document.querySelector('.wrapField'));
c_1.create();

window.onload = function(){
    start();
}
function func(){

}
async function start(){
    try{
        let img = await Loader.loadImage(picPath);
        let x = Math.ceil(c_1.canvas.width / 2);
        let y = Math.ceil(c_1.canvas.height / 2);
        c_1.ctx.drawImage(img,0,0);
        c_1.ctx.textAlign = 'center';
        c_1.ctx.font = '50px Serif';
        c_1.ctx.fillText('Hello', x, y);
        c_1.canvas.addEventListener('click', func);
    } catch (err){
        alert(err);
    }

}
