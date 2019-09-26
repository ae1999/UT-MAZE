import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class Dashboard extends Component {
  render() {
    return (
      <div className='underCPage'>
        <div className='notFoundPHeight blackBack'>
          <p className='notFoundPTag text-center font2'>UNDER CONSTRUCTION</p>
        </div>
      </div> 
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  course: state.course,
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
