/**
*
*/

let _timeStamp = 0;
let _timerId = null;

class Util{
  constructor(){

  }



  /**
  * DOMElementをループ
  * @static
  * @param TDB
  * @param TDB
  */
  static throttle(minInterval, callback){
    let now = +new Date;
    let delta = now - _timeStamp;

    if (delta >= minInterval){
      _timeStamp = now;
      callback();
    }else{
      _timerId = setTimeout(() => {
        this.throttle(callback);
      }, minInterval - delta);
    }
  }
}

export default Util;