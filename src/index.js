import "../vendor/normalize.css";
import "../vendor/fonts.css";
import "../blocks/root/root.css";
import "../blocks/header/header.css";
import "../blocks/logo/logo.css";
import "../blocks/profile/profile.css";
import "../blocks/user-info/user-info.css";
import "../blocks/button/button.css";
import "../blocks/places-list/places-list.css";
import "../blocks/place-card/place-card.css";
import "../blocks/popup/popup.css";
import "../blocks/popup/_is-opened/popup_is-opened.css";

export const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort4' : 'https://praktikum.tk/cohort4';

import {inputName, inputLink, rootPage, placeList, popupContentImage, popupPersonButton, popupCardsButton,
    popupAvatarButton, popupInputPerson, popupInputAbout, popupInputName, popupInputLink, popupInputUserLink,
    popupValidatePerson, popupValidateName, popupValidateAbout, popupValidateLink, userInfoName, userInfoJob,
    userInfoPhoto, userButton, editButton, imageButton, avatarButton, popupCards, popupPerson, popupImage,
    popupAvatar, popupClose, regAr} from "./Variables.js";

import Validate from "../components/Validate";
import Popup from "../components/Popup";
import Card from "../components/Card";
import Api from "../components/Api";

const validate = new Validate(popupInputPerson, popupInputAbout, popupPersonButton, popupInputName, popupInputLink, popupCardsButton, popupInputUserLink, popupAvatarButton);
const popupUser = new Popup(userButton);
const popupEdit = new Popup(editButton);
const popupImg = new Popup(imageButton);
const popupAv = new Popup(avatarButton);
const api = new Api({baseUrl: ServerUrl, authorization: '2e5892cf-52a1-4ccd-a0d2-8beba13a441a'})

    rootPage.addEventListener('click', function(event){  //добавление карточки
    if(event.target.classList.contains('popup__button_type_cards')){
      event.preventDefault();
      api.addCardItem()
      .then((result) => {
        const { cardElement } = new Card(result.link, result.name, result._id, result.likes.length, 'place-card__delete-icon');
        placeList.appendChild(cardElement);
        inputLink.value = '';
        inputName.value = '';
        popupCards.classList.remove('popup_is-opened');
      })
      .catch((err) => {
        console.log(err)
      });
    }
    })
  
  rootPage.addEventListener('click', function(event){ // открытие попапов
    if(event.target === userButton) {
      popupUser.open(popupCards);
    } else if(event.target === editButton) {
      popupEdit.open(popupPerson);
    } else if(event.target === avatarButton){
      popupAv.open(popupAvatar);
    } else if(event.target.classList.contains('place-card__image')) {
      popupImg.open(popupImage);
      popupContentImage.setAttribute('style', `background-image: ${event.target.style.backgroundImage}`);
    }
  })
  
  rootPage.addEventListener('click', function(event){  // закрытие попапов
    if(event.target.classList.contains('popup__close_type_person')) {
      popupEdit.close(popupPerson);
    } else if(event.target.classList.contains('popup__close_type_avatar')) {
      popupAv.close(popupAvatar);
    } else if(event.target.classList.contains('popup__close_type_cards')) {
      popupUser.close(popupCards)
    } else if(event.target.classList.contains('popup__close_type_img')) {
      popupImg.close(popupImage);
    }
  })
  
  api.getInitialCards()
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(result => {
      console.log(result);
      for(let i = 0; i < result.length; i++){
  
        let block = 'place-card__delete-icon_block';
        if(result[i].owner._id === '72c044c20149af9cb481bb65'){
          block = 'place-card__delete-icon';
        }
      
      const { cardElement } = new Card(result[i].link, result[i].name, result[i]._id, result[i].likes.length, block);
      placeList.appendChild(cardElement);
    }})
    .catch((err) => {
      console.log(err)
    }) 
  
  api.loadUserInfo()
    .then((result) => {
      userInfoName.textContent = result.name;
      userInfoJob.textContent = result.about;
      userInfoPhoto.setAttribute('style', `background: url(${result.avatar})`);
    })
    .catch((err) => {
      console.log(err)
    })
  
  popupPersonButton.addEventListener('click', function(event){ // добавление личной информации
    event.preventDefault();
    api.editUserInfo()
    .then((result) => {
      userInfoName.textContent = result.name;
      userInfoJob.textContent = result.about;
      popupPersonButton.setAttribute('disabled', true);
      popupPersonButton.removeAttribute('style');
      popupPerson.classList.remove('popup_is-opened');
    })
    .catch((err) => {
      console.log(err)
    })
  });
  
  popupAvatarButton.addEventListener('click', function(event){
    event.preventDefault();
    api.loadUserPhoto()
    .then((result) => {
      userInfoPhoto.setAttribute('style', `background: url(${result.avatar})`);
      popupAvatar.classList.remove('popup_is-opened');
      popupInputUserLink.value = '';
    })
    .catch((err) => {
      console.log(err)
    })
  })
  
  popupFormPerson.addEventListener('input', validate.savePerson());   // кнопка "сохранить" попапа с личной информацией
  popupFormCards.addEventListener('input', validate.saveCards(event));     // кнопка "сохранить" попапа для добавления карточек
  popupFormPerson.addEventListener('input', validate.errorPerson(event));  // вывод ошибок в попапе с личной информацией
  popupFormCards.addEventListener('input', validate.errorCards(event));    // вывод ошибок в попапе для добавления 
  popupFormAvatar.addEventListener('input', validate.saveAvatar(event));
