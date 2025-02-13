// Импорты
import '../pages/index.css';
import {initialCards} from './cards';
import {openModal, closeModal, closemodalByOverlay, closeModalOnEscape} from './modal';

// Темплейт карточки
const cardsTemplate = document.querySelector('#card-template').content;
// DOM узлы
const cardsContainer = document.querySelector('.places__list');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupNewCard= document.querySelector('.popup_type_new-card');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup__image');
const popupImageType = document.querySelector('.popup_type_image');
const popupCaption = document.querySelector('.popup_caption');
const popupCardForm = document.forms['new-place'];
const popupFormProfile = document.forms['edit-profile'];


// Функция открытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
    profilePopupFill(
        popupFormProfile,
        profileTitle.textContent,
        profileDescription.textContent
    );
    openModal(popupEditProfile);
});

// Функция заполнения попапа редактирования профиля
profileEditButton.addEventListener('submit', ProfileEdition);

const profilePopupFill = (form, name, description) => {
    form.elements.name.value = name;
    form.elements.description.value = description;
};

// Функция запоминания полей попапа профиля
const ProfileEdition = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = popupFormProfile.name.value;
    profileDescription.textContent = popupFormProfile.description.value;
    closeModal(popupEditProfile);
};

// Функция закрытия попапа по нажатию на крестик

popupNewCard.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(popupNewCard);
});
popupImageType.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(popupImageType);
});
popupEditProfile.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(popupEditProfile);
});

// Функция закрытия попапа по нажатию на область за границами попапа
popupNewCard.addEventListener('click', () => {
    closemodalByOverlay(evt);
});
popupImageType.addEventListener('click', () => {
    closemodalByOverlay(evt);
});
popupEditProfile.addEventListener('click', () => {
    closemodalByOverlay(evt);
});

// Функция закрытия попапа по нажатию на Escape

popupNewCard.addEventListener('click', () => {
    closeModalOnEscape(evt);
});
popupImageType.addEventListener('click', () => {
    closeModalOnEscape(evt);
});
popupEditProfile.addEventListener('click', () => {
    closeModalOnEscape(evt);
});

// Функция создания карточки
function createCard(cardInfo, deleteHandler, likeHandler){
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true); 
    const cardDeleteButton = cardElement.querySelector('.card__delete-button')
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    cardDeleteButton.addEventListener('click', deleteHandler); 
    likeButton.addEventListener('click', likeHandler);
    return cardElement;
};

// Функция удаления карточки
function deleteCard(evt) {
    const cardElement = evt.target.closest('.card');
    cardElement.remove();
};

// Функция лайка
function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

// Вывести карточки на страницу
function renderCards (cardDataList) {
    cardDataList.forEach(function (element){
        const cardElement = createCard(element, deleteCard, likeCard);
        cardsContainer.append(cardElement);
    });
};
renderCards(initialCards);