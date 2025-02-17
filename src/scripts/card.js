  // Функция лайка
  function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

// Функция удаления карточки
function deleteCard(evt) {
    const cardElement = evt.target.closest('.card');
    cardElement.remove();
};
export {
    likeCard,
    deleteCard,
}