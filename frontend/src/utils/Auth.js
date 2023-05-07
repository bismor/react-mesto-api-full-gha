class Auth {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
    this._headers = {
      "Content-Type": "application/json" 
    }
  }

  _resToJSON(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Произошла ошибка");
  }

  signUp(password, email) {
    return fetch(`${this._baseUrl}signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password
      }),

    }).then(this._resToJSON)
  }

  checkJwtToken(token) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
    })
    .then(this._resToJSON)
  }

  signIn(email, password) {
    return fetch(`${this._baseUrl}signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
    .then(this._resToJSON)
  }

}

const auth = new Auth({
  baseUrl: process.env.REACT_APP_API_URL
});

export default auth