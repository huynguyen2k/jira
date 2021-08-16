import React from 'react'
import './style.scss'

export default function ProjectMembers(props) {
	const { members } = props

	function renderMemberAvatars() {
		if (!Array.isArray(members) || !members.length) return

		return members.map(member => {
			return (
				<img
					key={member.userId}
					src={`https://picsum.photos/id/${member.userId}/100/100`}
					onError={e => (e.target.src = `https://picsum.photos/id/127/100/100`)}
					alt={member.name}
				/>
			)
		})
	}

	return <div className="project-members">{renderMemberAvatars()}</div>
}
