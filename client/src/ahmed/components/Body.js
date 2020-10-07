import React, { Component } from "react";
import sideMenu from "../images/side-menu.svg";
import john from "../images/john.png";
import dots from "../images/dots.svg";
import logo from "../images/logo.svg";
import breakfast from "../images/breakfast.svg";
import dinner from "../images/dinner.svg";
import lunchActive from "../images/lunch-active.svg";
import pic1 from "../images/pic1.png";
import pic2 from "../images/pic2.png";
import pic3 from "../images/pic3.png";
import pic4 from "../images/pic4.png";
import "../css/style.css";

export class Body extends Component {
  render() {
    return (
      <div>
        <nav className="mnb navbar navbar-default navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <div style={{ padding: "15px 0" }}>
                <a href="#" id="msbo">
                  <img src={sideMenu} alt="" />
                </a>
              </div>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <form className="navbar-form">
                {/* <!-- <input type="text" className="form-control" placeholder="Search..."> --> */}
                <div className="input-group">
                  <input type="text" className="form-control firstfield" />
                  <span
                    className="input-group-btn"
                    style={{ width: "0px" }}
                  ></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Where? e.g Toronto"
                  />
                  <span className="input-group-btn">
                    <button className="btn btn-search" type="button">
                      <i className="material-icons">search</i>
                    </button>
                  </span>
                </div>
              </form>
              <ul className="nav navbar-nav  ml-auto">
                <li className="dropdown">
                  <a
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="material-icons">notifications_none</span>
                    <span className="red-dot"></span>
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    {/* <!-- end notify title --> */}
                    {/* <!-- notify content --> */}
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <div className="col-md-3 col-sm-3 col-xs-3">
                          <div className="notify-img">
                            <img src={john} alt="" />
                          </div>
                        </div>
                        <div className="col-md-9 col-sm-9 col-xs-9 pd-l0">
                          <h5>Bellashihair</h5>
                          <p className="">Started Following you.</p>
                        </div>
                      </li>
                      <li>
                        <div className="col-md-3 col-sm-3 col-xs-3">
                          <div className="notify-img">
                            <img src={john} alt="" />
                          </div>
                        </div>
                        <div className="col-md-9 col-sm-9 col-xs-9 pd-l0">
                          <h5>Bellashihair</h5>
                          <p className="">Started Following you.</p>
                        </div>
                      </li>
                      <li>
                        <div className="col-md-3 col-sm-3 col-xs-3">
                          <div className="notify-img">
                            <img src={john} alt="" />
                          </div>
                        </div>
                        <div className="col-md-9 col-sm-9 col-xs-9 pd-l0">
                          <h5>Bellashihair</h5>
                          <p className="">Started Following you.</p>
                        </div>
                      </li>
                      <li>
                        <div className="col-md-3 col-sm-3 col-xs-3">
                          <div className="notify-img">
                            <img src={john} alt="" />
                          </div>
                        </div>
                        <div className="col-md-9 col-sm-9 col-xs-9 pd-l0">
                          <h5>Bellashihair</h5>
                          <p className="">Started Following you.</p>
                        </div>
                      </li>
                    </div>
                    <div className="notify-drop-footer text-center">
                      <a href=""> See All Notification &gt; </a>
                    </div>
                  </ul>
                </li>
                <li className="dropdown">
                  <a
                    href="#"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span />
                    <span className="material-icons userIcon">person_pin</span>
                    {/* <!-- <img src="images/user-icon.svg" className="userIcon" alt=""></span>  --> */}
                    <span>
                      <img src={dots} className="dotIcon" alt="" />
                    </span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="#">Settings</a>
                    </li>
                    <li>
                      <a href="#">Upgrade</a>
                    </li>
                    <li>
                      <a href="#">Help</a>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li>
                      <a href="#">Logout</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* <!--msb: main sidebar--> */}
        <div className="msb" id="msb">
          <nav className="navbar navbar-default" role="navigation">
            {/* <!-- Brand and toggle get grouped for better mobile display --> */}
            <div className="navbar-header">
              <div className="brand-wrapper">
                {/* <!-- Brand --> */}
                <div className="brand-name-wrapper text-center">
                  <a className="" href="#">
                    <img src={logo} className="logo" alt="" />
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- Main Menu --> */}
            <div className="side-menu-container">
              <ul className="nav navbar-nav">
                <li>
                  <a href="#">
                    <i className="material-icons">home</i> Home
                  </a>
                </li>
                <li className="active">
                  <a href="#">
                    <i className="material-icons">list</i> Listing
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="material-icons">bookmark_border</i> Perks
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="material-icons">bar_chart</i> Statistics
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="material-icons">insert_photo</i> Gallery
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="material-icons">book</i> Knowledge
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="material-icons">person</i> Account
                  </a>
                </li>
              </ul>
            </div>
            {/* <!-- /.navbar-collapse --> */}
          </nav>
        </div>
      </div>
    );
  }
}

export default Body;
