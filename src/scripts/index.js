// Импорты
import '../pages/index.css';
import {
    initialCards,
} from './cards';
import {
    likeCard,
    deleteCard
} from './card';
import {
    openModal,
    closeModal
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
    popupFormProfile.name.value = profileTitle.textContent;
    popupFormProfile.description.value = profileDescription.textContent;
    openModal(popupEditProfile);
});

// Слушатель отправки формы попапа редактирования профиля + изменение информации на странице
popupFormProfile.addEventListener('submit', (element) => {
    element.preventDefault();
    profileTitle.textContent = popupFormProfile.elements.name.value;
    profileDescription.textContent = popupFormProfile.elements.description.value;
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
// Функция открытия картинок карточек
const imageOpenPopup = (cardImage) => {
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardImage.alt;
    openModal(popupImageType);
};
// Функция создания карточки
function createCard(cardInfo, imageHandler, likeHandler, deleteHandler) {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button')
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    likeButton.addEventListener('click', likeHandler);
    cardDeleteButton.addEventListener('click', deleteHandler);
    cardImage.addEventListener('click', () => {
        imageHandler(cardImage)
    });
    return cardElement;
};

// Функция отрисовки новых карточек на страницу
const renderCard = (item, container, likeCard, deleteCard) => {
    const cardElement = createCard(item, imageOpenPopup, likeCard, deleteCard);
    container.prepend(cardElement);
};

// Функция отрисовки карточкек на страницу
function renderCards(cardDataList) {
    cardDataList.forEach(function(element) {
        const cardElement = createCard(element, imageOpenPopup, likeCard, deleteCard);
        cardsContainer.append(cardElement);
    });
};

// Отрисовка изначальных карточек
renderCards(initialCards);