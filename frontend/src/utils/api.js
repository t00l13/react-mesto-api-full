//     КЛАСС ДЛЯ ОТПРАВКИ ЗАПРОСОВ НА СЕРВЕР
 class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse (res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то не так, ошибка: ${res.status}`);
    }

    _getHeaders() {
        const jwt = localStorage.getItem("jwt");
        return {
            "Authorization" : `Bearer ${jwt}`,
            ...this._headers
        }
    }
    //--- МЕТОД ПОЛУЧЕНИЯ ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЯ
    getUserData(){
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this._getHeaders(),
        })
            .then(this._checkResponse)
    }
    //--- МЕТОД СОХРАНЕНИЯ ИНФОРМАЦИИ ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЯ
    saveUserChanges(data) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        })
            .then(this._checkResponse)
    }
    //--- МЕТОД СМЕНЫ АВАТАРА ПОЛЬЗОВАТЕЛЯ-
    changeAvatar(data) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkResponse)
    }
    //--- МЕТОД ПОЛУЧЕНИЯ КАРТОЧЕК С СЕРВЕРА
    getInitialCards() {
        return fetch(`${this._url}cards`, {
            method: 'GET',
            headers: this._getHeaders()
        })
            .then(this._checkResponse)
    }
    //--- МЕТОД ПУБЛИКАЦИИ НОВОЙ КАРТОЧКИ 
    postNewCard(data) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkResponse)
    }
    //--- МЕТОД УДАЛЕНИЕ КАРТОЧКИ
    deleteCard(id){
        return fetch(`${this._url}cards/${id}`, {
            method: "DELETE",
            headers: this._getHeaders(),
        }).then(this._checkResponse)
    }
    //--- МЕТОД ЛАЙКА КАРТОЧКИ
    changeLikeCardStatus(id, isNotLiked) {
        return fetch(`${this._url}cards/${id}`, {
            method: isNotLiked ? 'PUT' : 'DELETE',
            headers: this._getHeaders(),
            credentials: 'include',
        })
        .then(this._handleResponse)
    }
 }

const api = new Api({
    url: 'https://api.toolie-mesto.nomoredomains.icu/',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  export default api;