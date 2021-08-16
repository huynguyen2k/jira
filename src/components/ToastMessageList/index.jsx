import ToastMessage from "components/ToastMessage"
import React from "react"
import "./style.scss"

export default function ToastMessageList(props) {
	const { toastMessageList } = props

	function renderToastMessageList() {
		if (!Array.isArray(toastMessageList) || toastMessageList.length === 0)
			return

		return toastMessageList.map((toastMessage, index) => {
			return <ToastMessage key={index} {...toastMessage} />
		})
	}

	return <div className="toast-message-list">{renderToastMessageList()}</div>
}
