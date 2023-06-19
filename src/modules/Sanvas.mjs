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
            
            this.canvas.classList.add('canvas');
            this.canvas.classList.add('wrapField__canvas');
            this.canvas.width = this.parent.offsetWidth-2;
            this.canvas.height = this.parent.offsetHeight - 2;
            this.canvas.height = this.parent.offsetHeight - 2;
            this.canvas.id = this.id;  
            
            this.parent.insertAdjacentElement('beforeEnd', this.canvas);
            this.ctx = this.canvas.getContext('2d');
        }
    }

}
export {Canvas}