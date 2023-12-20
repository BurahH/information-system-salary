import { makeAutoObservable } from 'mobx';

export default class UserStore {
	constructor() {
		this._isAuth = false;
		this._userInfo = {};

		makeAutoObservable(this);
	}

	setIsAuth(newIsAuth) {
		this._isAuth = newIsAuth;
	}

	setUser(newUserInfo) {
		this._userInfo = newUserInfo;
	}

	get isAuth() {
		return this._isAuth;
	}

	get userInfo() {
		return this._userInfo;
	}
}
