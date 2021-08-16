import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.scss'
import { getAllProjectCategoryAction } from 'redux/actions/projectAction'
import Loading from 'components/Loading'
import ToastMessageList from 'components/ToastMessageList'
import { sleep } from 'util/utilFunctions'
import jiraApi from 'api/jiraApi'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import CreateProjectForm from 'components/CreateProjectForm'

export default function CreateProject() {
	const dispatch = useDispatch()
	const projectCategoryList = useSelector(
		state => state.projectReducer.projectCategoryList
	)

	const [isLoading, setIsLoading] = useState(false)
	const [toastMessageList, setToastMessageList] = useState([])

	useEffect(() => {
		dispatch(getAllProjectCategoryAction())
	}, [dispatch])

	async function handleCreateProject(values) {
		let toastMessage

		setIsLoading(true)
		await sleep(2000)

		try {
			await jiraApi.createProject(values)

			toastMessage = {
				type: 'success',
				title: 'Success',
				message: 'Create new project successfully!',
				timeout: 5000,
			}
		} catch (err) {
			toastMessage = {
				type: 'error',
				title: 'Error',
				message: 'Project name already existed!',
				timeout: 5000,
			}
		}

		setToastMessageList([...toastMessageList, toastMessage])
		setIsLoading(false)
	}

	return (
		<div className="create-project">
			{isLoading && <Loading />}
			<ToastMessageList toastMessageList={toastMessageList} />

			<Breadcrumb list={['Project', 'Create Project']} />
			<h1 className="create-project__header">Project Details</h1>

			<CreateProjectForm
				projectCategoryList={projectCategoryList}
				onCreateProject={handleCreateProject}
			/>
		</div>
	)
}
