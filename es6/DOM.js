/**
*
*/

class DOM{
  /**
  * DOMElementをループ
  * @static
  * @param {Array[DOMElement]} [element] loopを回すDOM配列
  * @param {Function} [callback] 一つ一つのDOMElementに適応する関数
  * @param {object} [scope] TBD
  */
  static forEach(element, callback, scope){
    for (let _i = 0; _i < element.length; _i++) {
      callback.call(scope, _i, element[_i]);
    }
  }

  /**
  * DOMElementにHTMLクラスを追加
  * @static
  * @param {DOMElement} [element] 対象のDOMElement
  * @param {String} [className] 追加するHTMLクラスの名前
  */
  static addClass(element, className){
    if (element.classList){
      element.classList.add(className);
    }else{
      element.className += ' ' + className;
    }
  }

  /**
  * DOMElementからHTMLクラスを削除
  * @static
  * @param {DOMElement} [element] 対象のDOMElement
  * @param {String} [className] 削除するHTMLクラスの名前
  */
  static removeClass(element, className){
    if (element.classList){
      element.classList.remove(className);
    }else{
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  static getClassName(element){
    if (element.classList){
      return element.classList.value || element.classList.toString();
    }else{
      return element.className;
    }
  }

  /**
  * DOMElementにHTMLクラスがあるか評価
  * @static
  * @param {DOMElement} [element] 対象のDOMElement
  * @param {String} [className] 評価するHTMLクラスの名前
  */
  static hasClass(element, className){
    if(element.classList){
      return element.classList.contains(className);
    }else{
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }
  }
}

export default DOM;