import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event)
	 {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('https://currency-trade.herokuapp.com/logins/signup', 
		{
			username: this.state.username,
			password: this.state.password
		})
		.then(response => {
			console.log(response)
			if (!response.data.errmsg) {
				console.log('successful signup')
				this.setState({ //redirect to login page
					redirectTo: '/'
				})
				window.location='/'
			} else 
			{
				console.log('username already taken')
			}
		}).catch(error => 
		{
			console.log('signup error: ')
			console.log(error)

		})

	}


render() {
	return (
            <div className="container-fluid h-100">
            <div className="row justify-content-center align-items-center h-100">
            <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3 borderDiv boxshadow p-3 mb-5 bg-black">
			<h2>Get registered here</h2>
			<form className="form-horizontal">
				<div className="form-group">
					<div className="col-ml-auto">
						<label className="form-label font-weight-bold h5" htmlFor="username">Username</label>
					</div>
					<div className="col-mr-auto">
						<input className="form-input"
							type="text"
							id="username"
							name="username"
							placeholder="Username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-ml-auto">
						<label className="form-label font-weight-bold h5" htmlFor="password">Password </label>
					</div>
					<div className="col-mr-auto">
						<input className="form-input"
							placeholder="password"
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="form-group ">
					<button className="btn btn-primary col-mr-auto" onClick={this.handleSubmit}	type="submit">Sign up</button>
				</div>
			</form>
            </div>
            </div>
            </div>

	)
}
}

export default Signup;
