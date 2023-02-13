import React from 'react';
import {NavLink} from 'react-router-dom';
import '../../../src/index.css';


class HeaderOwner extends React.Component {
  Logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location = "../Login"
  }

  render(){
    return(
      <div> 
        <nav class="navbar navbar-expand-lg navbar-mainbg">

          <NavLink className="navbar-brand navbar-logo" to="/" exact>
          <img src="mcd.png" width="40" height="33"  />
          Washuis
          </NavLink>
          
          <button 
          className="navbar-toggler"
          onClick={ function(){
          }}
          type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fas fa-list text-white"></i>
          </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto">

            <li className="nav-item ">
              <NavLink className="nav-link" to="/" exact>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/TransaksiOwner" exact>
                Laporan
              </NavLink>
            </li>
              
            <li className="nav-item">
              <NavLink className="nav-link" to="/Login" exact>
                Logout
              </NavLink>
            </li>
            </ul>

            </div>
        </nav>
        <hr />
      </div>
    );
  }
}

export default HeaderOwner;