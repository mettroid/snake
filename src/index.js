import "./index.html";
import "./index.scss";
import back from "./images/back.png";
import {Canvas} from './modules/canvas.mjs';

let c_1 = new Canvas('basicCanvas', document.querySelector('.wrapField'));
c_1.create();

window.onload = function(){
    start();
}
function loadImage(path){
    return new Promise(function(resolve, reject){
        let img = new Image();
        img.src = path;
    
        img.addEventListener('load', function(){
            resolve(img);
        });
        img.addEventListener('error', function(){
            reject(new Error('ERR'));
        });
    });
}
async function start(){
    try{
        let img = await loadImage(back);
        c_1.ctx.drawImage(img,0,0);
    } catch (err){
        alert(err);
    }

}


