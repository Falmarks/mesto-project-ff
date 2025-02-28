// Темплейт карточки
const cardsTemplate = document.querySelector('#card-template').content;

// Функция удаления карточки
function deleteCard(evt) {
    const cardElement = evt.target.closest('.card');
    if (cardElement) {
        cardElement.remove();
    } else {
        console.error('Card element not found');
    }
}

// Функция создания карточки
function createCard(cardInfo, userId, imageHandler, likeHandler, cardDeleteOnServer) {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');
    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;

    if (cardInfo.likes.some((ures) => ures._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    if (cardInfo.likes.length > 0) {
        cardLikeCounter.textContent = cardInfo.likes.length;
        cardLikeCounter.classList.remove('card__like-count_hidden');
    } else {
        cardLikeCounter.classList.add('card__like-count_hidden');
    }

    likeButton.addEventListener('click', () => likeHandler(cardInfo._id, likeButton));

    if (userId !== cardInfo.owner._id) {
        cardDeleteButton.style.display = 'none';
    } else {
        cardDeleteButton.addEventListener('click', (evt) => {
            cardDeleteOnServer(cardInfo._id);
        });
    }

    cardImage.addEventListener('click', () => {
        imageHandler(cardInfo.link, cardInfo.name);
    });

    return cardElement;
}

export {
    createCard
}