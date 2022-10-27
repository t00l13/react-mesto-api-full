export const BASE_URL = "https://api.toolie-mesto.nomoredomains.icu";

function handleResponse(res) {
  if (res.ok) {
      return res.json()
  }
  return Promise.reject(res.status)
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`,{
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
})
    .then(handleResponse)
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
})
    .then(handleResponse)
};

export const checkToken = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
    }
})
    .then(handleResponse)
};

