import { ErrorMessage, Field, useField } from 'formik'
import React from 'react'

export default function CustomInputField({ label, ...props }) {
	const [field] = useField(props.name)

	return (
		<div className="form-group">
			<label className="label" htmlFor={props.id || props.name}>
				{label}
			</label>
			<Field className="input" {...field} {...props} />
			<p className="error-message">
				<ErrorMessage name={field.name} />
			</p>
		</div>
	)
}
