import React from 'react'
import { Fragment } from 'react'
import './style.scss'

export default function Breadcrumb(props) {
	const { list } = props

	function renderBreadcrumbItems() {
		if (!Array.isArray(list) || !list.length) return

		return list.map((item, index) => {
			if (index === list.length - 1) {
				return (
					<Fragment key={index}>
						<span className="breadcrumbs__title">{item}</span>
					</Fragment>
				)
			}

			return (
				<Fragment key={index}>
					<span className="breadcrumb__title">{item}</span>
					<span className="breadcrumb__slash">/</span>
				</Fragment>
			)
		})
	}

	return <div className="breadcrumb">{renderBreadcrumbItems()}</div>
}
