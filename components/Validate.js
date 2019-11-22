import {inputName, inputLink, rootPage, placeList, popupContentImage, popupPersonButton, popupCardsButton,
popupAvatarButton, popupInputPerson, popupInputAbout, popupInputName, popupInputLink, popupInputUserLink,
popupValidatePerson, popupValidateName, popupValidateAbout, popupValidateLink, userInfoName, userInfoJob,
userInfoPhoto, userButton, editButton, imageButton, avatarButton, popupCards, popupPerson, popupImage,
popupAvatar, popupClose, regAr} from "./Variables.js";

export default class Validate {
    constructor(
        popupInputPerson, 
        popupInputAbout, 
        popupPersonButton, 
        popupInputName, 
        popupInputLink, 
        popupCardsButton,
        popupInputUserLink,
        popupAvatarButton)
      {
        this.inputPerson = popupInputPerson;
        this.inputAbout = popupInputAbout;
        this.personButton = popupPersonButton;
        this.inputName = popupInputName;
        this.inputLink = popupInputLink;
        this.cardsButton = popupCardsButton;
        this.inputUserLink = popupInputUserLink;
        this.avatarButton = popupAvatarButton;
      }
    savePerson() {
     let numFirst = this.inputPerson.value.split('');
     let numSecond = this.inputAbout.value.split('');
     if (numFirst.length === 0 || numSecond.length === 0){
      this.personButton.setAttribute('disabled', true);
      this.personButton.removeAttribute('style');
   } else if((numFirst.length < 2 || numFirst.length > 30) && (numSecond.length < 2 || numSecond.length > 30)) {
      this.personButton.setAttribute('disabled', true);
      this.personButton.removeAttribute('style');
   } else if(numFirst.length < 2 || numFirst.length > 30 || numSecond.length < 2 || numSecond.length > 30) {
      this.personButton.setAttribute('disabled', true);
      this.personButton.removeAttribute('style');
   } else if (numFirst.length >= 2 && numFirst.length <= 30 || numSecond.length >= 2 && numSecond.length <= 30) {
      this.personButton.removeAttribute('disabled');
      this.personButton.setAttribute('style', 'background-color: black; color: white')
   }}
    saveCards(event){
     let numFirst = this.inputName.value.split('');
     let numSecond = this.inputLink.value.split('');
     let numThird = event.target;
     if (numFirst.length === 0 || numSecond.length === 0){
      this.cardsButton.setAttribute('disabled', true);
      this.cardsButton.removeAttribute('style');
   } else if(numThird.classList.contains('popup__input_type_link-url') && !regAr.test(numThird.value)){
      this.cardsButton.setAttribute('disabled', true);
      this.cardsButton.removeAttribute('style');
   } else if((numFirst.length < 2 || numFirst.length > 30) && numThird.classList.contains('popup__input_type_link-url') && !regAr.test(numThird.value)) {
      this.cardsButton.setAttribute('disabled', true);
      this.cardsButton.removeAttribute('style');
   } else if(numFirst.length < 2 || numFirst.length > 30 || numThird.classList.contains('popup__input_type_link-url') && !regAr.test(numThird.value)) {
      this.cardsButton.setAttribute('disabled', true);
      this.cardsButton.removeAttribute('style');
   } else if (numFirst.length >= 2 && numFirst.length <= 30 && numThird.classList.contains('popup__input_type_link-url') && regAr.test(numThird.value)) {
      this.cardsButton.removeAttribute('disabled');
      this.cardsButton.setAttribute('style', 'background-color: black; color: white')
   }}
    saveAvatar(event){
     let numFirst = this.inputUserLink.value.split('');
     let numThird = event.target;
     if (numFirst.length === 0){
      this.avatarButton.setAttribute('disabled', true);
      this.avatarButton.removeAttribute('style');
   } else if(numThird.classList.contains('popup__input_type_link-urlUser') && !regAr.test(numThird.value)){
      this.avatarButton.setAttribute('disabled', true);
      this.avatarButton.removeAttribute('style');
   } else if((numFirst.length < 2 || numFirst.length > 500) && numThird.classList.contains('popup__input_type_link-urlUser') && !regAr.test(numThird.value)) {
      this.avatarButton.setAttribute('disabled', true);
      this.avatarButton.removeAttribute('style');
   } else if(numFirst.length < 2 || numFirst.length > 500 || numThird.classList.contains('popup__input_type_link-urlUser') && !regAr.test(numThird.value)) {
      this.avatarButton.setAttribute('disabled', true);
      this.avatarButton.removeAttribute('style');
   } else if (numFirst.length >= 2 && numFirst.length <= 500 && numThird.classList.contains('popup__input_type_link-urlUser') && regAr.test(numThird.value)) {
      this.avatarButton.removeAttribute('disabled');
      this.avatarButton.setAttribute('style', 'background-color: black; color: white')
   }}
    errorPerson(event){
     let numThird = event.target;
     if(numThird.value.split('').length === 0) { 
     numThird.setAttribute('style', 'margin-bottom: 0');
     numThird.nextElementSibling.textContent = "Это обязательное поле";
   } else if(numThird.value.split('').length < 2 || numThird.value.split('').length > 30) {
     numThird.setAttribute('style', 'margin-bottom: 0');
     numThird.nextElementSibling.textContent = "Должно быть от 2 до 30 символов";
   } else {
     numThird.setAttribute('style', 'margin-bottom: 15px');
     numThird.nextElementSibling.textContent = "";
   }}
    errorCards(event){
     let popupInputName = event.currentTarget.children[0]; // первый инпут выбранного попапа
     let numThird = event.target;
     if(numThird.value.split('').length === 0) { 
     numThird.setAttribute('style', 'margin-bottom: 0');
     numThird.nextElementSibling.textContent = "Это обязательное поле";
   } else if(numThird.classList.contains('popup__input_type_link-url') && !regAr.test(numThird.value)) {
     numThird.setAttribute('style', 'margin-bottom: 0');
      numThird.nextElementSibling.textContent = "Здесь должна быть ссылка";
   } else if(popupInputName.value.split('').length < 2 || popupInputName.value.split('').length > 30) {
     popupInputName.setAttribute('style', 'margin-bottom: 0');
     popupInputName.nextElementSibling.textContent = "Должно быть от 2 до 30 символов";
   } else {
     numThird.setAttribute('style', 'margin-bottom: 15px');
     numThird.nextElementSibling.textContent = "";
   }}
  } 

