import React, { useEffect, useRef, useState } from 'react'
import './style.scss'

export default function UserList(props) {
	const { userList, onDeleteUser, onFilterUser, onEditUser, limit } = props

	const [search, setSearch] = useState('')
	const [pagination, setPagination] = useState({
		limit,
		totalItem: userList.length,
		currentPage: 1,
		totalPages: Math.ceil(userList.length / limit),
	})

	const timeoutRef = useRef(null)

	useEffect(() => {
		setPagination({
			limit,
			totalItem: userList.length,
			currentPage: 1,
			totalPages: Math.ceil(userList.length / limit),
		})
	}, [userList, limit])

	function handleDeleteUser(userId) {
		if (onDeleteUser) {
			onDeleteUser(userId)
		}
	}

	function renderPagination() {
		const result = []

		for (let i = 1; i <= pagination.totalPages; i++) {
			if (i === pagination.currentPage) {
				result.push(
					<li key={i}>
						<button className="btn btn--active">{i}</button>
					</li>
				)
			} else {
				result.push(
					<li key={i}>
						<button
							className="btn"
							onClick={() => setPagination({ ...pagination, currentPage: i })}
						>
							{i}
						</button>
					</li>
				)
			}
		}

		return (
			<ul className="pagination">
				<li>
					<button
						className={`btn${
							pagination.currentPage === 1 ? ' btn--disable' : ''
						}`}
						onClick={() =>
							setPagination({
								...pagination,
								currentPage: pagination.currentPage - 1,
							})
						}
					>
						&lt;
					</button>
				</li>
				{result}
				<li>
					<button
						className={`btn${
							pagination.currentPage === pagination.totalPages
								? ' btn--disable'
								: ''
						}`}
						onClick={() =>
							setPagination({
								...pagination,
								currentPage: pagination.currentPage + 1,
							})
						}
					>
						&gt;
					</button>
				</li>
			</ul>
		)
	}

	function handleSearchChange(e) {
		setSearch(e.target.value)

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}

		timeoutRef.current = setTimeout(() => {
			if (onFilterUser) {
				onFilterUser(e.target.value)
			}
		}, 300)
	}

	function handleEditUser(userEdit) {
		if (onEditUser) {
			onEditUser(userEdit)
		}
	}

	function renderUserList() {
		if (!Array.isArray(userList)) return

		let start = (pagination.currentPage - 1) * pagination.limit
		let end = start + pagination.limit

		return userList
			.filter((user, index) => {
				return index >= start && index < end
			})
			.map((user, index) => {
				return (
					<div className="user-list__row" key={user.userId}>
						<div className="user-list__column">
							<p>{index + 1}</p>
						</div>
						<div className="user-list__column">
							<img
								src={`https://picsum.photos/id/${user.userId}/100/100`}
								alt="Avatar"
								className="avatar"
								onError={e =>
									(e.target.src = `https://picsum.photos/id/800/100/100`)
								}
							/>
						</div>
						<div className="user-list__column">
							<span>{user.name}</span>
						</div>
						<div className="user-list__column">
							<p>{user.email}</p>
						</div>
						<div className="user-list__column">
							<p>{user.phoneNumber}</p>
						</div>
						<div className="user-list__column">
							<button
								onClick={() => handleEditUser(user)}
								className="user-list__btn user-list__btn--primary"
							>
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="edit"
									className="svg-inline--fa fa-edit fa-w-18"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 576 512"
								>
									<path
										fill="currentColor"
										d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
									></path>
								</svg>
							</button>
							<button
								onClick={() => handleDeleteUser(user.userId)}
								className="user-list__btn user-list__btn--danger"
							>
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="trash"
									className="svg-inline--fa fa-trash fa-w-14"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
								>
									<path
										fill="currentColor"
										d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
									></path>
								</svg>
							</button>
						</div>
					</div>
				)
			})
	}

	return (
		<div className="user-list-contain">
			<div className="container-fluid">
				<h1 className="user-list-contain__title">User Management</h1>
				<div className="user-list-contain__search-box">
					<input
						className="search-input"
						type="text"
						placeholder="Enter user's name"
						value={search}
						onChange={handleSearchChange}
					/>
					<i className="search-icon">
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fas"
							data-icon="search"
							className="svg-inline--fa fa-search fa-w-16"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<path
								fill="currentColor"
								d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
							></path>
						</svg>
					</i>
				</div>
				<div className="user-list">
					<div className="user-list__row">
						<div className="user-list__column header">
							<h3>#</h3>
						</div>
						<div className="user-list__column header">
							<h3>Avatar</h3>
						</div>
						<div className="user-list__column header">
							<h3>Name</h3>
						</div>
						<div className="user-list__column header">
							<h3>Email</h3>
						</div>
						<div className="user-list__column header">
							<h3>Phone number</h3>
						</div>
						<div className="user-list__column header">
							<h3>Action</h3>
						</div>
					</div>
					{renderUserList()}
				</div>
				{renderPagination()}
			</div>
		</div>
	)
}
