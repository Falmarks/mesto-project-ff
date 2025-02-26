// Темплейт карточки
const cardsTemplate = document.querySelector('#card-template').content;

// Функция лайка
  function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

// Функция удаления карточки
function deleteCard(evt) {
    const cardElement = evt.target.closest('.card');
    cardElement.remove();
};

// Функция создания карточки
function createCard(cardInfo, imageHandler, likeHandler, deleteHandler, userId) {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');
    
    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cardLikeCounter.textContent = cardInfo.likes.length;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    
    likeButton.addEventListener('click', likeHandler);
    
    if (userId !== cardInfo.owner._id) {
        cardDeleteButton.style.display = 'none';
    } else {
        cardDeleteButton.addEventListener('click', () => {
            const cardId = cardInfo._id;
            deleteHandler(cardElement, cardId);
        });
    }
    
    cardImage.addEventListener('click', () => {
        imageHandler(cardInfo.link, cardInfo.name);
    });
    
    return cardElement;
}

export {
    likeCard,
    deleteCard,
    createCard
}