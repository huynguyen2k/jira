import { all } from 'redux-saga/effects'
import {
	takeDeleteCommentApi,
	takeGetAllCommentsApi,
	takeGetAllPriorityApi,
	takeGetAllProjectCategoryApi,
	takeGetAllStatusApi,
	takeGetAllTaskTypeApi,
	takeGetProjectDetailApi,
	takeGetProjectListApi,
	takeGetTaskDetailApi,
	takeInsertCommentApi,
	takeUpdateCommentApi,
	takeUpdateTaskDetailApi,
	takeUpdateTaskStatusApi,
} from './projectSaga'
import { takeGetUserListApi, takeSignUpUserApi } from './userSaga'

export default function* rootSaga() {
	yield all([
		takeGetAllProjectCategoryApi(),
		takeGetProjectListApi(),
		takeGetUserListApi(),
		takeGetProjectDetailApi(),
		takeGetAllPriorityApi(),
		takeGetAllTaskTypeApi(),
		takeGetAllStatusApi(),
		takeGetTaskDetailApi(),
		takeUpdateTaskDetailApi(),
		takeUpdateTaskStatusApi(),
		takeInsertCommentApi(),
		takeGetAllCommentsApi(),
		takeDeleteCommentApi(),
		takeUpdateCommentApi(),
		takeSignUpUserApi(),
	])
}
