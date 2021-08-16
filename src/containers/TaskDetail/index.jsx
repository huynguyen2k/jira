import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import './style.scss'
import {
	deleteCommentAction,
	getAllCommentsAction,
	getAllPriorityAction,
	getAllStatusAction,
	insertCommentAction,
	updateCommentAction,
	updateTaskDetailAction,
} from 'redux/actions/projectAction'
import CustomSelect from 'components/CustomSelect'
import TimeTracking from 'components/TimeTracking'

import { Editor } from '@tinymce/tinymce-react'
import Modal from 'components/Modal'
import TimeTrackingForm from 'components/TimeTrackingForm'
import CommentForm from 'components/CommentForm'

function getStatusOptions(statusList) {
	if (!Array.isArray(statusList)) return []

	return statusList.map(status => ({
		value: status.statusId,
		label: status.statusName,
	}))
}

function getAssigneeOptions(assigneeList) {
	if (!Array.isArray(assigneeList)) return []

	return assigneeList.map(assignee => ({
		value: assignee.userId,
		label: assignee.name,
	}))
}

function getPriorityOptions(priorityList) {
	if (!Array.isArray(priorityList)) return []

	return priorityList.map(priority => ({
		value: priority.priorityId,
		label: priority.priority,
	}))
}

export default function TaskDetail() {
	const dispatch = useDispatch()

	const textareaRef = useRef(null)
	const timeoutRef = useRef(null)

	const [commentEdit, setCommentEdit] = useState({
		showEditForm: false,
		content: '',
		id: null,
	})

	const [showTimeTrackingModal, setShowTimeTrackingModal] = useState(false)

	const [taskName, setTaskName] = useState('')
	const [description, setDescription] = useState('')
	const [showDescription, setShowDescription] = useState(false)
	const beforeDescriptionRef = useRef(null)

	const projectDetail = useSelector(state => state.projectReducer.projectDetail)
	const taskDetail = useSelector(state => state.projectReducer.taskDetail)

	const commentList = useSelector(state => state.projectReducer.commentList)

	const statusList = useSelector(state => state.projectReducer.statusList)
	const statusOptions = getStatusOptions(statusList)
	const selectedStatus =
		statusOptions.find(status => status.value === taskDetail.statusId) || null

	const assigneeList = projectDetail.members
	const assigneeOptions = getAssigneeOptions(assigneeList)
	const selectedAssignees =
		taskDetail?.assigness?.map(assignee => ({
			value: assignee.id,
			label: assignee.name,
		})) || []

	const priorityList = useSelector(state => state.projectReducer.priorityList)
	const priorityOptions = getPriorityOptions(priorityList)
	const selectedPriority =
		priorityOptions.find(
			priority => priority.value === taskDetail.priorityId
		) || null

	useEffect(() => {
		dispatch(getAllStatusAction())
		dispatch(getAllPriorityAction())
	}, [dispatch])

	useEffect(() => {
		setTaskName(taskDetail.taskName)
	}, [taskDetail.taskName])

	useEffect(() => {
		setDescription(taskDetail.description)
		beforeDescriptionRef.current = taskDetail.description
	}, [taskDetail.description])

	useEffect(() => {
		if (taskDetail.taskId) {
			dispatch(getAllCommentsAction(taskDetail.taskId))
		}
	}, [dispatch, taskDetail.taskId])

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = '50px'
			textareaRef.current.style.height =
				textareaRef.current.scrollHeight + 4 + 'px'
		}
	})

	function handleReactSelectChange(option, meta) {
		if (Array.isArray(option)) {
			const optionValues = option.map(item => item.value)

			dispatch(
				updateTaskDetailAction({
					...taskDetail,
					[meta.name]: optionValues,
				})
			)
		} else {
			dispatch(
				updateTaskDetailAction({
					...taskDetail,
					[meta.name]: option.value,
				})
			)
		}
	}

	function handleSaveTimeTracking(timeTrackingSpent, timeTrackingRemaining) {
		dispatch(
			updateTaskDetailAction({
				...taskDetail,
				timeTrackingRemaining,
				timeTrackingSpent,
			})
		)
		setShowTimeTrackingModal(false)
	}

	function handleNumberInputChange(e) {
		const { name, value } = e.target

		if (Number(value) >= 0) {
			dispatch(
				updateTaskDetailAction({
					...taskDetail,
					[name]: Number(value),
				})
			)
		}
	}

	function handleTaskNameChange(e) {
		const { name, value } = e.target

		setTaskName(value)

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}

		timeoutRef.current = setTimeout(() => {
			dispatch(
				updateTaskDetailAction({
					...taskDetail,
					[name]: value,
				})
			)
		}, 300)
	}

	function handleEditorChange(value) {
		setDescription(value)
	}

	function handleSaveDescription() {
		beforeDescriptionRef.current = description

		dispatch(
			updateTaskDetailAction({
				...taskDetail,
				description,
			})
		)

		setShowDescription(false)
	}

	function handleCancelDescription() {
		setDescription(beforeDescriptionRef.current)
		setShowDescription(false)
	}

	function handleSaveComment(value) {
		dispatch(
			insertCommentAction({
				taskId: taskDetail.taskId,
				contentComment: value.contentComment,
			})
		)
	}

	function renderDescription() {
		if (showDescription) {
			return (
				<div className="content">
					<Editor
						apiKey="rr4jpi2t3raw888x8270475h8c5x3oj8oss1c9z9okdhojcu"
						// onInit={(evt, editor) => (editorRef.current = editor)}
						// onBlur={handleEditorBlur}
						onEditorChange={handleEditorChange}
						init={{
							height: 300,
							menubar: true,
							plugins: [
								'emoticons advlist autolink lists link image charmap print preview anchor',
								'searchreplace visualblocks code fullscreen',
								'insertdatetime media table paste code help wordcount',
							],
							toolbar:
								'undo redo | formatselect | ' +
								'bold italic backcolor | alignleft aligncenter ' +
								'alignright alignjustify | bullist numlist outdent indent | ' +
								'removeformat | help | code',
							content_style:
								'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
						}}
						value={description}
					/>
					<div className="btn-wrap">
						<button
							onClick={handleSaveDescription}
							className="btn btn--primary"
						>
							Save
						</button>
						<button onClick={handleCancelDescription} className="btn">
							Cancel
						</button>
					</div>
				</div>
			)
		}

		return (
			<div
				className="content"
				onClick={() => setShowDescription(true)}
				dangerouslySetInnerHTML={{ __html: taskDetail.description }}
			></div>
		)
	}

	function handleDeleteComment(taskId, idComment) {
		dispatch(deleteCommentAction(idComment, taskId))
	}

	function handleEditComment(comment) {
		setCommentEdit({
			showEditForm: true,
			content: comment.contentComment,
			id: comment.id,
		})
	}

	function handleCancelEditComment() {
		setCommentEdit({
			showEditForm: false,
			content: '',
			id: null,
		})
	}

	function handleChangeCommentContent(value) {
		setCommentEdit({
			...commentEdit,
			content: value,
		})
	}

	function handleSaveUpdateComment(comment) {
		dispatch(
			updateCommentAction(comment.taskId, {
				id: comment.id,
				contentComment: commentEdit.content,
			})
		)

		setCommentEdit({
			showEditForm: false,
			content: '',
			id: null,
		})
	}

	function renderCommentContent(comment) {
		if (commentEdit.showEditForm && commentEdit.id === comment.id) {
			return (
				<div className="content">
					<Editor
						apiKey="rr4jpi2t3raw888x8270475h8c5x3oj8oss1c9z9okdhojcu"
						// onInit={(evt, editor) => (editorRef.current = editor)}
						// onBlur={handleEditorBlur}
						onEditorChange={handleChangeCommentContent}
						init={{
							height: 200,
							menubar: true,
							plugins: [
								'emoticons advlist autolink lists link image charmap print preview anchor',
								'searchreplace visualblocks code fullscreen',
								'insertdatetime media table paste code help wordcount',
							],
							toolbar:
								'undo redo | formatselect | ' +
								'bold italic backcolor | alignleft aligncenter ' +
								'alignright alignjustify | bullist numlist outdent indent | ' +
								'removeformat | help | code',
							content_style:
								'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
						}}
						value={commentEdit.content}
					/>
					<div className="control">
						<button
							className="btn btn--primary"
							onClick={() => handleSaveUpdateComment(comment)}
						>
							Save
						</button>
						<button onClick={handleCancelEditComment} className="btn">
							Cancel
						</button>
					</div>
				</div>
			)
		}

		return (
			<div className="content">
				<div
					className="content-comment"
					dangerouslySetInnerHTML={{ __html: comment.contentComment }}
				/>
				<div className="control">
					<button onClick={() => handleEditComment(comment)}>Edit</button>
					<button
						onClick={() => handleDeleteComment(comment.taskId, comment.id)}
					>
						Delete
					</button>
				</div>
			</div>
		)
	}

	function renderCommentList() {
		return commentList.map(comment => {
			return (
				<div className="comments__comment-item" key={comment.id}>
					<img
						className="comments__comment-avatar"
						src={`https://picsum.photos/id/${comment.userId}/100/100`}
						alt="Avatar"
					/>
					<div className="comments__comment-info">
						<h4 className="name">{comment.user.name}</h4>
						{renderCommentContent(comment)}
					</div>
				</div>
			)
		})
	}

	return (
		<div className="task-detail">
			<div className="container-fluid">
				<div className="row">
					<div className="col-8">
						<div className="task-detail__main">
							<span className="task-detail__id">
								<i className="icon">
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
								<span className="title">TASK-{taskDetail.taskId}</span>
							</span>
							<textarea
								ref={textareaRef}
								className="task-detail__title"
								name="taskName"
								onChange={handleTaskNameChange}
								value={taskName}
							/>
							<div className="task-detail__description">
								<span className="title">Description</span>
								{renderDescription()}
							</div>
							<div className="comments">
								<h3 className="comments__title">Comments</h3>
								<div className="comments__post-comment">
									<CommentForm onSaveComment={handleSaveComment} />
								</div>
								{renderCommentList()}
							</div>
						</div>
					</div>
					<div className="col-4">
						<div className="task-detail__side">
							<div className="task-detail__top-control">
								<div className="control">
									<i className="icon">
										<svg
											aria-hidden="true"
											focusable="false"
											data-prefix="fab"
											data-icon="telegram-plane"
											className="svg-inline--fa fa-telegram-plane fa-w-14"
											role="img"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 448 512"
										>
											<path
												fill="currentColor"
												d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"
											></path>
										</svg>
									</i>
									<span className="name">Give feedback</span>
								</div>
								<div className="control">
									<i className="icon">
										<svg
											aria-hidden="true"
											focusable="false"
											data-prefix="fas"
											data-icon="link"
											className="svg-inline--fa fa-link fa-w-16"
											role="img"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 512 512"
										>
											<path
												fill="currentColor"
												d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"
											></path>
										</svg>
									</i>
									<span className="name">Copy link</span>
								</div>
								<div className="control">
									<i className="icon">
										<svg
											aria-hidden="true"
											focusable="false"
											data-prefix="far"
											data-icon="trash-alt"
											className="svg-inline--fa fa-trash-alt fa-w-14"
											role="img"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 448 512"
										>
											<path
												fill="currentColor"
												d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"
											></path>
										</svg>
									</i>
								</div>
							</div>
							<div className="task-detail__block">
								<h4 className="label">STATUS</h4>
								<Select
									options={statusOptions}
									value={selectedStatus}
									onChange={handleReactSelectChange}
									name="statusId"
								/>
							</div>
							<div className="task-detail__block">
								<h4 className="label">ASSIGNEES</h4>
								<CustomSelect
									options={assigneeOptions}
									value={selectedAssignees}
									isMulti={true}
									closeMenuOnSelect={false}
									name="listUserAsign"
									onReactSelectChange={handleReactSelectChange}
								/>
							</div>
							<div className="task-detail__block">
								<h4 className="label">PRIORITY</h4>
								<Select
									options={priorityOptions}
									value={selectedPriority}
									name="priorityId"
									onChange={handleReactSelectChange}
								/>
							</div>
							<div className="task-detail__block">
								<h4 className="label">ORIGINAL ESTIMATE (HOURS)</h4>
								<input
									className="original-estimate"
									type="number"
									value={taskDetail.originalEstimate?.toString() || '0'}
									name="originalEstimate"
									onChange={handleNumberInputChange}
								/>
							</div>
							<div className="task-detail__block">
								<h4 className="label">TIME TRACKING</h4>
								<div onClick={() => setShowTimeTrackingModal(true)}>
									<TimeTracking
										logged={taskDetail.timeTrackingSpent}
										remaining={taskDetail.timeTrackingRemaining}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Modal
				isShowModal={showTimeTrackingModal}
				onCloseModal={() => setShowTimeTrackingModal(false)}
			>
				<TimeTrackingForm
					logged={taskDetail.timeTrackingSpent}
					remaining={taskDetail.timeTrackingRemaining}
					onSaveTimeTracking={handleSaveTimeTracking}
				/>
			</Modal>
		</div>
	)
}
