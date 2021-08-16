import jiraApi from 'api/jiraApi'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
	GET_USER_LIST_ACTION,
	GET_USER_LIST_API,
	SIGN_UP_USER_API,
} from 'redux/constants/userType'

function* getUserListApi(action) {
	try {
		const { content: userList } = yield call(() =>
			jiraApi.getUserList(action.keyword)
		)

		yield put({
			type: GET_USER_LIST_ACTION,
			userList,
		})
	} catch (err) {
		console.log('Failed: ', err)
	}
}

export function* takeGetUserListApi() {
	yield takeLatest(GET_USER_LIST_API, getUserListApi)
}

function* signUpUserApi(action) {
	console.log(action)
	try {
		yield call(() => jiraApi.signUp(action.userSignUp))
	} catch (err) {
		console.log(err)
	}
}

export function* takeSignUpUserApi() {
	yield takeLatest(SIGN_UP_USER_API, signUpUserApi)
}
