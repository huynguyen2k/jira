import { ErrorMessage, useField } from 'formik'
import React from 'react'
import Select, { components } from 'react-select'

const CustomAssigneeOption = ({ innerProps, isDisabled, value, label }) => {
	return !isDisabled ? (
		<div {...innerProps}>
			<div className="assignee-option">
				<img
					className="avatar"
					src={`https://picsum.photos/id/${value}/100/100`}
					onError={e => (e.target.src = `https://picsum.photos/id/123/100/100`)}
					alt="Avatar"
				/>
				<h3 className="name">{label}</h3>
			</div>
		</div>
	) : null
}

const CustomAssigneeMultiValuesLabel = props => {
	return (
		<components.MultiValueLabel {...props}>
			<div className="assignees-select-values">
				<img
					src={`https://picsum.photos/id/${props.data.value}/100/100`}
					onError={e => (e.target.src = `https://picsum.photos/id/123/100/100`)}
					alt="Avatar"
					className="avatar"
				/>
				<span className="name">{props.data.label}</span>
			</div>
		</components.MultiValueLabel>
	)
}

export default function CustomAssigneesSelect(props) {
	const { label, options, ...rest } = props
	const [field, , helper] = useField(rest.name)

	const selectedOptions = options.filter(option =>
		field.value.includes(option.value)
	)

	function handleChange(options) {
		const event = {
			target: {
				name: field.name,
				value: options.map(option => option.value),
			},
		}

		field.onChange(event)
	}

	function handleBlur() {
		helper.setTouched(true)
	}

	return (
		<div className="form-group">
			<label className="label">{label}</label>
			<Select
				closeMenuOnSelect={false}
				isMulti
				components={{
					Option: CustomAssigneeOption,
					MultiValueLabel: CustomAssigneeMultiValuesLabel,
				}}
				{...field}
				{...props}
				onBlur={handleBlur}
				onChange={handleChange}
				value={selectedOptions}
			/>
			<p className="error-message">
				<ErrorMessage name={field.name} />
			</p>
		</div>
	)
}
