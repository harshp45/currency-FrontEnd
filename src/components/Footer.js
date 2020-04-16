import React from 'react';

const Footer = (props) => {
    return(
        <div>
        <nav className="navbar fixed-bottom navbar-dark bg-dark">
            <ul className="nav">
                <li class="nav-item nav-link text-info float-left">
                    <i className="fas fa-rupee-sign mx-2"></i>
                    <i className="fas fa-pound-sign mx-2"></i>
                    <i className="fas fa-yen-sign mx-2"></i>
                    <i className="fas fa-dollar-sign mx-2"></i>
                </li>
                <li className="nav-item nav-link text-primary text-centre">
                    Stocks Symbols
                </li>
                <li className="nav-item float-right">
                    <a className="nav-link" href="#">Contact Info</a>
                </li>
                
            </ul>
        </nav>
        </div>
    );
}

export default Footer;