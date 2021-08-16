import {
	GET_USER_LIST_API,
	LOGIN_USER_API,
	SIGN_UP_USER_API,
} from 'redux/constants/userType'

export function loginUserAction(user) {
	return {
		type: LOGIN_USER_API,
		user,
	}
}

export function getUserListAction(keyword) {
	return {
		type: GET_USER_LIST_API,
		keyword,
	}
}

export function signUpUserAction(userSignUp) {
	return {
		type: SIGN_UP_USER_API,
		userSignUp,
	}
}
