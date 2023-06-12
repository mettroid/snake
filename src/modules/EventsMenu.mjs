class EventsMenu {
    constructor(c_1, game){
        this.c_1 = c_1;
        this.game = game;    
    }
    handleEvent(e){
        this[e.type](e);
    }
    click(e){
        if(this.game.start) return;
        if(!this.game.pathButton) return;
        if(this.isPointInPath(e)){
            let info = document.querySelector('.info');
            info.classList.add('info_show');
            this.game.start = true;
            this.game.phase = 'game';
        }       
    }
    isPointInPath(e){
        return this.c_1.ctx.isPointInPath(this.game.pathButton, e.offsetX, e.offsetY);
    }
}
export {EventsMenu}