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
        <div className="dashboardCourseCards text-white cardBackgroundColor card text-center">
          <div className="card-header">
            <h1>user-name: {user.name}</h1>
          </div>
          <div className="card-body">
            <h5 className="card-title">email: {user.email}</h5>
            <h5 className="card-title">state: {user.state}</h5>
            <h5 className="card-title">Phone-number: {user.phoneNumber}</h5>
            <h5 className="card-title">home-Number: {user.homeNumber}</h5>
            <h5 className="card-title">grade: {user.grade}</h5>
            <h5 className="card-title">field: {user.field}</h5>
            <h5 className="card-title">register date: {user.date}</h5>
            <h5 className="card-title">courses: {user.enroledCources.length}</h5>
          </div>
        </div>
        ));
      }
    }
    return (
      <div className='darkBackgroud'>
        <h1 className='text-white text-center'>Admin</h1>
        <br/>
        {usersList}
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