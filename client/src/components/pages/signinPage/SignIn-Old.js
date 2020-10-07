import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import history from '../../../history';
import Api from '../../../apis/Api';
import { emailLogin } from '../../../actions/userActions';

const SignIn = () => {
  //redux store state
  const dispatch = useDispatch();
  //comp local state
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
    <div className="uk-grid-collapse" data-uk-grid>
      <div className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center" data-uk-height-viewport>
        <div className="uk-width-3-4@s">
          <div className="uk-text-center uk-margin-bottom">
            <a className="uk-logo uk-text-primary uk-text-bold" href="index.html">Gallon-Recipes</a>
          </div>
          <div className="uk-text-center uk-margin-medium-bottom">
            <h1 className="uk-h2 uk-letter-spacing-small">Sign In</h1>
          </div>
          <div data-uk-grid className="uk-child-width-auto uk-grid-small uk-flex uk-flex-center uk-margin">
            <div>
              <a href="/" data-uk-icon="icon: facebook" className="uk-icon-button uk-icon-button-large facebook"></a>
            </div>
            <div>
              <a href="/" data-uk-icon="icon: google-plus" className="uk-icon-button uk-icon-button-large google-plus"></a>
            </div>
            <div>
              <a href="/" data-uk-icon="icon: linkedin" className="uk-icon-button uk-icon-button-large linkedin"></a>
            </div>
          </div>
          <div className="uk-text-center uk-margin">
            <p className="uk-margin-remove">Or use your email account:</p>
          </div>
          <form className="uk-text-center">

            <div className="uk-width-1-1 uk-margin">
              <label className="uk-form-label" >Email</label>
              <input id="email" className="uk-input uk-form-large uk-border-pill uk-text-center" type="email" placeholder="tom@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="uk-width-1-1 uk-margin">
              <label className="uk-form-label" >Password</label>
              <input id="password" className="uk-input uk-form-large uk-border-pill uk-text-center" type="password" placeholder="Min 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="uk-width-1-1 uk-margin uk-text-center">
              <a className="uk-text-small uk-link-muted" href="/">Forgot your password?</a>
            </div>

            <div className="uk-width-1-1 uk-text-center">
              <button className="uk-button uk-button-primary uk-button-large" onClick={onFormSubmit}>Sign In</button>
              {loginError && <div className="error" style={{ color: 'red' }}>{loginError}</div>}
            </div>

          </form>
        </div>
      </div>
      <div className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center uk-light" data-uk-height-viewport>
        <div className="uk-background-cover uk-background-norepeat uk-background-blend-overlay uk-background-overlay 
                  uk-border-rounded-large uk-width-1-1 uk-height-xlarge uk-flex uk-flex-middle uk-flex-center"
          style={{ backGroundImage: `url(https://via.placeholder.com/600x700)` }}>
          <div className="uk-padding-large">
            <div className="uk-text-center">
              <h2 className="uk-letter-spacing-small">Hello There, Join Us</h2>
            </div>
            <div className="uk-margin-top uk-margin-medium-bottom uk-text-center">
              <p>Enter your personal details and join the cooking community</p>
            </div>
            <div className="uk-width-1-1 uk-text-center">
              <span className="uk-button uk-button-primary uk-button-large" onClick={() => history.push('/signup')}>Sign Up</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
