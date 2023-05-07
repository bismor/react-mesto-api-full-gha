class Api {
  constructor({ headers, baseUrl }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //Эта функция заменяет в объекте ID с нижним подчеркиванием на обычное id. используется только для карточек
  fixIdProperty(obj) {
    return { ...obj, id: obj._id };
  } 

  _resToJSON(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Произошла ошибка");
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    })
      .then(this._resToJSON)
       .then((respawns) => {return respawns.data})
      // .then((res) => res.map(this.fixIdProperty));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
    }).then(this._resToJSON)
    .then((respawns) => {return respawns.data})
  }

  addLikeCard(id) {
    return fetch(
      `${this._baseUrl}cards/` + id + "/likes",
      {
        method: "PUT",
        headers: this._headers,
      }
    )
      .then(this._resToJSON)
      .then((respawns) => {return respawns.data})
      // .then(this.fixIdProperty);
  }

  removeLikeCard(id) {
    return fetch(
      `${this._baseUrl}cards/` + id + "/likes",
      {
        method: "DELETE",
        headers: this._headers,
      }
    )
      .then(this._resToJSON)
      .then((respawns) => {return respawns.data})
      // .then(this.fixIdProperty);
  }

  deleteCardServer(id) {
    return fetch(`${this._baseUrl}cards/` + id, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._resToJSON)
      // .then(this.fixIdProperty);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: this._headers,
    })
      .then(this._resToJSON)
      .then((respawns) => {return respawns.data[0]})
      // .then(this.fixIdProperty);
  }

  setUserInfo(formvalue) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: formvalue.name,
        about: formvalue.about,
      }),
    })
    .then(this._resToJSON)
    .then((respawns) => {return respawns.data});
  }

  setUserAvatar(link) {
    return fetch(
      `${this._baseUrl}users/me/avatar`,
      {
        method: "PATCH",
        body: JSON.stringify(link),
        headers: this._headers,
      }
    )
    .then(this._resToJSON)
    .then((respawns) => {return respawns.data});
  }

  changeAuthToken(token) {
    this._headers["authorization"] = `Bearer ${token}`;
  }
}

const api = new Api({
  headers: {
    "Content-Type": "Application/JSON",
  },
  baseUrl: process.env.REACT_APP_API_URL,
});

export default api;
