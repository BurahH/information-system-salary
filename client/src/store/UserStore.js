import { makeAutoObservable } from 'mobx';

export default class UserStore {
	constructor() {
		this._isAuth = false;
		this._info = {
			id: null,
			name: null,
			login: null,
			role: null,
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
