import {
	GET_ALL_CATEGORY_PROJECT_ACTION,
	GET_ALL_COMMENTS_ACTION,
	GET_ALL_PRIORITY_ACTION,
	GET_ALL_STATUS_ACTION,
	GET_ALL_TASK_TYPE_ACTION,
	GET_PROJECT_DETAIL_ACTION,
	GET_PROJECT_LIST_ACTION,
	GET_TASK_DETAIL_ACTION,
} from 'redux/constants/projectType'

const initialState = {
	projectList: [],
	projectCategoryList: [],
	taskTypeList: [],
	priorityList: [],
	statusList: [],
	projectDetail: {},
	taskDetail: {},
	commentList: [],
}

const projectReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_CATEGORY_PROJECT_ACTION: {
			return {
				...state,
				projectCategoryList: action.projectCategoryList,
			}
		}

		case GET_PROJECT_LIST_ACTION: {
			return {
				...state,
				projectList: action.projectList,
			}
		}

		case GET_PROJECT_DETAIL_ACTION: {
			return {
				...state,
				projectDetail: action.projectDetail,
			}
		}

		case GET_ALL_PRIORITY_ACTION: {
			return {
				...state,
				priorityList: action.priorityList,
			}
		}

		case GET_ALL_TASK_TYPE_ACTION: {
			return {
				...state,
				taskTypeList: action.taskTypeList,
			}
		}

		case GET_ALL_STATUS_ACTION: {
			return {
				...state,
				statusList: action.statusList,
			}
		}

		case GET_TASK_DETAIL_ACTION: {
			return {
				...state,
				taskDetail: action.taskDetail,
			}
		}

		case GET_ALL_COMMENTS_ACTION: {
			return {
				...state,
				commentList: action.commentList,
			}
		}

		default:
			return state
	}
}

export default projectReducer
