import jiraApi from 'api/jiraApi'
import ConfirmBox from 'components/ConfirmBox'
import EditProjectForm from 'components/EditProjectForm'
import Loading from 'components/Loading'
import MembersControl from 'components/MembersControl'
import Modal from 'components/Modal'
import ProjectList from 'components/ProjectList'
import ToastMessageList from 'components/ToastMessageList'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectListAction } from 'redux/actions/projectAction'
import { getUserListAction } from 'redux/actions/userAction'
import { sleep } from 'util/utilFunctions'

export default function ProjectManagement() {
	console.log('render ProjectManagement')

	const dispatch = useDispatch()
	const projectList = useSelector(state => state.projectReducer.projectList)
	const userList = useSelector(state => state.userReducer.userList)

	const [isShowEditProjectModal, setIsShowEditProjectModal] = useState(false)
	const [projectEdit, setProjectEdit] = useState({})

	const [isShowDeleteConfirmModal, setIsShowDeleteConfirmModal] =
		useState(false)

	const [isShowMembersModal, setIsShowMembersModal] = useState(false)

	const [deleteProjectId, setDeleteProjectId] = useState(null)

	const [isLoading, setIsLoading] = useState(false)
	const [toastMessageList, setToastMessageList] = useState([])

	const [projectView, setProjectView] = useState([])

	useEffect(() => {
		dispatch(getUserListAction())
	}, [dispatch])

	useEffect(() => {
		dispatch(getProjectListAction())
	}, [dispatch])

	function handleCloseModal() {
		setIsShowEditProjectModal(false)
		setIsShowDeleteConfirmModal(false)
		setIsShowMembersModal(false)
	}

	function handleEditProject(project) {
		setIsShowEditProjectModal(true)
		setProjectEdit(project)
	}

	async function handleDeleteProject(projectId) {
		setIsShowDeleteConfirmModal(true)
		setDeleteProjectId(projectId)
	}

	async function handleConfirmDeleteProject(isConfirm) {
		setIsShowDeleteConfirmModal(false)

		if (isConfirm && deleteProjectId !== null) {
			let toastMessage

			setIsLoading(true)
			await sleep(2000)

			try {
				await jiraApi.deleteProject(deleteProjectId)
				dispatch(getProjectListAction())

				toastMessage = {
					type: 'success',
					title: 'Success',
					message: 'You deleted project successfully!',
					timeout: 5000,
				}
			} catch (err) {
				toastMessage = {
					type: 'error',
					title: 'Failed',
					message: 'Delete project failure!',
					timeout: 5000,
				}

				console.log('Failed: ', err)
			}

			setToastMessageList([...toastMessageList, toastMessage])
			setIsLoading(false)
		}
	}

	async function handleSubmitEditProjectForm(projectEdit) {
		setIsLoading(true)
		await sleep(2000)

		let toastMessage
		try {
			await jiraApi.updateProject(projectEdit)
			dispatch(getProjectListAction())

			setIsShowEditProjectModal(false)
			toastMessage = {
				type: 'success',
				title: 'Success',
				message: 'You updated successfully!',
				timeout: 5000,
			}
		} catch (err) {
			toastMessage = {
				type: 'error',
				title: 'Error',
				message: 'You updated failure!',
				timeout: 5000,
			}
			console.log('Failed: ', err)
		}

		setToastMessageList([...toastMessageList, toastMessage])
		setIsLoading(false)
	}

	function handleViewMembers(projectView) {
		setIsShowMembersModal(true)
		setProjectView(projectView)
	}

	async function handleDeleteMember(projectId, userId) {
		const project = {
			projectId: projectId,
			userId,
		}

		setIsLoading(true)
		await sleep(2000)

		let toastMessage
		try {
			await jiraApi.removeUserFromProject(project)

			const memberIndex = projectView.members.findIndex(
				member => member.userId === userId
			)

			if (memberIndex > -1) {
				projectView.members.splice(memberIndex, 1)

				setProjectView({ ...projectView })
			}

			toastMessage = {
				type: 'success',
				title: 'Success',
				message: 'You deleted member successfully!',
				timeout: 5000,
			}
		} catch (err) {
			console.log('Failed: ', err)
			toastMessage = {
				type: 'error',
				title: 'Error',
				message: "You don't have permission to delete!",
				timeout: 5000,
			}
		}

		setIsLoading(false)
		setToastMessageList([...toastMessageList, toastMessage])
	}

	async function handleAssignUserIntoProject(info) {
		setIsLoading(true)
		await sleep(2000)

		let toastMessage

		try {
			await jiraApi.assignUserProject(info)

			toastMessage = {
				type: 'success',
				title: 'Success',
				message: 'You inserted member successfully!',
				timeout: 5000,
			}

			const newMember = userList.find(member => member.userId === info.userId)

			if (newMember) {
				projectView.members.push({
					userId: newMember.userId,
					name: newMember.name,
					avatar: newMember.avatar,
				})

				setProjectView({ ...projectView })
			}
		} catch (err) {
			console.log('Failed: ', err)

			toastMessage = {
				type: 'error',
				title: 'Warning',
				message: 'You just only add members into your project!',
				timeout: 5000,
			}
		}

		setIsLoading(false)
		setToastMessageList([...toastMessageList, toastMessage])
	}

	return (
		<div className="project-management">
			{isLoading && <Loading />}
			<ToastMessageList toastMessageList={toastMessageList} />

			<ProjectList
				projectList={projectList}
				onEditProject={handleEditProject}
				onDeleteProject={handleDeleteProject}
				onViewMembers={handleViewMembers}
			/>

			<Modal isShowModal={isShowMembersModal} onCloseModal={handleCloseModal}>
				<MembersControl
					project={projectView}
					userList={userList}
					onDeleteMember={handleDeleteMember}
					onAssignUser={handleAssignUserIntoProject}
				/>
			</Modal>

			<Modal
				isShowModal={isShowEditProjectModal}
				onCloseModal={handleCloseModal}
			>
				<EditProjectForm
					projectEdit={projectEdit}
					onSubmitEditProjectForm={handleSubmitEditProjectForm}
				/>
			</Modal>

			<Modal
				isShowModal={isShowDeleteConfirmModal}
				onCloseModal={handleCloseModal}
			>
				<ConfirmBox
					type="error"
					title="Warning"
					message="Are you sure to delete this project?"
					onConfirm={handleConfirmDeleteProject}
				/>
			</Modal>
		</div>
	)
}
