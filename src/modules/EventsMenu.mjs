import * as Mouse from './Mouse.mjs';
class EventsMenu {
    event_1 = false;
    event_2 = false;
    event_3 = false;
    halfAnim = false;
    constructor(c_1, game, btnStart, btnReStart, animate){
        this.c_1 = c_1;
        this.game = game;  
        this.btnStart = btnStart;  
        this.btnReStart = btnReStart;  
        this.animate = animate;
    }
    handleEvent(e){
        this[e.type](e);
    }
    click(e){
        if(!this.event_1 || !this.event_2) return;
        switch(this.game.phase){
            case 'screen_saver':
                console.log(this.event_1 + ' ' + this.event_2);
                
                        let info = document.querySelector('.info');
                        info.classList.add('info_show');
                        this.game.start = true;
                        this.game.phase = 'game';                          
            break;
            case 'game':
            
            break;
            case 'winner':
            case 'game_over':          
                 this.game.phase = 'reload';  
            break;
        }
     
    }
    mousedown(e){
        this.getDetect(e, 'event_1'); 
    }
    mouseup(e){
        this.getDetect(e, 'event_2');
    }    
    mousemove(e){
        this.getDetect(e, 'event_3');
        if(this.event_3){
            if(this.halfAnim) return;
            let currBtn = this.defineButton();
            this.animate.addAnimation(
                {
                    obj: this[currBtn],
                    changes: [
                                [
                                   { prop: "w", to: 180, ms: 200 },
                                   { prop: "h", to: 40, ms: 200 },
                                   { prop: "textSize", to: 40, ms: 200 }
                                ],
                                        
                    ]
                }

            );
            this.halfAnim = true;
        } else {
            if(!this.halfAnim) return;
            let currBtn = this.defineButton();
            this.animate.addAnimation({
                obj: this[currBtn],
                changes: [
                    [
                        { prop: "w", to: 150, ms: 200 },
                        { prop: "h", to: 50, ms: 200 },
                        { prop: "textSize", to: 50, ms: 200 }
                    ]
                ]
            });
            this.halfAnim = false;
        }
    }
    getDetect(e, etemp){
        if( e.button !== 0 ) return;
        if( this.game.phase === 'game' ) return;
        let currBtn = this.defineButton();
        let { x, y } = Mouse.coords(this.c_1.canvas, e);
        if( x > this[currBtn].xCenter - this[currBtn].w / 2 
        &&  x < this[currBtn].xCenter + this[currBtn].w / 2
        &&  y > this[currBtn].yCenter - this[currBtn].h / 2
        &&  y < this[currBtn].yCenter + this[currBtn].h / 2 ){
            this[etemp] = true;
        } else {
            this[etemp] = false;
        }
    }    

    defineButton(){
        switch(this.game.phase){
            case 'screen_saver':
                return 'btnStart';
            break;
            case 'game':

            break;
            case 'winner':
            case 'game_over':
                return 'btnReStart';
            break;
        }        
    }

}
export {EventsMenu}