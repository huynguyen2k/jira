import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { ErrorMessage, Field, Formik } from 'formik'
import * as Yup from 'yup'
import './style.scss'

export default function CreateProjectForm(props) {
	const { projectCategoryList, onCreateProject } = props

	const editorRef = useRef(null)

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
			initialValues={{
				projectName: '',
				description: '',
				categoryId: '',
			}}
			validationSchema={Yup.object({
				projectName: Yup.string().required('Project name is required!'),
				description: Yup.string().required('Description is required!'),
				categoryId: Yup.string().required(
					'You must select a project category!'
				),
			})}
			onSubmit={async (values, action) => {
				if (onCreateProject) {
					onCreateProject(values)

					editorRef.current.setContent('')
					action.setValues(
						{
							projectName: '',
							description: '',
							categoryId: '',
						},
						false
					)
					action.setErrors({})
					action.setTouched({}, false)
					action.setSubmitting(false)
				}
			}}
		>
			{formik => {
				// HANDLE FUNCTIONS
				function handleEditorChange(value) {
					formik.setFieldValue('description', value, true)
				}

				function handleEditorBlur(e) {
					formik.setFieldTouched('description', true, true)
				}

				return (
					<form className="create-project-form" onSubmit={formik.handleSubmit}>
						<div className="create-project-form__group">
							<label
								htmlFor="projectName"
								className="create-project-form__label"
							>
								Project name
							</label>
							<Field
								type="text"
								className="create-project-form__input"
								placeholder="Project name"
								id="projectName"
								name="projectName"
							/>
							<p className="create-project-form__error-message">
								<ErrorMessage name="projectName" />
							</p>
						</div>
						<div className="create-project-form__group">
							<label
								htmlFor="description"
								className="create-project-form__label"
							>
								Description
							</label>
							<Editor
								apiKey="rr4jpi2t3raw888x8270475h8c5x3oj8oss1c9z9okdhojcu"
								onInit={(evt, editor) => (editorRef.current = editor)}
								initialValue=""
								onEditorChange={handleEditorChange}
								onBlur={handleEditorBlur}
								init={{
									height: 300,
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
										'removeformat | help | code',
									content_style:
										'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
								}}
							/>
							<p className="create-project-form__error-message">
								<ErrorMessage name="description" />
							</p>
						</div>
						<div className="create-project-form__group">
							<label className="create-project-form__label">
								Project category
							</label>
							<Field
								className="create-project-form__select"
								name="categoryId"
								as="select"
							>
								<option value="">Select a category</option>
								{renderProjectCategoryList()}
							</Field>
							<p className="create-project-form__error-message">
								<ErrorMessage name="categoryId" />
							</p>
						</div>
						<div className="create-project-form__group">
							<button type="submit" className="submit-btn">
								Create project
							</button>
						</div>
					</form>
				)
			}}
		</Formik>
	)
}
