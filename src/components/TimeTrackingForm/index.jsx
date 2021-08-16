import TimeTracking from 'components/TimeTracking'
import React, { useState } from 'react'
import './style.scss'

export default function TimeTrackingForm(props) {
	const { logged, remaining, onSaveTimeTracking } = props
	const [timeTracking, setTimeTracking] = useState({
		timeTrackingSpent: logged,
		timeTrackingRemaining: remaining,
	})

	function handleChange(e) {
		const { name, value } = e.target

		setTimeTracking({
			...timeTracking,
			[name]: Number(value),
		})
	}

	function handleSaveTimeTracking() {
		if (onSaveTimeTracking) {
			onSaveTimeTracking(
				timeTracking.timeTrackingSpent,
				timeTracking.timeTrackingRemaining
			)
		}
	}

	return (
		<div className="time-tracking-form">
			<div className="time-tracking-form__row">
				<div className="time-tracking-form__group">
					<h3 className="time-tracking-form__title">Time tracking</h3>
				</div>
			</div>
			<div className="time-tracking-form__row">
				<div className="time-tracking-form__group">
					<TimeTracking
						logged={timeTracking.timeTrackingSpent}
						remaining={timeTracking.timeTrackingRemaining}
					/>
				</div>
			</div>
			<div className="time-tracking-form__row">
				<div className="time-tracking-form__group">
					<label htmlFor="timeTrackingSpent">Time spent (hours)</label>
					<input
						type="number"
						id="timeTrackingSpent"
						name="timeTrackingSpent"
						value={timeTracking.timeTrackingSpent.toString()}
						onChange={handleChange}
					/>
				</div>
				<div className="time-tracking-form__group">
					<label htmlFor="timeTrackingRemaining">Time remaining (hours)</label>
					<input
						type="number"
						id="timeTrackingRemaining"
						name="timeTrackingRemaining"
						value={timeTracking.timeTrackingRemaining.toString()}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="time-tracking-form__row">
				<div className="time-tracking-form__group text-right">
					<button className="save-btn" onClick={handleSaveTimeTracking}>
						Save
					</button>
				</div>
			</div>
		</div>
	)
}
