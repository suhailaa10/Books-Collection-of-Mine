/* eslint-disable no-unused-vars */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/books.webp";

function Header() {
  return (
    <header className="container">
      <Link to="/" className="logo">
        <img className="imgg" src={logo} alt="ReactJs" /> 
      <h2 className="text-warning">Bookyy</h2>
      </Link>
      <nav className="f-nav">
        <NavLink className="menu" to="/">Home</NavLink>
        <NavLink className="menu" to="/books">Books</NavLink>
        <NavLink className="menu" to="/about">About</NavLink>
       
        </nav>
       
    </header>
  );
}

export default Header;
