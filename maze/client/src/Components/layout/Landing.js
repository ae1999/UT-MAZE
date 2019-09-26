import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Landing extends Component {
  
  render() {
    const home = (
      <div className="masthead">
        <div className="container d-flex h-100 align-items-center">
          <div className="mx-auto text-center">
            <h1 className="mx-auto my-0 text-uppercase font2">MAZE</h1>
            <Link to="/login" className="btn font1 mybtn1 btnLayout">Login</Link>
            <br />
            <Link to="/register" className="btn font1 mybtn2 btnLayout">Register</Link>
          </div>
        </div>
      </div>
    )
    return (
      <div>
        { home }
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

export default Landing;