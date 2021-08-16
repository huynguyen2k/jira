import React, { useEffect, useState } from "react"
import "./style.scss"

export default function ToastMessage(props) {
	const { message, type, title, timeout } = props
	const [isTimeUp, setIsTimeUp] = useState(false)

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setIsTimeUp(true)
		}, timeout)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [timeout])

	function handleCloseToastMessage() {
		setIsTimeUp(true)
	}

	if (isTimeUp) return null

	return (
		<div className={`toast-message toast-message--${type}`}>
			<div className="toast-message__icon">
				{type === "success" ? (
					<svg
						aria-hidden="true"
						focusable="false"
						data-prefix="fas"
						data-icon="check-circle"
						className="svg-inline--fa fa-check-circle fa-w-16"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
					>
						<path
							fill="currentColor"
							d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
						></path>
					</svg>
				) : (
					<svg
						aria-hidden="true"
						focusable="false"
						data-prefix="fas"
						data-icon="exclamation-circle"
						className="svg-inline--fa fa-exclamation-circle fa-w-16"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
					>
						<path
							fill="currentColor"
							d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
						></path>
					</svg>
				)}
			</div>
			<div className="toast-message__info">
				<h1 className="toast-message__title">{title}</h1>
				<p className="toast-message__message">{message}</p>
			</div>
			<button
				className="toast-message__close-btn"
				onClick={handleCloseToastMessage}
			>
				<svg
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					data-icon="times"
					className="svg-inline--fa fa-times fa-w-11"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 352 512"
				>
					<path
						fill="currentColor"
						d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
					></path>
				</svg>
			</button>
		</div>
	)
}
