import jiraApi from 'api/jiraApi'
import EditUserForm from 'components/EditUserForm'
import Loading from 'components/Loading'
import Modal from 'components/Modal'
import ToastMessageList from 'components/ToastMessageList'
import UserList from 'components/UserList'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserListAction } from 'redux/actions/userAction'
import { sleep } from 'util/utilFunctions'

export default function ProjectManagement() {
	const [isLoading, setIsLoading] = useState(false)
	const [toastMessages, setToastMessages] = useState([])

	const [userEdit, setUserEdit] = useState(null)
	const [showEditUserModal, setShowEditUserModal] = useState(false)

	const dispatch = useDispatch()
	const userList = useSelector(state => state.userReducer.userList)

	useEffect(() => {
		dispatch(getUserListAction())
	}, [dispatch])

	async function handleDeleteUser(userId) {
		let message

		setIsLoading(true)
		await sleep(2000)

		try {
			await jiraApi.deleteUser(userId)

			dispatch(getUserListAction())
			message = {
				type: 'success',
				title: 'Success',
				message: 'Delete user successfully!',
				timeout: 5000,
			}
		} catch (err) {
			message = {
				type: 'error',
				title: 'Error',
				message: 'Delete user failed!',
				timeout: 5000,
			}
			console.log(err)
		}

		setToastMessages([...toastMessages, message])
		setIsLoading(false)
	}

	function handleFilterUser(value) {
		dispatch(
			getUserListAction({
				keyword: value,
			})
		)
	}

	function handleEditUser(userEdit) {
		setShowEditUserModal(true)
		setUserEdit({
			id: userEdit.userId,
			passWord: '',
			email: userEdit.email,
			name: userEdit.name,
			phoneNumber: userEdit.phoneNumber,
		})
	}

	async function handleSubmitUserEdit(user) {
		try {
			await jiraApi.editUser(user)

			dispatch(getUserListAction())
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="user-management">
			{isLoading && <Loading />}
			<ToastMessageList toastMessageList={toastMessages} />
			<Modal
				isShowModal={showEditUserModal}
				onCloseModal={() => setShowEditUserModal(false)}
			>
				<EditUserForm
					userEdit={userEdit}
					onSubmitUserEdit={handleSubmitUserEdit}
				/>
			</Modal>
			<UserList
				userList={userList}
				onDeleteUser={handleDeleteUser}
				onFilterUser={handleFilterUser}
				onEditUser={handleEditUser}
				limit={10}
			/>
		</div>
	)
}
