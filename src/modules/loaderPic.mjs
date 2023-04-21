const loadImage = function(path){
    return new Promise(function(resolve, reject){
        let img = new Image();
        img.src = path;
    
        img.addEventListener('load', function(){
            resolve(img);
        });
        img.addEventListener('error', function(){
            reject(new Error('ERROR'));
        });
    });
}
export {loadImage}