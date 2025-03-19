import React from "react";
import { Link } from "react-router-dom";
import logo from "../Images/amazon.webp";
import logoSearch from "../Images/se.svg";
import Cart from "../Images/shoping.png"
import "./Header.css"
import { useAuth } from "../context/GlobalStae";
import { auth } from "../Firebase";


const Header = () => {

  const {user,basket} = useAuth()

  //methode men Firebase ta3mlena signOut
  const handelSignOut = ()=>{
    auth.signOut();
  }

  return (
    <div className="header">
      <Link to="/">
        <img className="header-logo" src={logo} alt="amz" />
      </Link>
      <div className="header-search">
        <input className="header-searchInput" type="text" />
        <img className="header-searchIcon" src={logoSearch} alt="search" />
      </div>
      <div className="header-nav">

        <Link to={!user && "/login"}>
          <div className="header-option" onClick={handelSignOut}>
            <div className="header-optionLineOne">Hello {user?`${user.email}`:"Guest"}</div>
            <div className="header-optionLineTwo">{user?"Sign out":"sign up"}</div>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header-option">
            <div className="header-optionLineOne">Returns</div>
            <div className="header-optionLineTwo">& Orders</div>
          </div>
        </Link>

        <div className="header-option">
          <div className="header-optionLineOne">Your</div>
          <div className="header-optionLineTwo">Prime</div>
        </div>

        <Link to="/checkout">
          <div className="header-optionBasket">
            <img className="header-searchIcon" src={Cart} alt='Cart'/>
            <span className="header-optionLineTwo header-basketCount"> {basket.length}</span>
          </div>
        </Link>


      </div>
    </div>
  );
};

export default Header;
