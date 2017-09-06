import React from 'react';
import styles from './../../../styles/navbarStyles.css'
const Header = (props) => {
  return (
    // Navbar
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="btn navbar-toggle" id="header-button">
            Menu <i className="fa fa-bars"></i>
          </button>
          <a className={styles.brand} href="/"></a>
          <a className="navbar-brand" href="/">Offer Overflow</a>
        </div>
        <ul className="nav navbar-nav navbar-collapse collapse navbar-center">
          <li><a href="../portfolio.html">Applications</a></li>
          <li><a href="../portfolio.html#story">Analytics</a></li>
          <li><a href="../portfolio.html#portfolio">Connect</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-collapse collapse navbar-right">
          <li><a href="../portfolio.html#portfolio">Settings</a></li>
          <li><a href="../portfolio.html#portfolio">Sign out</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
