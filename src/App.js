import './App.scss'
import React from 'react'
import LoginPage from 'pages/Login'
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom'
import ProjectPage from 'pages/Project'
import NotFoundPage from 'pages/NotFound'
import SignUp from 'pages/SignUp'

function App() {
	console.log('render App')

	return (
		<Router>
			<Switch>
				<Redirect exact from="/" to="/login" />
				<Route exact path="/login" component={LoginPage} />
				<Route exact path="/signup" component={SignUp} />
				<Route path="/project" component={ProjectPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</Router>
	)
}

export default App
