import React, { Component } from 'react';
import classnames from 'classnames';
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      sID: '',
      field: '',
      errors: {},
      request: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
    // console.log(this.state.errors);
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      sID: this.state.sID,
      field: this.state.field
    }
    console.log(newUser)
    this.props.registerUser(newUser, this.props.history);
    this.setState({request: true});
  };
  render() {
    const { errors } = this.state;
    // console.log(errors)
    return (
      <div className="masthead">
        <div className="container d-flex h-100 align-items-center">
          <div className="mx-auto text-center">
            <h1 className="mx-auto my-0 text-uppercase font2">MAZE</h1>
              <form onSubmit={this.onSubmit} method="post" id="myform">
                <div className="input-group input-group-lg">
                  <input 
                    type="text"
                    name="name"
                    className= {classnames( 'inputLayout inputBorder form-control', { 'redBorder': errors.name})}
                    value={this.state.name}
                    onChange={this.onChange}
                    placeholder="Full name"
                  />
                  {errors.name && (
                  <div className='errorbackgroung'>{errors.name}</div>
                  )}
                </div>
                <div className="input-group input-group-lg">
                  <input
                    type="email"
                    name="email"
                    className= {classnames( 'inputLayout inputBorder form-control', { 'redBorder': errors.email })}
                    value={this.state.email}
                    onChange={this.onChange}
                    placeholder="Email"
                  />
                  {errors.email && (
                  <div className='errorbackgroung'>{errors.email}</div>
                  )}
                </div>
                <div className="input-group input-group-lg">
                  <input 
                    type="number"
                    name="sID"
                    className= {classnames( 'inputLayout inputBorder form-control', { 'redBorder': errors.sID})}
                    value={this.state.sID}
                    onChange={this.onChange}
                    placeholder="Student number"
                  />
                  {errors.sID && (
                  <div className='errorbackgroung'>{errors.sID}</div>
                  )}
                </div>
                <div className="input-group input-group-lg">
                  <input
                    type="password"
                    name="password"
                    className= {classnames( 'inputLayout inputBorder form-control', { 'redBorder': errors.password })}
                    value={this.state.password}
                    onChange={this.onChange}
                    placeholder="Password"
                  />
                  {errors.password && (
                  <div className='errorbackgroung'>{errors.password}</div>
                  )}
                </div>
                <div className="input-group input-group-lg">
                  <input
                    type="password"
                    name="password2"
                    className= {classnames( 'inputLayout inputBorder form-control', { 'redBorder':errors.password2 })}
                    value={this.state.password2}
                    onChange={this.onChange}
                    placeholder="Submit password"
                  />
                  {errors.password2 && (
                  <div className='errorbackgroung'>{errors.password2}</div>
                  )}
                </div>
                <div className="input-group input-group-lg">
                  <select name="field" 
                  className= {classnames( 'inputLayout inputBorder form-control', { 'redBorder': errors.grade})} 
                  value={this.state.field} onChange={this.onChange}>
                      <option className="option">Field</option>
                      <option className="option" value="E">Electrical engineering</option>
                      <option className="option" value="C">Computer engineering</option>
                  </select>
                  {errors.field && (
                  <div className='errorbackgroung'>{errors.field}</div>
                  )}
                </div>
                <div className="form-row-last">
                  <input type="submit" name="register" className="btn font1 mybtn1 submitLayout" value="register" />
                </div>
              </form>
            </div>
        </div>
        <div>
          <nav className="footerCss">
            <div className="container marginP">
              <div className="marginP"><Link to='/underconstruction'>about MAZE</Link></div>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));