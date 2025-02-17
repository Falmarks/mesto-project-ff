import {
  cardsTemplate,
  popupImage,
  cardsContainer,
  popupCaption,
  popupImageType
} from './index';
import {
  openModal
} from './modal';

const initialCards = [{
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

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

// Функция открытия картинок карточек?
const imageOpenPopup = (cardImage) => {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;
  openModal(popupImageType);
};

// Функция лайка
function likeCard(element) {
  element.target.classList.toggle('card__like-button_is-active');
};

// Функция удаления карточки
function deleteCard(element) {
  const cardElement = element.target.closest('.card');
  cardElement.remove();
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


export {
  initialCards,
  renderCard,
  renderCards,
  likeCard,
  deleteCard
}