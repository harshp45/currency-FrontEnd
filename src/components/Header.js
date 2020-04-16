import React, { Component } from 'react';
import logo from './../images/logo-circle.png';
import '../css/Header.css';
import axios from 'axios';
import { Link } from 'react-router-dom';



class Header extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) 
    {
        event.preventDefault()
        console.log('logging out')
        
        axios.post('https://currency-trade.herokuapp.com/logins/logout').then(response => 
        {
          console.log(response.data)
          if (response.status === 200) 
          {
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
            
          }
        }).catch(error => 
        {
            console.log('Logout error')
        })
        window.location='/'
      }

      render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);

        return (
            <div>

                <header className="toolba" id="nav-container">
                <nav className="toolba_navigation">
                <div>
                    <img className="rounded-circle" src={logo} alt="logo" width="70" height="70" />
                </div>
                <h3 className="mx-auto text-info">Trading Dashboard</h3>
                <div class="spacer"></div>
                    {loggedIn ? (
                        <section className="navbar-section">
                            <div className="items" id="myNavbar">
                            <Link to="/Home">Home</Link>
                            <Link to="/AboutUs">AboutUs</Link>
                            <Link to="/Currency">Currency</Link>
                            <Link to="/BuyStocks">BuyStocks</Link>
                            <Link to="/SellStocks">SellStocks</Link>
                            <Link to="/News">News</Link>
                            <Link to="/" className="btn btn-link text-secondary" onClick={this.logout}><span className="text-secondary">logout</span></Link>
                            </div>
                        </section>
                        ) : (
                        <section className="navbar-section">
                            <div className="items" id="myNavbar">                         
                                <Link to="/News">News</Link>
                                <Link to="/Login" className="buttonDesign">Login</Link>
                                <Link to="/Signup" className="buttonDesign mr-2">Signup</Link>   
                            </div>
                        </section>
                    )}
                    </nav>
                </header>
            </div>

        );
      }

}



export default Header;