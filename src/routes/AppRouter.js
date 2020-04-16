import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import LoginForm from '../components/Login';
import Home from '../components/Home';
import News from '../components/News'
import Currency from '../components/Currency';
import About from '../components/About';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Signup from '../components/Signup';
import SellStock from '../components/SellStock';
import BuyStock from '../components/BuyStock';

class AppRouter extends Component {
    constructor() {
        super()
        this.state = {
          loggedIn: false,
          username: null
        }
    
        this.getUser = this.getUser.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.updateUser = this.updateUser.bind(this)
      }
    
      componentDidMount() {
        this.getUser()
      }
    
      updateUser (userObject) {
        this.setState(userObject)
      }
    
      getUser() {
        axios.get('/user/').then(response => {
          console.log('Get user response: ')
          console.log(response.data)
          if (response.data.user) {
            console.log('Get User: There is a user saved in the server session: ')
    
            this.setState({
              loggedIn: true,
              username: response.data.user.username
            })
          } else {
            console.log('Get user: no user');
            this.setState({
              loggedIn: false,
              username: null
            })
          }
        })
      }

      render() {
          return(
            <BrowserRouter>
                <Header updateUser={this.updateUser} loggedIn={this.state.loggedIn}/>
                {this.state.loggedIn &&
                <h2 className="text-center">Welcome, {this.state.username}!</h2>
                }
                <Switch>
                    <Route path = "/" exact render={() => <LoginForm updateUser={this.updateUser}/>}/>
                    <Route path = "/Home" exact component ={Home} />
                    <Route path = "/AboutUs" component={About}/>
                    <Route path = "/Currency" component={Currency}/>
                    <Route path = "/SellStocks" component ={SellStock} />
                    <Route path = "/BuyStocks" component ={BuyStock} />
                    <Route path = "/News" component={News}/>
                    <Route path = "/Login" render={() =>
                    <LoginForm
                    updateUser={this.updateUser}
                    />}/>
                    <Route path = "/Signup" component={Signup}/>
                </Switch>
                <Footer />
            </BrowserRouter> 
          )
      }

}

export default AppRouter;