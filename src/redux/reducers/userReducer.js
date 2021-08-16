import { GET_USER_LIST_ACTION } from 'redux/constants/userType'

const initialState = {
	userList: [],
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_LIST_ACTION: {
			return {
				...state,
				userList: action.userList,
			}
		}

		default:
			return state
	}
}

export default userReducer
