import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import history from '../../../history';
import { emailLogin } from '../../../actions/userActions';
//imported comps
import SignUpForm from './SignUpForm';

const SignIn = () => {
  //redux store state
  const dispatch = useDispatch();
  //comp local state
  const path = history.location.pathname;
  const [activeTab, setActiveTabe] = useState(path === '/signin' ? 'login' : 'register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return setLoginError('Please provide your email & password')
    const values = { email, password }

    try {
      const response = await dispatch(emailLogin(values));

      if (response === 'Unable to Login') {
        //here user has entered wrong login data
        setLoginError('No user with this data')
      } else if (response === 'Please activate your account') {
        //here user has entered correct login data but he have not activated his account.
        setLoginError('Please go to your mail to activate your account')
      } else history.push('/');

    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <div className="container w-75">
      <div className="row bg-contact m-0">
        <div className="col-md-6 ml-auto p-0">
          <div className="login_wrapper p-5">
            <ul className={`nav nav-tabs ${activeTab === 'login' ? 'active' : ''}`} id="myTab" role="tablist">
              <li className="nav-item">
                <a className={`nav-link ${activeTab === 'login' ? 'button active show' : 'button'}`} id="home-tab" data-toggle="tab" role="tab" aria-controls="home" aria-selected={activeTab === 'login' ? true : false} onClick={() => history.push('/signin')}>Login</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeTab !== 'login' ? 'button active show' : 'button'}`} id="profile-tab" data-toggle="tab" role="tab" aria-controls="profile" aria-selected={activeTab === 'login' ? false : true} onClick={() => history.push('/signup')}>Registration</a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <h1 className="pt-5 text-light">Welcome</h1>
              <div className={`tab-pane fade ${activeTab === 'login' ? 'active show' : ''}`} id="home" role="tabpanel" aria-labelledby="home-tab">
                <p className="mb-4">Please login to your details</p>
                <div className="form-animate">
                  <div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email</label>
                      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" value={email} onChange={e => setEmail(e.target.value)} />

                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword1" placeholder="" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group text-right d-flex align-items-center">
                      <a href="#" className="mr-auto forgot">Forgot password</a>
                      <button className="btn btn-submit" onClick={onFormSubmit}>Ok</button>
                    </div>
                    {loginError && <div className="error" style={{ color: 'red' }}>{loginError}</div>}
                  </div>
                  {/* <button className="btn w-100 btn-default my-5"><i className="fa fa-facebook mr-4"></i> Login with Facebook</button> */}
                  <button className="btn w-100 btn-default my-5 d-flex align-items-center text-center justify-content-center">
                    <span className="material-icons mr-3 text-orange" style={{ fontSize: '30px' }}>facebook</span>
                    <span>Login with Facebook</span>
                  </button>
                  <p className="text-center"><a href="#">Terms and Conditions</a> & <a href="#">Privacy Policy</a></p>
                </div>
              </div>
              <SignUpForm activeTab={activeTab} setActiveTabe={setActiveTabe} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
