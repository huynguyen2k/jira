import { Editor } from '@tinymce/tinymce-react'
import { ErrorMessage, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import './style.scss'

export default function CommentForm({ onSaveComment }) {
	return (
		<Formik
			initialValues={{
				contentComment: '',
			}}
			validationSchema={Yup.object({
				contentComment: Yup.string().required('Comment is required!'),
			})}
			onSubmit={(values, helper) => {
				if (onSaveComment) {
					onSaveComment(values)
				}
				helper.resetForm()
			}}
		>
			{formik => {
				function handleEditorChange(value) {
					formik.setFieldValue('contentComment', value, true)
				}

				function handleEditorBlur() {
					formik.setFieldTouched('contentComment', true, true)
				}

				function handleResetForm() {
					formik.resetForm()
				}

				return (
					<Form className="comment-form">
						<div className="comment-form__row">
							<Editor
								apiKey="rr4jpi2t3raw888x8270475h8c5x3oj8oss1c9z9okdhojcu"
								initialValue=""
								onEditorChange={handleEditorChange}
								onBlur={handleEditorBlur}
								value={formik.values.contentComment}
								init={{
									height: 250,
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
							<p className="error-message">
								<ErrorMessage name="contentComment" />
							</p>
						</div>
						<div className="comment-form__row">
							<button type="submit" className="btn btn--primary">
								Save
							</button>
							<button type="button" className="btn" onClick={handleResetForm}>
								Cancel
							</button>
						</div>
					</Form>
				)
			}}
		</Formik>
	)
}
