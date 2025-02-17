const openModal = (evt) => {
    evt.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalOnEscape);
};

const closeModal = (evt) => {
    evt.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalOnEscape);
};

const closeModalOnEscape = (evt) => {
    if (evt.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_is-opened');
        closeModal(currentPopup);
    }
}

export {
    openModal,
    closeModal,
};