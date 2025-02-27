// Импорты
import '../pages/index.css';
import {createCard} from './card';
import {openModal, closeModal} from './modal';
import {enableValidation, clearValidation, toggleButtonState} from './validation';
import {getCards, updateUserAvatar, getUserInfo, deleteCardUser, postNewCard, patchUserInfo, checkLike} from './api';

// DOM узлы
const cardsContainer = document.querySelector('.places__list');
const profileAvatar = document.querySelector('.profile__image');
const profileAvatarPopup = document.querySelector('.popup_type_avatar')
const inputAvatar = document.querySelector('.popup__input_type_avatar');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const newCardAddButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');
const popupImageType = document.querySelector('.popup_type_image');
const popupFormProfile = document.forms['edit-profile'];
const popupNewCardForm = document.forms['new-place'];
const formAvatar = document.forms['edit-avatar'];
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };
let userId;

// Активация валидирования
enableValidation(config); 

// Слушатель + Функция открытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
    clearValidation(popupFormProfile, config)
    popupFormProfile.name.value = profileTitle.textContent;
    popupFormProfile.description.value = profileDescription.textContent;
    openModal(popupEditProfile);
    toggleButtonState(popupFormProfile, config);
});

// Слушатель открытия формы смены автара

profileAvatar.addEventListener('click', () => {
    clearValidation(profileAvatarPopup, config)
    openModal(profileAvatarPopup);
    updateUserAvatar
});

// Функция идентификации пользователя
function setUserInfo(user) {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.setAttribute('style', `background-image: url('${user.avatar}'`);
    userId = user._id;
};


// Слушатель отправки формы попапа редактирования профиля + изменение информации на странице
popupFormProfile.addEventListener('submit', (element) => {
    element.preventDefault();
    profileTitle.textContent = popupFormProfile.elements.name.value;
    profileDescription.textContent = popupFormProfile.elements.description.value;
    patchUserInfo(profileTitle.textContent, profileDescription.textContent);
    closeModal(popupEditProfile);
});

// Слушатель закрытия модальных окон (крестик + оверлей)
const modals = document.querySelectorAll('.popup');
modals.forEach((modal) => {
    modal.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget) {
            closeModal(modal);
        }
    })
});

// Слушатель + функция открытия попапа новой карточки
newCardAddButton.addEventListener('click', () => {
    openModal(popupNewCard);
    clearValidation(popupFormProfile, config)
    toggleButtonState(popupNewCardForm, config)
});

// Функция наполнения новой карточки на основании попапа
popupNewCardForm.addEventListener('submit', (element) => {
    element.preventDefault();
    const name = popupNewCardForm.elements['place-name'].value;
    const link = popupNewCardForm.elements.link.value;
    postNewCard(name, link, (newCardInfo) => {
        renderCard(newCardInfo, userId);
    });
    closeModal(popupNewCard);
    popupNewCardForm.reset();
});

// Функция открытия картинок карточек
const imageOpenPopup = (link, name) => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(popupImageType);
};

// Функция отрисовки новых карточек на страницу
const renderCard = (cardInfo, userId) => {
    const cardElement = createCard(cardInfo, imageOpenPopup, deleteCardUser, userId, likeHandler);
    cardsContainer.prepend(cardElement);
};

// Функция отрисовки карточкек на страницу
function renderCards(cardDataList, userId) {
    cardDataList.forEach((element) => {
        const cardElement = createCard(element, imageOpenPopup, deleteCardUser, userId, likeHandler);
        cardsContainer.append(cardElement);
    });
};

Promise.all([getUserInfo(), getCards()])
    .then (([user, cards]) => {
        setUserInfo(user);
        renderCards(cards, user._id)
    })
    .catch((err) => {
        console.log('Ошибка', err);
    });

//Лайк... работай пожалуйста
function likeHandler(cardId, likeButton) {
    const isLiked = !likeButton.classList.contains('card__like-button_is-active');
        checkLike(cardId, isLiked)
        .then((data) => {
            likeButton.classList.toggle('card__like-button_is-active');
            const cardLikeCount = likeButton
                .closest('.card')
                .querySelector('.card__like-count');

            if (data.likes.length > 0) {
                cardLikeCount.textContent = data.likes.length;
                cardLikeCount.classList.remove('card__like-count_hidden');
            } else {
                cardLikeCount.classList.add('card__like-count_hidden');
            }
        })
        .catch((err) => console.error(`Ошибка: ${err}`));
};