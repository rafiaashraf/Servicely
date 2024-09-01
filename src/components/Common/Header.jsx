import React from 'react';
import './Header.css';
import logo from "../../characters/logo1.png";
import { NavHashLink } from 'react-router-hash-link';


function Header (){
    return(    
            <header>
                <div className="container container-flex">
                    <img src={logo} alt="SERVICELY" className="logo"  />
                    <NavHashLink smooth to='/Home/#mainSection' className="listItem" activeClassName="activeItem">Home</NavHashLink>
                    <NavHashLink smooth to='/Home/#about' className="listItem" activeClassName="activeItem">About</NavHashLink>
                    <NavHashLink smooth to='/Home/#services' className="listItem" activeClassName="activeItem">Services</NavHashLink>
                    <NavHashLink smooth to='/Home/#contact' className="listItem" activeClassName="activeItem">Contact Us</NavHashLink>  
                    
                </div>
            </header>         
    );
}

export default Header;