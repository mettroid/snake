class Canvas {
    constructor(id, parent){
        this.id = id;
        this.parent = parent;
        this.ctx = null;
    }
    create(){
        if(this.ctx !== null){
            console.log('canvas already created');
            return;
        } else {
            this.canvas = document.createElement('canvas');
            this.canvas.width = this.parent.offsetWidth-2;
            this.canvas.height = this.parent.offsetHeight-2;
            this.canvas.id = this.id;
            this.canvas.style.background = 'pink';  
            
            this.parent.insertAdjacentElement('afterBegin', this.canvas);
            this.ctx = this.canvas.getContext('2d');
        }
    }

}
export {Canvas}