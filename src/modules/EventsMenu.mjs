import * as Mouse from './Mouse.mjs';
class EventsMenu {
    event_1 = false;
    event_2 = false;
    constructor(c_1, game, btnStart){
        this.c_1 = c_1;
        this.game = game;  
        this.btnStart = btnStart;  
    }
    handleEvent(e){
        this[e.type](e);
    }
    click(e){
        switch(this.game.phase){
            case 'screen_saver':
                console.log(this.event_1 + ' ' + this.event_2);
                if(this.event_1 && this.event_2){
                        let info = document.querySelector('.info');
                        info.classList.add('info_show');
                        this.game.start = true;
                        this.game.phase = 'game';                        
                }    
            break;
            case 'game':
            
            break;
            case 'winner':
            case 'game_over':

            break;
        }
     
    }
    mousedown(e){
        this.getDetect(e, 'event_1'); 
    }
    mouseup(e){
        this.getDetect(e, 'event_2');
    }
    getDetect(e, etemp){
        if(e.button !== 0) return;
        let { x, y } = Mouse.coords(this.c_1.canvas, e);
        if( x > this.btnStart.xCenter - this.btnStart.w / 2 
        &&  x < this.btnStart.xCenter + this.btnStart.w / 2
        &&  y > this.btnStart.yCenter - this.btnStart.h / 2
        &&  y < this.btnStart.yCenter + this.btnStart.h / 2 ){
            this[etemp] = true;
        } else {
            this[etemp] = false;
        }
    }
}
export {EventsMenu}