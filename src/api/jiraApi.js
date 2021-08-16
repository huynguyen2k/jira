import { TOKEN } from 'setting/globalConst'
import axiosClient from './axiosClient'

const jiraApi = {
	signIn: loginUser => {
		return axiosClient.post('/Users/signin', loginUser)
	},

	signUp: userSignUp => {
		return axiosClient.post('/Users/signup', userSignUp)
	},

	deleteUser: userId => {
		return axiosClient.delete('/Users/deleteUser', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
			params: {
				id: userId,
			},
		})
	},

	editUser: user => {
		return axiosClient.put('/Users/editUser', user)
	},

	getAllProjectCategory: () => {
		return axiosClient.get('/ProjectCategory')
	},

	createProject: newProject => {
		newProject.alias = newProject.projectName

		return axiosClient.post('/Project/createProjectAuthorize', newProject, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},

	getProjectList: () => {
		return axiosClient.get('/Project/getAllProject', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},

	updateProject: projectEdit => {
		return axiosClient.put(`/Project/updateProject`, projectEdit, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
			params: {
				projectId: projectEdit.id,
			},
		})
	},

	deleteProject: projectId => {
		return axiosClient.delete('/Project/deleteProject', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
			params: {
				projectId: projectId,
			},
		})
	},

	removeUserFromProject: project => {
		return axiosClient.post('/Project/removeUserFromProject', project, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},

	getUserList: keyword => {
		return axiosClient.get('/Users/getUser', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
			params: keyword,
		})
	},

	assignUserProject: info => {
		return axiosClient.post('/Project/assignUserProject', info, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},

	getProjectDetailById: projectId => {
		return axiosClient.get('/Project/getProjectDetail', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
			params: {
				id: projectId,
			},
		})
	},

	getAllTaskType: () => {
		return axiosClient.get('/TaskType/getAll')
	},

	getAllPriority: () => {
		return axiosClient.get('/Priority/getAll')
	},

	getAllStatus: () => {
		return axiosClient.get('/Status/getAll')
	},

	createTask: task => {
		return axiosClient.post('/Project/createTask', task, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},

	getTaskDetail: taskId => {
		return axiosClient.get('/Project/getTaskDetail', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
			params: {
				taskId,
			},
		})
	},

	updateTaskDetail: newTask => {
		return axiosClient.post('/Project/updateTask', newTask, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},

	updateTaskStatus: task => {
		return axiosClient.put('/Project/updateStatus', task, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},

	insertComment: newComment => {
		return axiosClient.post('/Comment/insertComment', newComment, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
		})
	},

	getAllComments: taskId => {
		return axiosClient.get('/Comment/getAll', {
			params: {
				taskId,
			},
		})
	},

	deleteComment: idComment => {
		return axiosClient.delete('/Comment/deleteComment', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
			params: {
				idComment,
			},
		})
	},

	updateComment: commentUpdate => {
		return axiosClient.put('/Comment/updateComment', null, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem(TOKEN),
			},
			params: commentUpdate,
		})
	},
}

export default jiraApi
