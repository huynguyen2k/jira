import ProjectBoard from 'containers/ProjectBoard'
import ProjectManagement from 'containers/ProjectManagement'
import CreateProject from 'containers/CreateProject'
import NotFoundPage from 'pages/NotFound'
import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import SideBar from 'containers/SideBar'
import NavBar from 'components/NavBar'
import Modal from 'components/Modal'
import CreateTaskForm from 'components/CreateTaskForm'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
	getAllPriorityAction,
	getAllStatusAction,
	getAllTaskTypeAction,
	getProjectDetailAction,
	getProjectListAction,
} from 'redux/actions/projectAction'
import Loading from 'components/Loading'
import ToastMessageList from 'components/ToastMessageList'
import { sleep } from 'util/utilFunctions'
import jiraApi from 'api/jiraApi'
import UserManagement from 'containers/UserManagement'

export default function ProjectPage() {
	const match = useRouteMatch()
	const dispatch = useDispatch()

	const [isLoading, setIsLoading] = useState(false)
	const [messages, setMessages] = useState([])

	const [isShowCreateTaskModal, setIsShowCreateTaskModal] = useState(false)

	const projectList = useSelector(state => state.projectReducer.projectList)
	const priorityList = useSelector(state => state.projectReducer.priorityList)
	const taskTypeList = useSelector(state => state.projectReducer.taskTypeList)
	const statusList = useSelector(state => state.projectReducer.statusList)

	useEffect(() => {
		dispatch(getProjectListAction())
		dispatch(getAllPriorityAction())
		dispatch(getAllTaskTypeAction())
		dispatch(getAllStatusAction())
	}, [dispatch])

	function handleCreateTask() {
		setIsShowCreateTaskModal(true)
	}

	async function handleSubmitTask(task) {
		let message

		setIsLoading(true)
		await sleep(2000)

		try {
			await jiraApi.createTask(task)
			dispatch(getProjectDetailAction(task.projectId))

			message = {
				type: 'success',
				title: 'Success',
				message: 'You created a new task successfully!',
				timeout: 5000,
			}
		} catch (err) {
			message = {
				type: 'error',
				title: 'Error',
				message: 'You failed to create a new task!',
				timeout: 5000,
			}
			console.log(err)
		}

		setMessages([...messages, message])
		setIsLoading(false)
	}

	return (
		<div className="project">
			{isLoading && <Loading />}
			<ToastMessageList toastMessageList={messages} />

			<SideBar onCreateTask={handleCreateTask} />
			<NavBar />
			<div className="project__main">
				<Switch>
					<Redirect
						exact
						from={match.url}
						to={`${match.url}/project-management`}
					/>
					<Route
						exact
						path={`${match.url}/project-management`}
						component={ProjectManagement}
					/>
					<Route
						exact
						path={`${match.url}/user-management`}
						component={UserManagement}
					/>
					<Route
						exact
						path={`${match.url}/project-board/:projectId`}
						component={ProjectBoard}
					/>
					<Route
						exact
						path={`${match.url}/create-project`}
						component={CreateProject}
					/>
					<Route component={NotFoundPage} />
				</Switch>
			</div>

			<Modal
				isShowModal={isShowCreateTaskModal}
				onCloseModal={() => setIsShowCreateTaskModal(false)}
			>
				<CreateTaskForm
					projectList={projectList}
					priorityList={priorityList}
					taskTypeList={taskTypeList}
					statusList={statusList}
					onSubmitTask={handleSubmitTask}
				/>
			</Modal>
		</div>
	)
}
