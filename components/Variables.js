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

export {
    inputName, 
    inputLink, 
    rootPage, 
    placeList, 
    popupContentImage, 
    popupPersonButton, 
    popupCardsButton,
    popupAvatarButton,
    popupInputPerson,
    popupInputAbout,
    popupInputName,
    popupInputLink,
    popupInputUserLink,
    popupValidatePerson,
    popupValidateName,
    popupValidateAbout,
    popupValidateLink,
    userInfoName,
    userInfoJob,
    userInfoPhoto,
    userButton,
    editButton,
    imageButton,
    avatarButton,
    popupCards,
    popupPerson,
    popupImage,
    popupAvatar,
    popupClose,
    regAr
}