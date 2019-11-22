import {inputName, inputLink, rootPage, placeList, popupContentImage, popupPersonButton, popupCardsButton,
    popupAvatarButton, popupInputPerson, popupInputAbout, popupInputName, popupInputLink, popupInputUserLink,
    popupValidatePerson, popupValidateName, popupValidateAbout, popupValidateLink, userInfoName, userInfoJob,
    userInfoPhoto, userButton, editButton, imageButton, avatarButton, popupCards, popupPerson, popupImage,
    popupAvatar, popupClose, regAr} from "./Variables.js";

export default class Card {
    constructor(link, name, id, likes, visible) {
      this.cardElement = this.create(link, name, id, likes, visible);
      this.cardElement
                    .querySelector('.place-card__like-icon')
                    .addEventListener('click', this.like);
      this.cardElement
                    .querySelector(`.${visible}`)
                    .addEventListener('click', this.remove);
    }
  
    like(event) {
      event.target.classList.toggle('place-card__like-icon_liked');
      if(event.target.classList.contains('place-card__like-icon_liked')){
  
        api.addLike(event)
        .then((result) => {
          event.target.nextElementSibling.textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err)
        })
      } 
      else {
        api.deleteLike(event)
          .then((result) => {
            event.target.nextElementSibling.textContent = result.likes.length;
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  
    remove(event) {
      if(confirm('Вы действительно хотите удалить эту карточку?')){
        api.deleteCard(event)
        .then((result) => {
          placeList.removeChild(event.target.parentElement.parentElement);
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        event.preventDefault();
      }
    }
  
    create(link, name, id, likes, visible) {
  
      const placeCardDeleteIcon = document.createElement('button');
      const placeCard = document.createElement('div');
      const placeCardImage = document.createElement('div');
      const placeCardDescription = document.createElement('div');
      const placeCardName = document.createElement('h3');
      const placeCardAll = document.createElement('div');
      const placeCardLikeIcon = document.createElement('button');
      const placeCardLikeNumber = document.createElement('p');
      
      placeCard.setAttribute('data-id', `${id}`);
      placeCard.classList.add('place-card');
      placeCardImage.classList.add('place-card__image');
      placeCardImage.setAttribute('style', `background-image: url(${link})`);
      placeCardDeleteIcon.classList.add(`${visible}`);
      placeCardDescription.classList.add('place-card__description');
      placeCardName.classList.add('place-card__name');
      placeCardName.textContent = name;
      placeCardLikeIcon.classList.add('place-card__like-icon');
      placeCardLikeNumber.classList.add('place-card__like-number');
      placeCardImage.appendChild(placeCardDeleteIcon);
      placeCardDescription.appendChild(placeCardName);
      placeCardAll.appendChild(placeCardLikeIcon);
      placeCardAll.appendChild(placeCardLikeNumber);
      placeCardLikeNumber.textContent = likes;
      placeCardDescription.appendChild(placeCardAll);
      placeCard.appendChild(placeCardImage);
      placeCard.appendChild(placeCardDescription);
      popupCards.classList.remove('popup_is-opened');
      popupCardsButton.setAttribute('disabled', true);
      popupCardsButton.removeAttribute('style');
      return placeCard;
    }
  }