class Animation {
    list;
    deltaTime;
    constructor(){
        this.list = {};
    }
    beginAnimation(){
        
    }
    updateTime(deltaTime){
        this.deltaTime = deltaTime;
    }
    addAnimation(anim){
        this.list[anim.obj.name] = this.getClosureFn(anim);
    }
    getAnim(){
        return Object.values(this.list);
    }
    present(obj){
        return obj.name in this.list;
    }
    getClosureFn(anim){
        let self = this;
        let index = 0;
        let base = anim.obj;                        // базовый анимируемый объект
        let currArr = anim.changes[index];             // массив объектов парралельных анимаций
        let currArrNorm = calcDiff(base, currArr);   // вычислим разницу координат, анимируемого свойства
        let sleeping = false;

        return function animate(){                  //эта функция вызывается каждую итерацию
            if(sleeping) return;
            if(!currArrNorm){      
                setTimeout(()=>{
                    
                    sleeping = false;
                    switch_curr();
                    console.log(currArrNorm);
                    
                }, currArr[0].sleep);
                sleeping = true;
                return;
            }

            let nowValue = 0;
            let currObj;
            for( let i = 0, len = currArrNorm.length; i < len; i++ ){  // перебираем дополненный массив объектов
                currObj = currArrNorm[i];
                if(currObj.switchOff) continue;
                nowValue = base[currObj.prop] + currObj.diff * ( self.deltaTime / currObj.ms );
                if( currObj.diff > 0 && nowValue > currObj.to 
                ||  currObj.diff < 0 && nowValue < currObj.to ){
                    currObj.switchOff = true;
                    base[currObj.prop] = currObj.to;
                    continue;
                }
                base[currObj.prop] = nowValue;
            }
            if( currArrNorm.every(( obj, ind, arr )=> obj.switchOff) ){
                switch_curr();
            }

        }
        function switch_curr(){
               index++;
               currArr = anim.changes[index];
               if(!currArr){
                    console.log(self.list);
                    delete self.list[base.name];
                    console.log(self.list);
                    return;
               }
               currArrNorm = (currArr[0].sleep)? null : calcDiff(base, currArr)
        }
        function calcDiff(base, arr){
            let from;
            for( let obj of arr ){
                from = base[obj.prop];
                obj.diff = obj.to - from;
                obj.switchOff = false;
            }
            return arr;
        }
        
    }

}
export { Animation }