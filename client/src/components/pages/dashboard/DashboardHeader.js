import React from 'react';
import { Button } from 'react-bootstrap';
import history from '../../../history';

const DashboardHeader = () => {
  return (
    <div className="dashboard-header p-2 " >
      {/* <a className="uk-logo m-0 p-0" href="index.html">Gallon-Recipes</a> */}


      < Button className="m-0" variant="light" onClick={() => history.push('/')}>
        <div className="d-flex align-items-center">
          <span className="material-icons text-md">arrow_back_ios</span><span>Home</span>
        </div >
      </Button >

    </div >
  )
}

export default DashboardHeader
