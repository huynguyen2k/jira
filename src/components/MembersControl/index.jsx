import React from 'react'
import AutoComplete from 'components/AutoComplete'
import './style.scss'

export default function MembersControl(props) {
	const {
		project: { members, id },
		onDeleteMember,
		onAssignUser,
		userList,
	} = props

	function getUsersFilter() {
		return userList.filter(user => {
			const index = members.findIndex(member => member.userId === user.userId)
			return index === -1
		})
	}

	function handleDeleteMember(userId) {
		if (onDeleteMember) {
			onDeleteMember(id, userId)
		}
	}

	function handleAddUserIntoProject(userId) {
		if (onAssignUser) {
			onAssignUser({
				userId,
				projectId: id,
			})
		}
	}

	function renderMemberList() {
		if (!Array.isArray(members) || members.length === 0) return

		return members.map((member, index) => {
			return (
				<div className="members-control__row" key={member.userId}>
					<div className="members-control__column">
						<div className="members-control__column-content">
							<span className="count">{index + 1}</span>
						</div>
					</div>
					<div className="members-control__column">
						<div className="members-control__column-content">
							<img
								className="avatar"
								src={`https://picsum.photos/id/${member.userId}/500/500`}
								onError={e =>
									(e.target.src = `${process.env.PUBLIC_URL}/assets/images/background.jpg`)
								}
								alt="Avatar"
							/>
						</div>
					</div>
					<div className="members-control__column">
						<div className="members-control__column-content">
							<span className="name">{member.name}</span>
						</div>
					</div>
					<div className="members-control__column">
						<div className="members-control__column-content">
							<button
								onClick={() => handleDeleteMember(member.userId)}
								className="delete-btn"
							>
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="user-times"
									className="svg-inline--fa fa-user-times fa-w-20"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 640 512"
								>
									<path
										fill="currentColor"
										d="M589.6 240l45.6-45.6c6.3-6.3 6.3-16.5 0-22.8l-22.8-22.8c-6.3-6.3-16.5-6.3-22.8 0L544 194.4l-45.6-45.6c-6.3-6.3-16.5-6.3-22.8 0l-22.8 22.8c-6.3 6.3-6.3 16.5 0 22.8l45.6 45.6-45.6 45.6c-6.3 6.3-6.3 16.5 0 22.8l22.8 22.8c6.3 6.3 16.5 6.3 22.8 0l45.6-45.6 45.6 45.6c6.3 6.3 16.5 6.3 22.8 0l22.8-22.8c6.3-6.3 6.3-16.5 0-22.8L589.6 240zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
									></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
			)
		})
	}

	return (
		<div className="members-control">
			<h2 className="members-control__header">Members</h2>
			<div className="members-control__insert-box">
				<AutoComplete
					options={getUsersFilter()}
					onAddUser={handleAddUserIntoProject}
				/>
			</div>
			<div className="members-control__list">
				<div className="members-control__row">
					<div className="members-control__column">
						<h3 className="members-control__column-title">#</h3>
					</div>
					<div className="members-control__column">
						<h3 className="members-control__column-title">Avatar</h3>
					</div>
					<div className="members-control__column">
						<h3 className="members-control__column-title">Name</h3>
					</div>
					<div className="members-control__column">
						<h3 className="members-control__column-title">Action</h3>
					</div>
				</div>
				{renderMemberList()}
			</div>
		</div>
	)
}
