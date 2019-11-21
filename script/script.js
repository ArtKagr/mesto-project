class Card {
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

class Popup {
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

class Api {
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

const inputName = document.querySelector('.popup__input_type_name');     // поле ввода названия места
const inputLink = document.querySelector('.popup__input_type_link-url');
const rootPage = document.querySelector('.root');                               // вся область сайта
const placeList = document.querySelector('.places-list');                       // поле для карточек
const popupContentImage = document.querySelector('.popup__content_type_image'); // для передачи изображения с карточки на попап
const popupPersonButton = document.querySelector('.popup__button_type_person'); // кнопка "сохранить" на попапе с личной информацией
const popupCardsButton = document.querySelector('.popup__button_type_cards');   // кнопка "+" на попапе с добавлением карточек
const popupAvatarButton = document.querySelector('.popup__button_type_avatar');
const popupFormPerson = document.forms.person;                                  // форма с инпутами попапа с личной информацией
const popupFormCards = document.forms.cards;                                    // форма с инпутами попапа для добавления карточек
const popupFormAvatar = document.forms.avatar;
const popupInputPerson = document.querySelector('.popup__input_type_person');   // инпут ввода имени на попапе с личной информацией
const popupInputAbout = document.querySelector('.popup__input_type_about');     // инпут ввода рода деятельности на попапе с личной информацией
const popupInputName = document.querySelector('.popup__input_type_name');       // инпут ввода названия карточки на попапе с добавлением карточек
const popupInputLink = document.querySelector('.popup__input_type_link-url');   // инпут ввода ссылки на попапе с добавлением карточек
const popupInputUserLink = document.querySelector('.popup__input_type_link-urlUser')
const popupValidatePerson = document.querySelector('.popup__validate_type_person');
const popupValidateAbout = document.querySelector('.popup__validate_type_about');
const popupValidateName = document.querySelector('.popup__validate_type_name');
const popupValidateLink = document.querySelector('.popup__validate_type_link-url');
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const userInfoPhoto = document.querySelector('.user-info__photo')
const userButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit');
const imageButton = document.querySelector('.place-card__image');
const avatarButton = document.querySelector('.user-info__photo');
const popupCards = document.querySelector('.popup_type_cards');                 // попап для добавления карточек
const popupPerson = document.querySelector('.popup_type_person');               // попап для добавления личной информации
const popupImage = document.querySelector('.popup_type_image');                 // попап для вывода изображения
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupClose = document.querySelector('.popup__close');
const regAr = /^https?:\/\//; // Проверка на соответствие первых символов строки первым символам ссылки

  const popupUser = new Popup(userButton);
  const popupEdit = new Popup(editButton);
  const popupImg = new Popup(imageButton);
  const popupAv = new Popup(avatarButton);
  const api = new Api({baseUrl: 'http://95.216.175.5/cohort4', authorization: '2e5892cf-52a1-4ccd-a0d2-8beba13a441a'})


function validate__save_person() { // работа кнопки "сохранить" в попапе с личной информацией
  let numFirst = popupInputPerson.value.split('');
  let numSecond = popupInputAbout.value.split('');
  if (numFirst.length === 0 || numSecond.length === 0){
  popupPersonButton.setAttribute('disabled', true);
  popupPersonButton.removeAttribute('style');
} else if((numFirst.length < 2 || numFirst.length > 30) && (numSecond.length < 2 || numSecond.length > 30)) {
  popupPersonButton.setAttribute('disabled', true);
  popupPersonButton.removeAttribute('style');
} else if(numFirst.length < 2 || numFirst.length > 30 || numSecond.length < 2 || numSecond.length > 30) {
  popupPersonButton.setAttribute('disabled', true);
  popupPersonButton.removeAttribute('style');
} else if (numFirst.length >= 2 && numFirst.length <= 30 || numSecond.length >= 2 && numSecond.length <= 30) {
  popupPersonButton.removeAttribute('disabled');
  popupPersonButton.setAttribute('style', 'background-color: black; color: white')
}}

function validate__save_cards(event) {  // работа кнопки "+" в попапе с добавлением карточек
  let numFirst = popupInputName.value.split('');
  let numSecond = popupInputLink.value.split('');
  let numThird = event.target;
  if (numFirst.length === 0 || numSecond.length === 0){
  popupCardsButton.setAttribute('disabled', true);
  popupCardsButton.removeAttribute('style');
} else if(numThird.classList.contains('popup__input_type_link-url') && !regAr.test(numThird.value)){
  popupCardsButton.setAttribute('disabled', true);
  popupCardsButton.removeAttribute('style');
} else if((numFirst.length < 2 || numFirst.length > 30) && numThird.classList.contains('popup__input_type_link-url') && !regAr.test(numThird.value)) {
  popupCardsButton.setAttribute('disabled', true);
  popupCardsButton.removeAttribute('style');
} else if(numFirst.length < 2 || numFirst.length > 30 || numThird.classList.contains('popup__input_type_link-url') && !regAr.test(numThird.value)) {
  popupCardsButton.setAttribute('disabled', true);
  popupCardsButton.removeAttribute('style');
} else if (numFirst.length >= 2 && numFirst.length <= 30 && numThird.classList.contains('popup__input_type_link-url') && regAr.test(numThird.value)) {
  popupCardsButton.removeAttribute('disabled');
  popupCardsButton.setAttribute('style', 'background-color: black; color: white')
}}

function validate__save_avatar(event) {  // работа кнопки "сохранить" в попапе аватара
  let numFirst = popupInputUserLink.value.split('');
  let numThird = event.target;
  if (numFirst.length === 0){
  popupAvatarButton.setAttribute('disabled', true);
  popupAvatarButton.removeAttribute('style');
} else if(numThird.classList.contains('popup__input_type_link-urlUser') && !regAr.test(numThird.value)){
  popupAvatarButton.setAttribute('disabled', true);
  popupAvatarButton.removeAttribute('style');
} else if((numFirst.length < 2 || numFirst.length > 500) && numThird.classList.contains('popup__input_type_link-urlUser') && !regAr.test(numThird.value)) {
  popupAvatarButton.setAttribute('disabled', true);
  popupAvatarButton.removeAttribute('style');
} else if(numFirst.length < 2 || numFirst.length > 500 || numThird.classList.contains('popup__input_type_link-urlUser') && !regAr.test(numThird.value)) {
  popupAvatarButton.setAttribute('disabled', true);
  popupAvatarButton.removeAttribute('style');
} else if (numFirst.length >= 2 && numFirst.length <= 500 && numThird.classList.contains('popup__input_type_link-urlUser') && regAr.test(numThird.value)) {
  popupAvatarButton.removeAttribute('disabled');
  popupAvatarButton.setAttribute('style', 'background-color: black; color: white')
}}

function validate__error_person(event) { // вывод ошибок в попапе для личной информации
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

function validate__error_cards(event) { // вывод ошибок в попапе для карточек
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

popupFormPerson.addEventListener('input', validate__save_person);   // кнопка "сохранить" попапа с личной информацией
popupFormCards.addEventListener('input', validate__save_cards);     // кнопка "сохранить" попапа для добавления карточек
popupFormPerson.addEventListener('input', validate__error_person);  // вывод ошибок в попапе с личной информацией
popupFormCards.addEventListener('input', validate__error_cards);    // вывод ошибок в попапе для добавления 
popupFormAvatar.addEventListener('input', validate__save_avatar);
