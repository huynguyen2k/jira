import React, { useEffect, useRef, useState } from 'react'
import './style.scss'

export default function AutoComplete(props) {
	const { options, onAddUser } = props

	const [display, setDisplay] = useState(false)
	const [search, setSearch] = useState('')
	const [selectedOption, setSelectedOption] = useState(null)

	const wrapperRef = useRef(null)

	useEffect(() => {
		document.addEventListener('click', handleClickOutSide)

		return () => {
			document.removeEventListener('click', handleClickOutSide)
		}
	}, [])

	function getOptionsStyles() {
		const optionsStyles = {}

		if (display) {
			optionsStyles.height = '200px'
		} else {
			optionsStyles.height = '0'
		}

		return optionsStyles
	}

	// HANDLE FUNCTIONS
	function handleClickOutSide(e) {
		const wrap = wrapperRef.current

		if (wrap && !wrap.contains(e.target)) {
			setDisplay(false)
		}
	}

	function handleSelectOption(option) {
		setDisplay(false)
		setSearch(option.name)
		setSelectedOption(option)
	}

	function handleAddUser() {
		if (!selectedOption || !search) return

		if (onAddUser) {
			onAddUser(selectedOption.userId)
			setSearch('')
		}
	}

	// RENDER FUNCTIONS
	function renderOptions() {
		return options
			.filter(option =>
				option.name.toLowerCase().includes(search.toLowerCase())
			)
			.map(option => {
				return (
					<div
						onClick={() => handleSelectOption(option)}
						key={option.userId}
						className="auto-complete__option-item"
					>
						<img
							className="avatar"
							src={`https://picsum.photos/id/${option.userId}/300/300`}
							onError={e =>
								(e.target.src = `https://picsum.photos/id/213/300/300`)
							}
							alt="Avatar"
						/>
						<span className="name">{option.name}</span>
					</div>
				)
			})
	}

	return (
		<div className="auto-complete" ref={wrapperRef}>
			<div className="auto-complete__search">
				<input
					className="search-input"
					type="text"
					value={search}
					placeholder="Enter member's name"
					onChange={e => setSearch(e.target.value)}
					onClick={() => setDisplay(true)}
				/>
				<button className="add-btn" onClick={handleAddUser}>
					<svg
						aria-hidden="true"
						focusable="false"
						data-prefix="fas"
						data-icon="user-plus"
						className="svg-inline--fa fa-user-plus fa-w-20"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 640 512"
					>
						<path
							fill="currentColor"
							d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
						></path>
					</svg>
				</button>
			</div>
			<div className="auto-complete__options" style={getOptionsStyles()}>
				{renderOptions()}
			</div>
		</div>
	)
}
