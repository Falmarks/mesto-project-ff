import '../pages/index.css';
import './cards.js';
// @todo: Темплейт карточки
const cardsTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddCardPopup = document.querySelector('.popup_type_new-card');
// @todo: Функция создания карточки
function createCard(cardInfo){
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true); 
    const cardDeleteButton = cardElement.querySelector('.card__delete-button')
    const cardImage = cardElement.querySelector('.card__image');
    const card = cardElement;
    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    cardDeleteButton.addEventListener('click', () => deleteCard(card)); 
    return cardElement;
};
// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove()
} 
// @todo: Вывести карточки на страницу
function renderCards (cardDataList) {
    cardDataList.forEach(function (element){
        const cardElement = createCard(element);
        cardsContainer.append(cardElement);
    });
};
renderCards(initialCards);