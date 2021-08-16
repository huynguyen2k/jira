import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './style.scss'

export default function ProjectList(props) {
	const { projectList, onEditProject, onDeleteProject, onViewMembers } = props

	const [projects, setProjects] = useState(projectList)
	const [searchValue, setSearchValue] = useState('')

	useEffect(() => {
		setProjects(projectList)
	}, [projectList])

	// HANDLE FUNCTIONS
	function handleSearchValueChange(e) {
		const { value } = e.target

		const filterProjects = projectList.filter(project =>
			project.projectName.toLowerCase().includes(value.toLowerCase())
		)

		setSearchValue(value)
		setProjects(filterProjects)
	}

	function handleEditProject(project) {
		if (onEditProject) {
			const projectEdit = {
				id: project.id,
				categoryId: project.categoryId,
				projectName: project.projectName,
				description: project.description,
			}

			onEditProject(projectEdit)
		}
	}

	function handleDeleteProject(projectId) {
		if (onDeleteProject) {
			onDeleteProject(projectId)
		}
	}

	function handleViewMembers(project) {
		if (onViewMembers) {
			onViewMembers(project)
		}
	}

	// RENDER FUNCTIONS
	function renderProjectList() {
		if (!Array.isArray(projects)) return

		return projects.map((project, index) => {
			return (
				<div className="project-list__row" key={project.id}>
					<div className="project-list__column">
						<p>{index + 1}</p>
					</div>
					<div className="project-list__column">
						<NavLink
							to={`project-board/${project.id}`}
							className="project-name"
						>
							{project.projectName}
						</NavLink>
					</div>
					<div className="project-list__column">
						<p>{project.categoryName}</p>
					</div>
					<div className="project-list__column">
						<button
							onClick={() => handleViewMembers(project)}
							className="project-list__view-btn"
						>
							View
						</button>
					</div>
					<div className="project-list__column">
						<p className="label label--success">{project.creator.name}</p>
					</div>
					<div className="project-list__column">
						<button
							onClick={() => handleEditProject(project)}
							className="project-list__btn project-list__btn--primary"
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
							onClick={() => handleDeleteProject(project.id)}
							className="project-list__btn project-list__btn--danger"
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
		<div className="project-list-contain">
			<div className="container-fluid">
				<h1 className="project-list-contain__title">Project Management</h1>
				<div className="project-list-contain__search-box">
					<input
						className="search-input"
						type="text"
						placeholder="Enter project name"
						value={searchValue}
						onChange={handleSearchValueChange}
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
				<div className="project-list">
					<div className="project-list__row">
						<div className="project-list__column header">
							<h3>#</h3>
						</div>
						<div className="project-list__column header">
							<h3>Project name</h3>
						</div>
						<div className="project-list__column header">
							<h3>Project category</h3>
						</div>
						<div className="project-list__column header">
							<h3>Members</h3>
						</div>
						<div className="project-list__column header">
							<h3>Creator</h3>
						</div>
						<div className="project-list__column header">
							<h3>Action</h3>
						</div>
					</div>
					{renderProjectList()}
				</div>
			</div>
		</div>
	)
}
