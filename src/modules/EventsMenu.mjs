import * as Mouse from './Mouse.mjs';
class EventsMenu {
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
                    let { x, y } = Mouse.coords(this.c_1.canvas, e);
                    if( x > this.btnStart.xCenter - this.btnStart.w / 2 
                    &&  x < this.btnStart.xCenter + this.btnStart.w / 2
                    &&  y > this.btnStart.yCenter - this.btnStart.h / 2
                    &&  y < this.btnStart.yCenter + this.btnStart.h / 2 ){
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
}
export {EventsMenu}