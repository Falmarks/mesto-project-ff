const openModal = (element) => {
    element.classList.add('popup_is-opened');
    element.addEventListener('click', closeModalByOverlay);
    document.addEventListener('click', closeModalOnX);
    document.addEventListener('keydown', closeModalOnEscape);

};

const closeModal = (element) => {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalOnEscape);
    document.removeEventListener('click', closeModalOnX);
    element.removeEventListener('click', closeModalByOverlay);
};

const closeModalByOverlay = (element) => {
    if (element.target === element.currentTarget) {
        closeModal(element.currentTarget);
    }
};

const closeModalOnEscape = (element) => {
    if (element.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_is-opened');
        closeModal(currentPopup);
    }
}

const closeModalOnX = (element) => {
    if (element.target.classList.contains('popup__close')) {
        const currentPopup = element.target.closest('.popup_is-opened');
        closeModal(currentPopup);
    }
};

// Функция заполнения строк попапа редактирования профиля
const profilePopupFill = (form, name, description) => {
    form.elements.name.value = name;
    form.elements.description.value = description;
};

export {
    openModal,
    closeModal,
    profilePopupFill
};