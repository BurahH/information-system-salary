import { makeAutoObservable } from 'mobx';

export default class UserStore {
	constructor() {
		this._isAuth = true;
		this._info = {
      id: 1,
      name: "Ваня",
      login: "SuperVanya",
      role: 'Администратор'
    };

		makeAutoObservable(this);
	}

	setIsAuth(isAuth) {
		this._isAuth = isAuth;
	}

	setUser(info) {
		this._info = info;
	}

	get isAuth() {
		return this._isAuth;
	}

	get info() {
		return this._info;
	}
}
