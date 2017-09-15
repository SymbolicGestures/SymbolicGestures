import React from 'react'
import styles from './../../../styles/navbarStyles.css'
import {Navbar, Nav, NavItem, MenuItem, NavDropdown, Image, Modal, OverlayTrigger, Popover, Tooltip, Button} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import AutoFillOrgMenuItem from './AutoFillOrgMenuItem.jsx'
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      open: false,
      displayName: ''
    };
    this.toggleModal = this.toggleModal.bind(this)
  }
  conditionalNavProfile() {
    if(window.innerWidth >= 767){
      return (
        <Nav pullRight>
          <NavDropdown
            id="basic-nav-dropdown"
            eventKey={1}
            title={
              <button className={styles.profileButton}>
                <Image
                  src={this.props.profileImg}
                  style={{'height': '30px', 'width': '30px'}}
                  circle/>
                  <div>{this.props.displayName}</div>
              </button> || "Profile"}
            >
            <MenuItem eventKey={1.1} onSelect={this.toggleModal}>Settings</MenuItem>
            <MenuItem eventKey={1.2} href="/logout">Log Out</MenuItem>
          </NavDropdown>
        </Nav>
      )
    } else {
      return (
        <Nav pullRight>
          <NavItem eventKey={1} onSelect={this.toggleModal}>Settings</NavItem>
          <NavItem eventKey={2} href="/logout">Log Out</NavItem>
        </Nav>
      )
    }
  }

  toggleModal(){
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <Navbar fixedTop fluid className={this.props.navBarIsHidden ? styles.hidden : styles.displayed}>
        <Navbar.Header>
          <Navbar.Brand style={{padding: "0px 0px", display: "flex"}} href="/">
            <a className={styles.brand} href="/"></a>
            <a className={styles.logo} href="/">Offer Overflow</a>
          </Navbar.Brand>
          <Navbar.Toggle style={{margin: "20px 10px 0px 0px"}}/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav style={{'padding': '13px 0px'}}>
            <LinkContainer exact to="/"><NavItem eventKey={1}>Applications</NavItem></LinkContainer>
            <LinkContainer exact to="/analytics"><NavItem eventKey={2}>Analytics</NavItem></LinkContainer>
            <LinkContainer exact to="/connect"><NavItem eventKey={3}>Connect</NavItem></LinkContainer>
          </Nav>
          {(()=>{return this.conditionalNavProfile()})()}
        </Navbar.Collapse>
        <AutoFillOrgMenuItem
          show={this.state.open} onHide={this.toggleModal}
          profile={this.props.profile}
        />
      </Navbar>
    )
  }
}

export default Header;

Header.propTypes = {
  navBarIsHidden: PropTypes.bool,
  profileImg: PropTypes.string,
  displayName: PropTypes.string,
  profile: PropTypes.object
}
