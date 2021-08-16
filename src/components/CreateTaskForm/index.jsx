import React, { useState } from 'react'
import './style.scss'
import { Form, Formik } from 'formik'
import CustomInputField from 'components/CustomFields/CustomInputField'
import CustomReactSelectField from 'components/CustomFields/CustomReactSelectField'
import CustomAssigneesSelect from 'components/CustomFields/CustomAssigneesSelect'
import CustomEditorField from 'components/CustomFields/CustomEditorField'
import * as Yup from 'yup'

function getProjectListOptions(projectList) {
	if (!Array.isArray(projectList)) return []

	return projectList.map(project => {
		return {
			value: project.id,
			label: project.projectName,
		}
	})
}

function getAssigneesOptions(selectedProject) {
	if (!selectedProject) return []

	return selectedProject.members.map(member => {
		return {
			value: member.userId,
			label: member.name,
		}
	})
}

function getStatusListOptions(statusList) {
	if (!Array.isArray(statusList)) return []

	return statusList.map(status => {
		return {
			value: status.statusId,
			label: status.statusName,
		}
	})
}

function getTaskTypeListOptions(taskTypeList) {
	if (!Array.isArray(taskTypeList)) return []

	return taskTypeList.map(taskType => {
		return {
			value: taskType.id,
			label: taskType.taskType,
		}
	})
}

function getPriorityListOptions(priorityList) {
	if (!Array.isArray(priorityList)) return []

	return priorityList.map(priority => {
		return {
			value: priority.priorityId,
			label: priority.priority,
		}
	})
}

export default function CreateTaskForm(props) {
	const { projectList, taskTypeList, priorityList, statusList, onSubmitTask } =
		props

	const [selectedProject, setSelectedProject] = useState(null)

	return (
		<Formik
			initialValues={{
				projectId: null,
				taskName: '',
				statusId: null,
				priorityId: null,
				typeId: null,
				listUserAsign: [],
				originalEstimate: '',
				timeTrackingSpent: '',
				timeTrackingRemaining: '',
				description: '',
			}}
			validationSchema={Yup.object({
				projectId: Yup.number()
					.required('Project name is required!')
					.nullable(),
				taskName: Yup.string().required('Task name is required!'),
				statusId: Yup.string().required('Status is required!').nullable(),
				priorityId: Yup.number().required('Priority is required!').nullable(),
				typeId: Yup.number().required('Task type is required!').nullable(),
				listUserAsign: Yup.array().min(1, 'Assignees must be at least 1!'),
				originalEstimate: Yup.number()
					.required('Original estimate is required!')
					.min(0, 'The hours at least 0'),
				timeTrackingSpent: Yup.number()
					.required('Time spent is required!')
					.min(0, 'The hours at least 0'),
				timeTrackingRemaining: Yup.number()
					.required('Time remaining is required!')
					.min(0, 'The hours at least 0'),
				description: Yup.string().required('Description is required!'),
			})}
			onSubmit={(values, formik) => {
				if (onSubmitTask) {
					onSubmitTask(values)
				}

				formik.resetForm()
			}}
		>
			{formik => {
				function handleProjectNameChange(option) {
					formik.setFieldValue('listUserAsign', [], true)

					if (!Array.isArray(projectList)) return

					const selectedProject = projectList.find(
						project => project.id === option.value
					)

					if (selectedProject) {
						setSelectedProject(selectedProject)
					}
				}

				return (
					<Form className="create-task-form">
						<h3 className="create-task-form__title">Create task</h3>

						<div className="create-task-form__row">
							<CustomReactSelectField
								label="Project name"
								name="projectId"
								placeholder="Select a project name"
								options={getProjectListOptions(projectList)}
								onOptionChange={handleProjectNameChange}
							/>
						</div>

						<div className="create-task-form__row">
							<CustomInputField
								type="text"
								id="taskName"
								name="taskName"
								label="Task name"
							/>
						</div>

						<div className="create-task-form__row">
							<CustomReactSelectField
								label="Status"
								name="statusId"
								placeholder="Select a status"
								options={getStatusListOptions(statusList)}
							/>

							<CustomReactSelectField
								label="Priority"
								name="priorityId"
								placeholder="Select a priority"
								options={getPriorityListOptions(priorityList)}
							/>

							<CustomReactSelectField
								label="Task type"
								name="typeId"
								placeholder="Select a task type"
								options={getTaskTypeListOptions(taskTypeList)}
							/>
						</div>

						<div className="create-task-form__row">
							<CustomAssigneesSelect
								label="Assignees"
								name="listUserAsign"
								placeholder="Can select multiple members"
								options={getAssigneesOptions(selectedProject)}
							/>
						</div>

						<div className="create-task-form__row">
							<CustomInputField
								type="number"
								label="Original estimate"
								id="originalEstimate"
								name="originalEstimate"
							/>

							<CustomInputField
								type="number"
								label="Time spent (hours)"
								id="timeTrackingSpent"
								name="timeTrackingSpent"
							/>

							<CustomInputField
								type="number"
								label="Time remaining (hours)"
								id="timeTrackingRemaining"
								name="timeTrackingRemaining"
							/>
						</div>

						<div
							className="create-task-form__row"
							style={{ position: 'relative', zIndex: 0 }}
						>
							<CustomEditorField label="Description" name="description" />
						</div>

						<div className="create-task-form__row">
							<div className="form-group text-right">
								<button className="submit-btn" type="submit">
									Add task
								</button>
							</div>
						</div>
					</Form>
				)
			}}
		</Formik>
	)
}
