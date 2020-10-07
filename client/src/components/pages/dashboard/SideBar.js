import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const SideBar = ({ activeSection, setActiveSection }) => {
  //redux store state
  const currentUser = useSelector(state => state.currentUser);
  //comp local state

  return (
    <>
      <nav id="sidebar" className="sidebar-wrapper">
        <div className="sidebar-content">
          <div className="sidebar-brand">
            <span>Gallon Recipes</span>
          </div>
          <div className="sidebar-header">
            <div className="user-pic">
              <img className="img-responsive img-rounded" src={currentUser.image || "https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"} alt="User picture" />
            </div>
            <div className="user-info">
              <span >{currentUser.name}</span>
              <span className="user-role">{currentUser.userRole}</span>
              <span className="user-status">
                <span>Online</span>
              </span>
            </div>
          </div>

          <div className="sidebar-menu">
            <ul>
              <li>
                <div className={`d-flex align-items-center my-3 ${activeSection === 'recipes' ? 'active' : ''}`} onClick={() => setActiveSection('recipes')}>
                  <i className="material-icons ml-2">local_cafe</i>
                  <span className={`m-0 p-0 ml-3 ${activeSection === 'recipes' ? 'active' : ''}`} >Manage Recipes</span>
                </div>
              </li>
              <li>
                <div className={`d-flex align-items-center my-3 ${activeSection === 'ingredients' ? 'active' : ''}`} onClick={() => setActiveSection('ingredients')}>
                  <i className="material-icons ml-2">eco</i>
                  <span className={`m-0 p-0 ml-3 ${activeSection === 'ingredients' ? 'active' : ''}`} >Manage Ingredients</span>
                </div>
              </li>
              <li>
                <div className={`d-flex align-items-center my-3 ${activeSection === 'videos' ? 'active' : ''}`} onClick={() => setActiveSection('videos')}>
                  <i className="material-icons ml-2">voice_chat</i>
                  <span className={`m-0 p-0 ml-3 ${activeSection === 'videos' ? 'active' : ''}`} >Manage Videos</span>
                </div>
              </li>
              <li>
                <div className={`d-flex align-items-center my-3 ${activeSection === 'users' ? 'active' : ''}`} onClick={() => setActiveSection('users')}>
                  <i className="material-icons ml-2">supervisor_account</i>
                  <span className={`m-0 p-0 ml-3 ${activeSection === 'users' ? 'active' : ''}`} >Manage Users</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default SideBar
