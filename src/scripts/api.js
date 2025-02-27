const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-32',
    headers: {
        authorization: 'e3aec4e9-3494-45f2-a699-d5ae070bb7af',
        'Content-Type': 'application/json',
    },
};

// Обработка ответа от сервиса
function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// Изменение аватара
function updateUserAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method:'PATCH',
        headers: config.headers,
        body: JSON.stringify ({
            avatar: avatar,
        }),
    })
    .then(checkResponse);
}

// Отправление данных профиля
function patchUserInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify ({ name, about}),
    })
    .then(checkResponse);
}

// Отправление данных карточки
function postNewCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify ({ name, link}),
    })
    .then(checkResponse);
}

// Удаление своей карточки
function deleteCardUser(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(checkResponse);
}

// Получение данных профиля
function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
    })
    .then(checkResponse);
}

// Данные карточек
function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
    .then(checkResponse);
}

// Проверка лайка
function checkLike(cardId, isLiked) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
         method: isLiked ? "PUT" : "DELETE",
         headers: config.headers,
       }).then(checkResponse);
     }

export {getCards, getUserInfo, deleteCardUser, postNewCard, patchUserInfo, updateUserAvatar, checkLike};