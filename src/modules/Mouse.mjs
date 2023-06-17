const coords = function(canvas, e){
        let coodrs = canvas.getBoundingClientRect();
        return {
            x: e.pageX - coodrs.x + window.pageXOffset,
            y: e.pageY - coodrs.y + window.pageYOffset
        }
}
export {coords}