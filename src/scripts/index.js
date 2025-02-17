// Импорты
import '../pages/index.css';
import {
    initialCards,
    renderCard,
    renderCards,
    likeCard,
    deleteCard
} from './cards';
import {
    openModal,
    closeModal,
    profilePopupFill
} from './modal';

// Темплейт карточки
const cardsTemplate = document.querySelector('#card-template').content;
// DOM узлы
const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const newCardAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');
const popupImageType = document.querySelector('.popup_type_image');
const popupFormProfile = document.forms['edit-profile'];
const popupNewCardForm = document.forms['new-place'];


// Слушатель + Функция открытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
    profilePopupFill(
        popupFormProfile,
        profileTitle.textContent,
        profileDescription.textContent
    );
    openModal(popupEditProfile);
});

// Слушатель отправки формы попапа редактирования профиля + изменение информации на странице
popupFormProfile.addEventListener('submit', (element) => {
    element.preventDefault();
    profileTitle.textContent = popupFormProfile.elements.name.value;
    profileDescription.textContent = popupFormProfile.elements.description.value;
    closeModal(popupEditProfile);
});

// Слушатель + функция открытия попапа новой карточки
newCardAddButton.addEventListener('click', () => {
    openModal(popupNewCard);
});

// Функция наполнения новой карточки на основании попапа
popupNewCardForm.addEventListener('submit', (element) => {
    element.preventDefault();
    const name = popupNewCardForm.elements['place-name'].value;
    const link = popupNewCardForm.elements.link.value;
    const newCardValues = {
        name,
        link
    };
    renderCard(newCardValues, cardsContainer, likeCard, deleteCard);
    closeModal(popupNewCard);
    popupNewCardForm.reset();
})

// Отрисовка изначальных карточек
renderCards(initialCards);

export {
    cardsTemplate,
    popupImage,
    cardsContainer,
    popupCaption,
    popupImageType
}