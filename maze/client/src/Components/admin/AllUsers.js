import React, { Component } from 'react';
import PropTypes from 'prop-types';
//redux
import { connect } from 'react-redux';
import { allUsers } from '../../actions/adminActions';

class AllUsers extends Component {
  componentDidMount() {
    this.props.allUsers();
  }
  render() {
    const { users } = this.props.admin;
    let usersList = [];
    if (users !== null || users !== undefined) {
      if (users.length > 0) {
        usersList = users.map(user => (
        <div className="card text-center admin-card margin-top-admin">
          <div className="card-body card-admin-background">
            <h5 className="card-title">name: {user.name}</h5>
            <h5 className="card-title">email: {user.email}</h5>
            <h5 className="card-title">sID: {user.sID}</h5>
            <h5 className="card-title">field: {user.field}</h5>
            <h5 className="card-title">register date: {user.date}</h5>
          </div>
        </div>
        ));
      }
    }
    return (
      <div className='masterhead-background'>
        {/* <h1 className='text-white text-center'>Admin</h1> */}
        <br/>
        <div className='admin-scroll-y'>{usersList}{usersList}</div>
      </div>
    )
  }
}

AllUsers.propTypes = {
  allUsers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
});

export default connect(mapStateToProps, { allUsers })(AllUsers);
