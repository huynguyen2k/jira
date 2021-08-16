import { Editor } from '@tinymce/tinymce-react'
import { ErrorMessage, useField } from 'formik'
import React, { useRef } from 'react'

export default function CustomEditorField({ label, ...props }) {
	const [field, , helper] = useField(props.name)
	const editorRef = useRef(null)

	function handleEditorChange(value) {
		helper.setValue(value)
	}

	function handleEditorBlur() {
		helper.setTouched(true)
	}

	return (
		<div className="form-group">
			<label className="label">{label}</label>
			<Editor
				apiKey="rr4jpi2t3raw888x8270475h8c5x3oj8oss1c9z9okdhojcu"
				onInit={(evt, editor) => (editorRef.current = editor)}
				onEditorChange={handleEditorChange}
				onBlur={handleEditorBlur}
				value={field.value}
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
			<p className="error-message">
				<ErrorMessage name={field.name} />
			</p>
		</div>
	)
}
