import React from 'react'
import './style.scss'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

const initialValues = {
	email: '',
	password: '',
}

const validationSchema = Yup.object({
	email: Yup.string()
		.required('Email is required!')
		.email('Your email is not valid!'),
	password: Yup.string()
		.required('Password is required!')
		.matches(/^[a-zA-Z0-9]{6,32}$/, 'Password must from 6 to 32 characters!'),
})

export default function LoginForm(props) {
	const { onSubmitLoginForm } = props

	function handleSubmitLoginForm(loginUser) {
		if (onSubmitLoginForm) {
			onSubmitLoginForm(loginUser)
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmitLoginForm}
		>
			{formik => {
				const { touched, errors } = formik

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
							{touched.email && errors.email ? (
								<p className="form__error-message">{errors.email}</p>
							) : null}
						</div>
						<div className="form__group">
							<Field
								className="form__input"
								type="password"
								name="password"
								placeholder="Enter password"
							/>
							{touched.password && errors.password ? (
								<p className="form__error-message">{errors.password}</p>
							) : null}
						</div>
						<div className="form__group">
							<button type="submit" className="form__submit">
								Login
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
								<a href="https://google.com.vn">Can't log in?</a>
							</li>
							<li>
								<Link to="/signup">Sign up for an account</Link>
							</li>
						</ul>
					</Form>
				)
			}}
		</Formik>
	)
}
