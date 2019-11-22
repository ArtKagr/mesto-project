import {inputName, inputLink, rootPage, placeList, popupContentImage, popupPersonButton, popupCardsButton,
    popupAvatarButton, popupInputPerson, popupInputAbout, popupInputName, popupInputLink, popupInputUserLink,
    popupValidatePerson, popupValidateName, popupValidateAbout, popupValidateLink, userInfoName, userInfoJob,
    userInfoPhoto, userButton, editButton, imageButton, avatarButton, popupCards, popupPerson, popupImage,
    popupAvatar, popupClose, regAr} from "./Variables.js";
import ServerUrl from "../src/index";

export default class Api {
    constructor(options){
      this.baseUrl = options.baseUrl;
      this.authorization = options.authorization;
    }
  
    getInitialCards() {
      return fetch(`${this.baseUrl}/cards`, {
        headers: {
          authorization: this.authorization
        }
      })
    }
    loadUserInfo() {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'GET', 
        headers: {
          authorization: this.authorization
        }
      })
        .then((res) => {
          if(res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
  
    editUserInfo() {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH', 
        headers: {
          authorization: this.authorization,
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          name: `${popupInputPerson.value}`,
          about: `${popupInputAbout.value}`
        })
      })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    }
    addCardItem() {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'POST', 
        headers: {
          authorization: this.authorization,
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          link: `${inputLink.value}`,
          name: `${inputName.value}`,
        })
      })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      }
    
    deleteCard(event) {
      return fetch(`${this.baseUrl}/cards/${event.target.parentElement.parentElement.getAttribute('data-id')}`, { 
        method: 'DELETE', 
        headers: {
          authorization: this.authorization
        },
      })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
        })
      }
    
  
    addLike(event) {
      return fetch(`${this.baseUrl}/cards/like/${event.target.parentElement.parentElement.parentElement.getAttribute('data-id')}`,{
        method: 'PUT', 
        headers: {
          authorization: this.authorization
        }
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    }
  
    deleteLike(event) {
      return fetch(`${this.baseUrl}/cards/like/${event.target.parentElement.parentElement.parentElement.getAttribute('data-id')}`,{
        method: 'DELETE', 
        headers: {
          authorization: this.authorization
        }
      })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    }
  
    loadUserPhoto() {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH', 
        headers: {
          authorization: this.authorization,
          "Content-type": "application/json"
        },     
        body: JSON.stringify({
        avatar: `${popupInputUserLink.value}`
      })
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    }
  }
