import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      request: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(userData);
    this.setState({request: true});
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="masthead">
        <div className="container d-flex h-100 align-items-center">
          <div className="mx-auto text-center">
            <h1 className="mx-auto my-0 text-uppercase font2">MAZE</h1>
              <form onSubmit={this.onSubmit} method="post" id="myform">
                <div className="input-group input-group-lg">
                  <input 
                    type="email"
                    name="email"
                    className= {classnames( 'inputLayout inputBorder form-control', { 'redBorder': errors.email})}
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
                <div className="form-row-last">
                  <input type="submit" name="login" className="btn font1 mybtn1 submitLayout" value="Login" />
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);