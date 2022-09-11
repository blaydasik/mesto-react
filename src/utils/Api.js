import { apiSettings } from './constants.js';

class Api {

  //входные данные - адрес для запроса и объект заголовка
  constructor({ link, headers }) {
    this.link = link;
    this.headers = headers;
  }

  //приватный метод проверки ответа сервера
  _validateAnswer(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  //публичный метод, получающий информацию о пользователе с сервера
  downloadUserInfo() {
    return fetch(`${this.link}/users/me`, {
      headers: this.headers
    })
      .then(this._validateAnswer.bind(this));
  }

  //публичный метод, загружающий карточки с сервера
  downloadCards() {
    return fetch(`${this.link}/cards`, {
      headers: this.headers
    })
      .then(this._validateAnswer.bind(this));
  }

  //публичный метод, обновляющий данные пользователя на сервере
  setNewUserInfo(userData) {
    return fetch(`${this.link}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(userData)
    })
      .then(this._validateAnswer.bind(this));
  }

  //публичный метод, добавляющий карточку на сервер
  addNewCard(cardData) {
    return fetch(`${this.link}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(cardData)
    })
      .then(this._validateAnswer.bind(this));
  }

  //публичный метод, удаляющий карточку с сервера
  deleteCard(cardID) {
    return fetch(`${this.link}/cards/${cardID}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this._validateAnswer.bind(this));
  }

  //публичный метод для постановки/удаления лайка
  proceedLike(cardID, state) {
    return fetch(`${this.link}/cards/${cardID}/likes`, {
      method: (state ? "DELETE" : "PUT"),
      headers: this.headers,
    })
      .then(this._validateAnswer.bind(this));
  }

  //публичный метод для обновления аватара пользователя
  updateUserAvatar(link) {
    return fetch(`${this.link}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._validateAnswer.bind(this));
  }

}

//создадим класс для работы с Api
const workingApi = new Api(apiSettings);
export default workingApi;