
class Auth {

    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    register(email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }), })
            .then(res => {
                if (res.status !== 400) {
                    return res.json();
                } else {
                    throw new Error("Некорректно заполнено одно из полей");
                }})
            .then(res => res)
            .catch(err => Promise.reject(err));
    };

    authorize(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }), })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }})
            .then(data => {
                if (data.token) {
                    localStorage.setItem("jwt", data.token);
                    return data;
                }})
            .catch(err => Promise.reject(err));
    };

    getContent(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }, })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }})
            .then(data => data)
            .catch(err => Promise.reject(err));
    };
}
const BASE_URL = "https://auth.nomoreparties.co";

const auth = new Auth(BASE_URL);

export default auth;
