import Loading from 'components/Loading'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	getProjectDetailAction,
	getTaskDetailAction,
	updateTaskStatusAction,
} from 'redux/actions/projectAction'
import { sleep } from 'util/utilFunctions'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import ProjectMembers from 'components/ProjectMembers'
import TaskBoxContainer from 'components/TaskBoxContainer'
import './style.scss'
import Modal from 'components/Modal'
import TaskDetail from 'containers/TaskDetail'

export default function ProjectBoard(props) {
	const projectId = props.match.params.projectId

	const dispatch = useDispatch()
	const projectDetail = useSelector(state => state.projectReducer.projectDetail)

	const [isLoading, setIsLoading] = useState(false)
	const [showTaskDetailModal, setShowTaskDetailModal] = useState(false)

	useEffect(() => {
		;(async function () {
			setIsLoading(true)
			await sleep(2000)

			dispatch(getProjectDetailAction(projectId))

			setIsLoading(false)
		})()
	}, [dispatch, projectId])

	function handleClickTask(taskId) {
		dispatch(getTaskDetailAction(taskId))
		setShowTaskDetailModal(true)
	}

	function handleDragEnd(result) {
		if (!result.destination) return

		const { destination } = result

		const taskUpdate = {
			taskId: Number(result.draggableId),
			statusId: destination.droppableId,
		}

		dispatch(updateTaskStatusAction(taskUpdate))
	}

	return (
		<>
			{isLoading && <Loading />}

			<div className="project-board">
				<Breadcrumb
					list={['Project', 'Project board', projectDetail.projectName]}
				/>

				<h1 className="project-board__name">{projectDetail.projectName}</h1>
				<div
					className="project-board__description"
					dangerouslySetInnerHTML={{ __html: projectDetail.description }}
				></div>
				<div className="project-board__filter">
					<div className="project-board__search">
						<i className="project-board__search-icon">
							<svg
								version="1.1"
								id="Capa_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
								x="0px"
								y="0px"
								viewBox="0 0 512.005 512.005"
								style={{ enableBackground: 'new 0 0 512.005 512.005' }}
								xmlSpace="preserve"
							>
								<g>
									<g>
										<path
											d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
			S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
			c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
			 M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"
										/>
									</g>
								</g>
							</svg>
						</i>
						<input className="project-board__search-input" type="text" />
					</div>
					<ProjectMembers members={projectDetail.members} />
					<div className="project-board__filter-option">
						<span className="option-item">Only My Issues</span>
						<span className="option-item">Recently Updated</span>
					</div>
				</div>

				<TaskBoxContainer
					tasks={projectDetail.lstTask}
					onClickTask={handleClickTask}
					onDragEnd={handleDragEnd}
				/>
			</div>

			<Modal
				isShowModal={showTaskDetailModal}
				onCloseModal={() => setShowTaskDetailModal(false)}
			>
				<TaskDetail />
			</Modal>
		</>
	)
}
