import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

import rojanoicon from '../img/roanoicon.jpg';

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }
  render() {

    const { isAuthenticated } = this.props.auth;

    const logoutButton = (
      <div className='navContainer'>
        <p className="btn mybtn1" style={{ margin: 'auto' }} onClick={this.onLogoutClick.bind(this)}>Log out</p>
        <NavLink className="btn mybtn2" style={{ marginRight: '5px' }} to="/dashboard">Gifts</NavLink>
      </div>
    );
    const NON = (
      <div></div>
    );
    return (
      <div>
        <nav className="navbar navbar-expand-sm fixed-top navbar-light">
          <div className="container">
            <div className="navbar-brand">
              <NavLink to="/">
						    <img src={rojanoicon} width="65" height="65" alt="" />
              </NavLink>
					  </div>
            
            {
               !isAuthenticated ? NON : logoutButton 
            }
          </div>
        </nav>
      </div>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));