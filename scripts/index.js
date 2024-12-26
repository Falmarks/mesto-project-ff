// @todo: Темплейт карточки
const cardsTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddCardPopup = document.querySelector('.popup_type_new-card');
// @todo: Функция создания карточки
function createCard(cardInformation){
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true); 
    const cardDeleteButton = cardElement.querySelector('.card__delete-button')
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardInformation.link;
    cardImage.alt = cardInformation.name;
    cardElement.querySelector('.card__description').textContent = cardInformation.link;
    cardDeleteButton.addEventListener('click', removeCard);
    return cardElement;
};
// @todo: Функция удаления карточки
const removeCard = function(e) {
    e.target.closest(".card").remove();
};
// @todo: Вывести карточки на страницу
function loadCards (cardsMassive) {
    cardsMassive.forEach(function (element){
        const cardElement = createCard(element);
        cardList.append(cardElement);
    });
};
loadCards(initialCards);