import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import './style.scss'

export default function EditUserForm({ userEdit, onSubmitUserEdit }) {
	console.log(userEdit)

	return (
		<Formik
			initialValues={userEdit}
			validationSchema={Yup.object({
				passWord: Yup.string()
					.required('Password is required!')
					.matches(/^\w{6,32}$/, 'Password must be from 6-32 characters!'),
				email: Yup.string()
					.required('Email is required!')
					.email('Your email is not valid!'),
				name: Yup.string().required('Name is required!'),
				phoneNumber: Yup.string()
					.required('Phone number is required!')
					.matches(/^\d{10}$/, 'Phone number must be 10 numbers'),
			})}
			onSubmit={(values, helper) => {
				if (onSubmitUserEdit) {
					onSubmitUserEdit(values)
					helper.resetForm({
						values: {
							id: '',
							passWord: '',
							email: '',
							name: '',
							phoneNumber: '',
						},
						errors: {},
						touched: {},
					})
				}
			}}
		>
			{() => {
				return (
					<Form className="edit-user-form">
						<h2 className="edit-user-form__title">Edit User</h2>
						<div className="edit-user-form__row">
							<div className="edit-user-form__group">
								<label className="edit-user-form__label" htmlFor="id">
									Id
								</label>
								<Field
									className="edit-user-form__input"
									id="id"
									name="id"
									readOnly
								/>
								<p className="edit-user-form__error-message">
									<ErrorMessage name="id" />
								</p>
							</div>
						</div>
						<div className="edit-user-form__row">
							<div className="edit-user-form__group">
								<label className="edit-user-form__label" htmlFor="passWord">
									Password
								</label>
								<Field
									className="edit-user-form__input"
									id="passWord"
									name="passWord"
									type="password"
								/>
								<p className="edit-user-form__error-message">
									<ErrorMessage name="passWord" />
								</p>
							</div>
						</div>
						<div className="edit-user-form__row">
							<div className="edit-user-form__group">
								<label className="edit-user-form__label" htmlFor="email">
									Email
								</label>
								<Field
									className="edit-user-form__input"
									id="email"
									name="email"
								/>
								<p className="edit-user-form__error-message">
									<ErrorMessage name="email" />
								</p>
							</div>
						</div>
						<div className="edit-user-form__row">
							<div className="edit-user-form__group">
								<label className="edit-user-form__label" htmlFor="name">
									Name
								</label>
								<Field
									className="edit-user-form__input"
									id="name"
									name="name"
								/>
								<p className="edit-user-form__error-message">
									<ErrorMessage name="name" />
								</p>
							</div>
						</div>
						<div className="edit-user-form__row">
							<div className="edit-user-form__group">
								<label className="edit-user-form__label" htmlFor="phoneNumber">
									Phone number
								</label>
								<Field
									className="edit-user-form__input"
									id="phoneNumber"
									name="phoneNumber"
								/>
								<p className="edit-user-form__error-message">
									<ErrorMessage name="phoneNumber" />
								</p>
							</div>
						</div>
						<div className="edit-user-form__row">
							<div className="edit-user-form__group text-right">
								<button type="submit" className="submit-btn">
									Save
								</button>
							</div>
						</div>
					</Form>
				)
			}}
		</Formik>
	)
}
