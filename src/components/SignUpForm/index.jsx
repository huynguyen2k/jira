import React from 'react'
import './style.scss'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

const initialValues = {
	email: '',
	passWord: '',
	name: '',
	phoneNumber: '',
}

const validationSchema = Yup.object({
	email: Yup.string()
		.required('Email is required!')
		.email('Your email is not valid!'),
	passWord: Yup.string()
		.required('Password is required!')
		.matches(/^[a-zA-Z0-9]{6,32}$/, 'Password must from 6 to 32 characters!'),
	name: Yup.string().required('Name is required!'),
	phoneNumber: Yup.string().required('Phone number is required!'),
})

export default function SignUpForm(props) {
	const { onSubmitSignUpForm } = props

	function handleSubmitLoginForm(values, helper) {
		if (onSubmitSignUpForm) {
			onSubmitSignUpForm(values)
			helper.resetForm()
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmitLoginForm}
		>
			{() => {
				return (
					<Form className="form">
						<div className="form__text">
							<p className="text">Log in to continue to:</p>
							<p className="text text--strong">Your team's site</p>
						</div>
						<div className="form__group">
							<Field
								className="form__input"
								type="text"
								name="email"
								placeholder="Enter email"
							/>
							<p className="form__error-message">
								<ErrorMessage name="email" />
							</p>
						</div>
						<div className="form__group">
							<Field
								className="form__input"
								type="password"
								name="passWord"
								placeholder="Enter password"
							/>
							<p className="form__error-message">
								<ErrorMessage name="passWord" />
							</p>
						</div>
						<div className="form__group">
							<Field
								className="form__input"
								type="text"
								name="name"
								placeholder="Enter your name"
							/>
							<p className="form__error-message">
								<ErrorMessage name="name" />
							</p>
						</div>
						<div className="form__group">
							<Field
								className="form__input"
								type="text"
								name="phoneNumber"
								placeholder="Enter phone number"
							/>
							<p className="form__error-message">
								<ErrorMessage name="phoneNumber" />
							</p>
						</div>
						<div className="form__group">
							<button type="submit" className="form__submit">
								Sign up
							</button>
						</div>
						<div className="socials">
							<div className="socials__item">
								<img
									src="./assets/images/google.png"
									alt="google"
									className="socials__icon"
								/>
								<span className="socials__title">Login with Google</span>
							</div>
							<div className="socials__item">
								<img
									src="./assets/images/facebook.png"
									alt="facebook"
									className="socials__icon"
								/>
								<span className="socials__title">Login with Facebook</span>
							</div>
							<div className="socials__item">
								<img
									src="./assets/images/microsoft.png"
									alt="microsoft"
									className="socials__icon"
								/>
								<span className="socials__title">Login with Microsoft</span>
							</div>
							<div className="socials__item">
								<img
									src="./assets/images/apple.png"
									alt="apple"
									className="socials__icon"
								/>
								<span className="socials__title">Login with Apple</span>
							</div>
						</div>
						<ul className="form__links">
							<li>
								<Link to="/login">Login with an account</Link>
							</li>
						</ul>
					</Form>
				)
			}}
		</Formik>
	)
}
