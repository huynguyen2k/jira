import { ErrorMessage, useField } from 'formik'
import React from 'react'
import Select from 'react-select'

export default function CustomReactSelectField(props) {
	const { label, onOptionChange, ...rest } = props
	const [field, , helper] = useField(rest.name)

	const selectedOption =
		rest.options.find(option => option.value === field.value) || null

	function handleChange(option) {
		if (onOptionChange) {
			onOptionChange(option)
		}

		const event = {
			target: {
				name: field.name,
				value: option.value,
			},
		}

		field.onChange(event)
	}

	function handleBlur(e) {
		helper.setTouched(true)
	}

	return (
		<div className="form-group">
			<label className="label">{label}</label>
			<Select
				{...field}
				{...props}
				onBlur={handleBlur}
				onChange={handleChange}
				value={selectedOption}
			/>
			<p className="error-message">
				<ErrorMessage name={field.name} />
			</p>
		</div>
	)
}
