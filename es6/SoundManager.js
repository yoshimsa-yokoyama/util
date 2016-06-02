import createjs from 'createjs'
import Model from './Models/Model'
import DataLoader from './DataLoader'

/**
* SoundManager
* @class
*/
class SoundManager{

  dataLoader = new DataLoader();
  soundInstance = {};

  constructor(){
    //SoundJSセッティング
    createjs.Sound.alternateExtentions = ['mp3'];

    this.dataLoader.loadData('SOUND_LOADER', Model.getSoundList(), true);

    this.addEventListeners();
  }

  play(soundId, loop = 0){
    this.soundInstance[soundId] = createjs.Sound.play(soundId, {loop: loop});
  }



  pause(soundId,pause){
    if(this.soundInstance.hasOwnProperty(soundId)){
      this.soundInstance[soundId].paused = pause;
    }
  }



  stop(soundId){
    if(this.soundInstance.hasOwnProperty(soundId)){
      this.soundInstance[soundId].stop();
    }
  }



  setVolume(soundId,volume){
    if(this.soundInstance.hasOwnProperty(soundId)){
      this.soundInstance[soundId].volume = volume;
    }
  }



  setPosition(soundId,position){
    if(this.soundInstance.hasOwnProperty(soundId)){
      this.soundInstance[soundId].position = position;
    }
  }



  stopAll(){
    createjs.Sound.stop();
  }



  muteAll(){
    createjs.Sound.volume = 0;
  }

  addEventListeners(){

    // データローダーのローディング完了時にモデルに通知
    this.dataLoader.loadQueue.on('complete', () => {
      //再生曲を初期化
      Model.getSoundList().forEach( (item,idx) => {
        if(item !== null || item !== undefined){
          this.play(item.id, -1);
          this.pause(item.id, true);
          this.setPosition(item.id, 0);
          this.setVolume(item.id, 1.0);
        }
      });

      Model.onDataLoadComplete();
    });

    // モデルから全配信されるイベントを受け取ってBGM開始
    Model.on(Model.EVENTS.DATA_LOAD_COMPLETE, () => {
      if(Model.getSoundFlag()) this.play('BGM', -1);
    });

    Model.on(Model.EVENTS.YOUTUBE_MODAL_OPEN, () => {
      this.pause('BGM', true);
    });

    Model.on(Model.EVENTS.YOUTUBE_MODAL_CLOSE, () => {
      if(Model.getSoundFlag()) this.pause('BGM', false);
    });

    Model.on(Model.EVENTS.SOUND_FLAG_SET, () => {
      if(Model.getSoundFlag()){
        this.pause('BGM', false);
      }else{
        this.pause('BGM', true);
      }
    });
  }
}

export default SoundManager;