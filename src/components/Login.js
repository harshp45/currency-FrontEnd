import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSignup(event) {
        this.setState({
            redirectTo: 'http://localhost:3000/Signup'
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios.post('https://currency-trade.herokuapp.com/logins/login', {
                username: this.state.username,
                password: this.state.password
            },{
                headers: {
                    method:'POST'
                }
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/Home'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                
            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <div className="container-fluid h-100">
                    <div className="row justify-content-center align-items-center h-100 ">
                    <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3 borderDiv boxshadow p-3 mb-5 bg-black">
                    <div className="headingContent">Login</div>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="username">Username</label>
                            </div>
                            <div className="col-3 col-mr-auto">
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
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="password">Password: </label>
                            </div>
                            <div className="col-3 col-mr-auto">
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
                            <div className="col-6"></div>
                            <button className="btn btn-info" onClick={this.handleSubmit} type="submit">Login</button>
                            <button className="btn btn-warning mr-2" type="submit"><a href="/Signup">Sign Up</a></button>
                        </div>
                    </form>
                    </div>
                    </div>
                    </div>
                </div>
            )
        }
    }
}

export default LoginForm;
