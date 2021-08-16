import {
	DELETE_COMMENT_API,
	GET_ALL_CATEGORY_PROJECT_API,
	GET_ALL_COMMENTS_API,
	GET_ALL_PRIORITY_API,
	GET_ALL_STATUS_API,
	GET_ALL_TASK_TYPE_API,
	GET_PROJECT_DETAIL_API,
	GET_PROJECT_LIST_API,
	GET_TASK_DETAIL_API,
	INSERT_COMMENT_API,
	UPDATE_COMMENT_API,
	UPDATE_TASK_DETAIL_API,
	UPDATE_TASK_STATUS_API,
} from 'redux/constants/projectType'

export function getAllProjectCategoryAction() {
	return {
		type: GET_ALL_CATEGORY_PROJECT_API,
	}
}

export function getProjectListAction() {
	return {
		type: GET_PROJECT_LIST_API,
	}
}

export function getProjectDetailAction(projectId) {
	return {
		type: GET_PROJECT_DETAIL_API,
		projectId,
	}
}

export function getAllTaskTypeAction() {
	return {
		type: GET_ALL_TASK_TYPE_API,
	}
}

export function getAllPriorityAction() {
	return {
		type: GET_ALL_PRIORITY_API,
	}
}

export function getAllStatusAction() {
	return {
		type: GET_ALL_STATUS_API,
	}
}

export function getTaskDetailAction(taskId) {
	return {
		type: GET_TASK_DETAIL_API,
		taskId,
	}
}

export function updateTaskDetailAction(newTask) {
	return {
		type: UPDATE_TASK_DETAIL_API,
		newTask,
	}
}

export function updateTaskStatusAction(task) {
	return {
		type: UPDATE_TASK_STATUS_API,
		task,
	}
}

export function insertCommentAction(newComment) {
	return {
		type: INSERT_COMMENT_API,
		newComment,
	}
}

export function getAllCommentsAction(taskId) {
	return {
		type: GET_ALL_COMMENTS_API,
		taskId,
	}
}

export function deleteCommentAction(idComment, taskId) {
	return {
		type: DELETE_COMMENT_API,
		idComment,
		taskId,
	}
}

export function updateCommentAction(taskId, commentUpdate) {
	return {
		type: UPDATE_COMMENT_API,
		taskId,
		commentUpdate,
	}
}
