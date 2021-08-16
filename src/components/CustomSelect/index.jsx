import React from 'react'
import Select, { components } from 'react-select'

function CustomOption({ children, ...props }) {
	const data = props.data

	return (
		<components.Option {...props}>
			<img
				src={`https://picsum.photos/id/${data.value}/100/100`}
				onError={e => (e.target.src = 'https://picsum.photos/id/123/100/100')}
				alt="Avatar"
				className="avatar"
			/>
			<span className="name">{data.label}</span>
		</components.Option>
	)
}

function CustomMultiValueLabel(props) {
	const data = props.data

	return (
		<components.MultiValueLabel {...props}>
			<img
				src={`https://picsum.photos/id/${data.value}/100/100`}
				onError={e => (e.target.src = 'https://picsum.photos/id/123/100/100')}
				alt="Avatar"
				className="avatar"
			/>
			<span className="name">{data.label}</span>
		</components.MultiValueLabel>
	)
}

export default function CustomSelect(props) {
	const {
		options,
		value,
		isMulti,
		closeMenuOnSelect,
		name,
		onReactSelectChange,
	} = props

	return (
		<Select
			name={name}
			options={options}
			closeMenuOnSelect={closeMenuOnSelect}
			isMulti={isMulti}
			components={{
				Option: CustomOption,
				MultiValueLabel: CustomMultiValueLabel,
			}}
			value={value}
			onChange={onReactSelectChange}
		/>
	)
}
