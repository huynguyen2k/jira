import React, { useEffect } from 'react'
import './style.scss'
import { Form, Field, ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'
import { Editor } from '@tinymce/tinymce-react'
import { getAllProjectCategoryAction } from 'redux/actions/projectAction'
import { useDispatch, useSelector } from 'react-redux'

export default function EditProjectForm(props) {
	const { projectEdit, onSubmitEditProjectForm } = props

	const dispatch = useDispatch()
	const projectCategoryList = useSelector(
		state => state.projectReducer.projectCategoryList
	)

	useEffect(() => {
		if (projectCategoryList.length) return

		dispatch(getAllProjectCategoryAction())
	}, [dispatch, projectCategoryList])

	const initialValues = {
		projectName: projectEdit.projectName || '',
		categoryId: projectEdit.categoryId || '',
		description: projectEdit.description || '',
	}

	// RENDER FUNCTIONS
	function renderProjectCategoryList() {
		if (!Array.isArray(projectCategoryList)) return

		return projectCategoryList.map(category => {
			return (
				<option key={category.id} value={category.id}>
					{category.projectCategoryName}
				</option>
			)
		})
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object({
				projectName: Yup.string().required('Project name is required!'),
				categoryId: Yup.string().required('Project category is required!'),
				description: Yup.string().required('Description is required!'),
			})}
			onSubmit={values => {
				onSubmitEditProjectForm({
					...projectEdit,
					...values,
				})
			}}
		>
			{formik => {
				// HANDLE FUNCTIONS
				function handleEditorChange(value) {
					formik.setFieldValue('description', value, true)
				}

				function handleEditorBlur() {
					formik.setFieldTouched('description', true, true)
				}

				return (
					<Form className="edit-project-form">
						<h2 className="edit-project-form__header">Edit Project</h2>
						<div className="edit-project-form__group">
							<label htmlFor="projectName" className="edit-project-form__label">
								Project Name
							</label>
							<Field
								className="edit-project-form__input"
								type="text"
								name="projectName"
								id="projectName"
							/>
							<p className="edit-project-form__error-message">
								<ErrorMessage name="projectName" />
							</p>
						</div>
						<div className="edit-project-form__group">
							<label className="edit-project-form__label">
								Project Category
							</label>
							<Field
								className="edit-project-form__input"
								as="select"
								name="categoryId"
							>
								{renderProjectCategoryList()}
							</Field>
							<p className="edit-project-form__error-message">
								<ErrorMessage name="categoryId" />
							</p>
						</div>
						<div className="edit-project-form__group">
							<label className="edit-project-form__label">Description</label>
							<Editor
								apiKey="rr4jpi2t3raw888x8270475h8c5x3oj8oss1c9z9okdhojcu"
								initialValue={projectEdit.description}
								onEditorChange={handleEditorChange}
								onBlur={handleEditorBlur}
								init={{
									height: 200,
									menubar: true,
									plugins: [
										'emoticons advlist autolink lists link image charmap print preview anchor',
										'searchreplace visualblocks code fullscreen',
										'insertdatetime media table paste code help wordcount',
									],
									toolbar:
										'undo redo | formatselect | ' +
										'bold italic backcolor | alignleft aligncenter ' +
										'alignright alignjustify | bullist numlist outdent indent | ' +
										'removeformat | help',
									content_style:
										'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
								}}
							/>
							<p className="edit-project-form__error-message">
								<ErrorMessage name="description" />
							</p>
						</div>
						<div className="edit-project-form__group text-right">
							<button type="submit" className="submit-btn">
								Save
							</button>
						</div>
					</Form>
				)
			}}
		</Formik>
	)
}
