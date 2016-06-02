import createjs from 'createjs'

/**
* DataLoader
* @class
*/
class DataLoader{

  queueList = {};
  numOverlap = -3;

  constructor(){
    // let i;

    //ローディングアイコンとテキストの表示
    // this.loadingDisplay = element;
    // this.loadingIcon = this.loadingDisplay.querySelector('.u-loading-icn');
    // this.loadingText = this.loadingDisplay.querySelector('.cover-loading-hint');
    // this.setLoadingIcon();
    // this.setLoadingText();

    //ローディング数字の表示
    // this.numPreset = [];
    // this.loadingDigit = this.loadingDisplay.querySelector('#txt-progress');
    // this.loadingDigitCtx = this.loadingDigit.getContext('2d');

    this.loadQueue = new createjs.LoadQueue(true,'/assets/');
    this.loadQueue.setMaxConnections(4);
    this.loadQueue.installPlugin(createjs.Sound);

    // this.loadingDigit.width=57;
    // this.loadingDigit.height=22;

    // for(i=0; i<10;i++){
    //   this.numPreset[i] = new Image();
    //   this.numPreset[i].src = '/sp/assets/img/game_txt_num-loading_'+i+'.png';
    // }

    this.addEventListeners();
  }



  /**
  * マニフェストからデータをロード
  */
  loadData(queueName,manifest,loadNow){
    //ローディング画面を表示
    // this.loadingDisplay.style.visibility = 'visible';
    //キューをキャッシュ
    this.setQueueList(queueName,manifest,false);
    //マニフェストのファイルをロード
    this.loadQueue.loadManifest(this.queueList[queueName],loadNow);
  }



  /** TBD */
  getItem(id){
    return this.loadQueue.getItem(id);
  }



  /** TBD */
  getResult(id){
    return this.loadQueue.getResult(id);
  }



  /** TBD */
  setLoadingIcon(){
    let icon = [''];

    this.loadingIcon.classList.add(icon[Math.floor(Math.random()*icon.length)]);
  }



  /** TBD */
  setLoadingText(){
    let i, text, str, match;

    text = [''];

    str = text[Math.floor(Math.random()*_text.length)];
    match = str.match(/<\/*script>/g);

    //scriptタグのエスケープ
    if(match !== null && match.length>0){
      for(i=match.length; i--;){
        str = str.replace(match[i],'');
      }
    }

    this.loadingText.innerHTML = str;
  }



  /**
  * キューリストにマニフェストを追加
  * @param {string} queueName マニフェストリストのID
  * @param {object} manifest ロードするファイルのリスト
  * @param {boolean} force 強制上書きフラグ
  */
  setQueueList(queueName,manifest,force){
    if(!this.queueList.hasOwnProperty(queueName) || force){
      this.queueList[queueName] = manifest;
    }
  }



  /**
  * イベントを付与
  */
  addEventListeners(){
    let i;

    // データロード進捗を表示
    // this.loadQueue.on('progress', function(e){
    //   let progress = Math.floor(e.loaded*100).toString().split('');
    //
    //   this.loadingDigitCtx.clearRect(0,0,57,23);
    //
    //   for(i=0; i<progress.length;i++){
    //     this.loadingDigitCtx.drawImage(this.numPreset[progress[i]],(57-19*(progress.length-i))+this.numOverlap*i,0,19,23);
    //   }
    // });

    // this.loadQueue.on('complete', function(){
    //   //ローディング画面を隠す
    //   setTimeout(function(){
    //     this.loadingDisplay.style.visibility = 'hidden';
    //     global.model.onGameDataLoadComplete();
    //   }, 400);
    // });
  }
}

export default DataLoader;