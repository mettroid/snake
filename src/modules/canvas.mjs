class Canvas {
    constructor(id, parent){
        this.id = id;
        this.parent = parent;
        this.ctx = null;
    }
    create(){
        let canvas = document.createElement('canvas');
        canvas.width = this.parent.offsetWidth-2;
        canvas.height = this.parent.offsetHeight-2;
        canvas.id = this.id;
        
        canvas.style.background = 'pink';  
        this.parent.insertAdjacentElement('afterBegin', canvas);
        this.ctx = canvas.getContext('2d');
    }

}
export {Canvas}