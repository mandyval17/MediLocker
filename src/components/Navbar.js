import React from "react";
import "../css/Navbar.css";
import Main from './Main';
function navbar() {
  return (
    <div>
      <div className="progress fixed-top" style={{height: "5px"}}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{width: "25%"}}
          aria-valuenow="2"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      {/* <div className="progress" style={{height: "20px"}}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{width: "25%"}}
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div> */}
      <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navbarNav">
            <ul class="navbar-nav mx-auto mid">
              <li class="nav-item">
                <a class="nav-link px-lg-5 px-md-3" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link px-lg-5 text-nowrap" href="#">
                  Find Doctor
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link px-lg-5 text-nowrap" href="#">
                  Our Servise
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link px-lg-5 text-nowrap" href="#">
                  About us
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link px-lg-5 text-nowrap" href="#">
                  Contacts
                </a>
              </li>
            </ul>
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <a class="btn text-nowrap" href="http://localhost:5000/auth/google" role="button">
                    Login as Patient
                  </a>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link me-auto" href="#">
                  <a class="btn text-nowrap" href="/login" role="button">
                    Login as Doctor
                  </a>
                </a>
              </li>
            </ul>
            
            
          </div>
          {/* <div class="collapse navbar-collapse " id="navbarNav"> */}
          {/* </div> */}
        </div>
      </nav>
      <Main/>
    </div>
  );
}

export default navbar;
