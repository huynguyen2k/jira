import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import './style.scss'

export default function TaskBoxContainer(props) {
	const { onClickTask, onDragEnd } = props
	const [tasks, setTasks] = useState(null)

	useEffect(() => {
		setTasks(props.tasks)
	}, [props.tasks])

	function handleClickTask(taskId) {
		if (onClickTask) {
			onClickTask(taskId)
		}
	}

	function renderAssigneeList(assignees) {
		return assignees?.map(assignee => {
			return (
				<img
					key={assignee.id}
					src={`https://picsum.photos/id/${assignee.id}/100/100`}
					onError={e => (e.target.src = `https://picsum.photos/id/123/100/100`)}
					alt={assignee.name}
				/>
			)
		})
	}

	function handleDragEnd(result) {
		if (!result.destination) return

		if (onDragEnd) {
			onDragEnd(result)
		}
		const { source, destination } = result

		const dragItem = tasks.find(task => task.statusId === source.droppableId)
		const dropItem = tasks.find(
			task => task.statusId === destination.droppableId
		)

		console.log(result)
		console.log(dropItem)

		const tempItem = dragItem.lstTaskDeTail[source.index]
		dragItem.lstTaskDeTail.splice(source.index, 1)

		dropItem.lstTaskDeTail.splice(destination.index, 0, tempItem)

		setTasks(tasks)
	}

	function renderTaskList(tasks) {
		return tasks?.map((task, index) => {
			return (
				<Draggable
					key={task.taskId}
					index={index}
					draggableId={task.taskId.toString()}
				>
					{provided => {
						return (
							<div
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								onClick={() => handleClickTask(task.taskId)}
								key={task.taskId}
								className="task-list__task-item"
							>
								<h3 className="task-list__task-title">{task.taskName}</h3>
								<div className="task-list__task-info">
									<div className="task-list__symbol-list">
										<i className="icon bookmark">
											<svg
												aria-hidden="true"
												focusable="false"
												data-prefix="fas"
												data-icon="bookmark"
												className="svg-inline--fa fa-bookmark fa-w-12"
												role="img"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 384 512"
											>
												<path
													fill="currentColor"
													d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"
												></path>
											</svg>
										</i>
										<i
											className={`icon priority-${task.priorityTask.priorityId} arrow-up`}
										>
											<svg
												aria-hidden="true"
												focusable="false"
												data-prefix="fas"
												data-icon="arrow-up"
												className="svg-inline--fa fa-arrow-up fa-w-14"
												role="img"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 448 512"
											>
												<path
													fill="currentColor"
													d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
												></path>
											</svg>
										</i>
									</div>
									<div className="task-list__member-list">
										{renderAssigneeList(task.assigness)}
									</div>
								</div>
							</div>
						)
					}}
				</Draggable>
			)
		})
	}

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div className="task-box-container">
				{tasks?.map(task => {
					return (
						<Droppable droppableId={task.statusId} key={task.statusId}>
							{provided => {
								return (
									<div className="task-box-container__item">
										<h2 className="box-label">{task.statusName}</h2>
										<div
											className="task-list"
											ref={provided.innerRef}
											{...provided.droppableProps}
										>
											{renderTaskList(task.lstTaskDeTail)}

											{provided.placeholder}
										</div>
									</div>
								)
							}}
						</Droppable>
					)
				})}
			</div>
		</DragDropContext>
	)
}
