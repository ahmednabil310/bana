import React from 'react';

const Header = () => {
  return (
    <nav className="mnb navbar navbar-default navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <i className="ic fa fa-bars"></i>
          </button>
          <div style={{ padding: '15px 0' }}>
            <a href="#" id="msbo">
              <img src={require('../../../../images/side-menu.svg')} alt="" />
            </a>
          </div>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                aria-expanded="false">
                <span className="material-icons">notifications_none</span>
                <span className="red-dot"></span>
              </a>
              <ul className="dropdown-menu notify-drop">
                <div className="drop-content">
                  <li>
                    <div className="col-md-3 col-sm-3 col-xs-3">
                      <div className="notify-img"><img src={require('../../../../images/john.png')} alt="" /></div>
                    </div>
                    <div className="col-md-9 col-sm-9 col-xs-9 pd-l0">
                      <h5>Bellashihair</h5>
                      <p className="">Started Following you.</p>
                    </div>
                  </li>
                  <li>
                    <div className="col-md-3 col-sm-3 col-xs-3">
                      <div className="notify-img"><img src={require('../../../../images/john.png')} alt="" /></div>
                    </div>
                    <div className="col-md-9 col-sm-9 col-xs-9 pd-l0">
                      <h5>Bellashihair</h5>
                      <p className="">Started Following you.</p>
                    </div>
                  </li>
                  <li>
                    <div className="col-md-3 col-sm-3 col-xs-3">
                      <div className="notify-img"><img src={require('../../../../images/john.png')} alt="" /></div>
                    </div>
                    <div className="col-md-9 col-sm-9 col-xs-9 pd-l0">
                      <h5>Bellashihair</h5>
                      <p className="">Started Following you.</p>
                    </div>
                  </li>
                  <li>
                    <div className="col-md-3 col-sm-3 col-xs-3">
                      <div className="notify-img"><img src={require('../../../../images/john.png')} alt="" /></div>
                    </div>
                    <div className="col-md-9 col-sm-9 col-xs-9 pd-l0">
                      <h5>Bellashihair</h5>
                      <p className="">Started Following you.</p>
                    </div>
                  </li>
                </div>
                <div className="notify-drop-footer text-center">
                  <a href=""> See All Notification</a>
                </div>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                aria-expanded="false">
                <span className="material-icons userIcon">
                  person_pin
                        </span>
                <span><img src={require('../../../../images/dots.svg')} className="dotIcon" alt="" /></span>
              </a>
              <ul className="dropdown-menu">
                <li><a href="#">Settings</a></li>
                <li><a href="#">Upgrade</a></li>
                <li><a href="#">Help</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">Logout</a></li>
              </ul>
            </li>
          </ul>
          <form className="navbar-form">
            <div className="input-group">
              <input type="text" className="form-control firstfield" />
              <span className="input-group-btn" style={{ width: '0px' }}></span>
              <input type="text" className="form-control" placeholder="Where? e.g Toronto" />
              <span className="input-group-btn">
                <button className="btn btn-search" type="button">
                  <i className="material-icons">search</i>
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Header
