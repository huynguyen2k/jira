import jiraApi from 'api/jiraApi'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
	getAllCommentsAction,
	getProjectDetailAction,
	getTaskDetailAction,
} from 'redux/actions/projectAction'

import {
	DELETE_COMMENT_API,
	GET_ALL_CATEGORY_PROJECT_ACTION,
	GET_ALL_CATEGORY_PROJECT_API,
	GET_ALL_COMMENTS_ACTION,
	GET_ALL_COMMENTS_API,
	GET_ALL_PRIORITY_ACTION,
	GET_ALL_PRIORITY_API,
	GET_ALL_STATUS_ACTION,
	GET_ALL_STATUS_API,
	GET_ALL_TASK_TYPE_ACTION,
	GET_ALL_TASK_TYPE_API,
	GET_PROJECT_DETAIL_ACTION,
	GET_PROJECT_DETAIL_API,
	GET_PROJECT_LIST_ACTION,
	GET_PROJECT_LIST_API,
	GET_TASK_DETAIL_ACTION,
	GET_TASK_DETAIL_API,
	INSERT_COMMENT_API,
	UPDATE_COMMENT_API,
	UPDATE_TASK_DETAIL_API,
	UPDATE_TASK_STATUS_API,
} from 'redux/constants/projectType'

function* getAllProjectCategoryApi() {
	try {
		const data = yield call(() => jiraApi.getAllProjectCategory())

		yield put({
			type: GET_ALL_CATEGORY_PROJECT_ACTION,
			projectCategoryList: data.content,
		})
	} catch (err) {
		console.log('Failed: ', err)
	}
}

export function* takeGetAllProjectCategoryApi() {
	yield takeLatest(GET_ALL_CATEGORY_PROJECT_API, getAllProjectCategoryApi)
}

function* getProjectListApi() {
	try {
		const data = yield call(() => jiraApi.getProjectList())

		yield put({
			type: GET_PROJECT_LIST_ACTION,
			projectList: data.content,
		})
	} catch (err) {
		console.log('Failed: ', err)
	}
}

export function* takeGetProjectListApi() {
	yield takeLatest(GET_PROJECT_LIST_API, getProjectListApi)
}

function* getProjectDetailApi(action) {
	try {
		const { content } = yield call(() =>
			jiraApi.getProjectDetailById(action.projectId)
		)

		yield put({
			type: GET_PROJECT_DETAIL_ACTION,
			projectDetail: content,
		})
	} catch (err) {
		console.log('Failed: ', err)
	}
}

export function* takeGetProjectDetailApi() {
	yield takeLatest(GET_PROJECT_DETAIL_API, getProjectDetailApi)
}

function* getAllTaskTypeApi() {
	try {
		const { content } = yield call(() => jiraApi.getAllTaskType())

		yield put({
			type: GET_ALL_TASK_TYPE_ACTION,
			taskTypeList: content,
		})
	} catch (err) {
		console.log(err)
	}
}

export function* takeGetAllTaskTypeApi() {
	yield takeLatest(GET_ALL_TASK_TYPE_API, getAllTaskTypeApi)
}

function* getAllPriorityApi() {
	try {
		const { content } = yield call(() => jiraApi.getAllPriority())

		yield put({
			type: GET_ALL_PRIORITY_ACTION,
			priorityList: content,
		})
	} catch (err) {
		console.log(err)
	}
}

export function* takeGetAllPriorityApi() {
	yield takeLatest(GET_ALL_PRIORITY_API, getAllPriorityApi)
}

export function* getAllStatusApi() {
	try {
		const { content } = yield call(() => jiraApi.getAllStatus())

		yield put({
			type: GET_ALL_STATUS_ACTION,
			statusList: content,
		})
	} catch (err) {
		console.log(err)
	}
}

export function* takeGetAllStatusApi() {
	yield takeLatest(GET_ALL_STATUS_API, getAllStatusApi)
}

function* getTaskDetailApi(action) {
	try {
		const { content } = yield call(() => jiraApi.getTaskDetail(action.taskId))

		yield put({
			type: GET_TASK_DETAIL_ACTION,
			taskDetail: content,
		})
	} catch (err) {
		console.log(err)
	}
}

export function* takeGetTaskDetailApi() {
	yield takeLatest(GET_TASK_DETAIL_API, getTaskDetailApi)
}

function* updateTaskDetailApi(action) {
	const newTask = action.newTask

	if (!newTask.listUserAsign) {
		newTask.listUserAsign = newTask.assigness.map(assignee => assignee.id)
	}

	try {
		yield call(() => jiraApi.updateTaskDetail(action.newTask))

		yield put(getTaskDetailAction(newTask.taskId))

		yield put(getProjectDetailAction(newTask.projectId))
	} catch (err) {
		console.log(err)
	}
}

export function* takeUpdateTaskDetailApi() {
	yield takeLatest(UPDATE_TASK_DETAIL_API, updateTaskDetailApi)
}

function* updateTaskStatusApi(action) {
	try {
		yield call(() => jiraApi.updateTaskStatus(action.task))
	} catch (err) {
		console.log(err)
	}
}

export function* takeUpdateTaskStatusApi() {
	yield takeLatest(UPDATE_TASK_STATUS_API, updateTaskStatusApi)
}

function* insertCommentApi(action) {
	try {
		yield call(() => jiraApi.insertComment(action.newComment))

		yield put(getAllCommentsAction(action.newComment.taskId))
	} catch (err) {
		console.log(err)
	}
}

export function* takeInsertCommentApi() {
	yield takeLatest(INSERT_COMMENT_API, insertCommentApi)
}

function* getAllCommentsApi(action) {
	try {
		const { content } = yield call(() => jiraApi.getAllComments(action.taskId))

		yield put({
			type: GET_ALL_COMMENTS_ACTION,
			commentList: content,
		})
	} catch (err) {
		console.log(err)
	}
}

export function* takeGetAllCommentsApi() {
	yield takeLatest(GET_ALL_COMMENTS_API, getAllCommentsApi)
}

function* deleteCommentApi(action) {
	try {
		yield call(() => jiraApi.deleteComment(action.idComment))

		yield put(getAllCommentsAction(action.taskId))
	} catch (err) {
		console.log(err)
	}
}

export function* takeDeleteCommentApi() {
	yield takeLatest(DELETE_COMMENT_API, deleteCommentApi)
}

function* updateCommentApi(action) {
	try {
		yield call(() => jiraApi.updateComment(action.commentUpdate))

		yield put(getAllCommentsAction(action.taskId))
	} catch (err) {
		console.log(err)
	}
}

export function* takeUpdateCommentApi() {
	yield takeLatest(UPDATE_COMMENT_API, updateCommentApi)
}
