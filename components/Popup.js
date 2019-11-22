export default class Popup {
    constructor(button){
      this.popup = button;
    }
    open(popupElement){
      popupElement.classList.add('popup_is-opened');
    }
    close(popupElement){
      popupElement.classList.remove('popup_is-opened');
    }
  }
