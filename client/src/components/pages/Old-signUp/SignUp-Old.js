import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import history from '../../../history';
import _ from 'lodash';
import validator from 'validator';
import { emailSignup } from '../../../actions/userActions';
import Api from '../../../apis/Api';

const SignUp = () => {
  //redux store state
  const dispatch = useDispatch();
  //comp local state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const onNameChange = (e) => {
    const name = e.target.value;
    setFullName(name);

    if (!name) return setErrors({ ...errors, name: 'Please enter your Full Name' });
    if (errors.name) setErrors(_.omit(errors, 'name'));

  }
  const onEmailChange = (e) => {
    const userEmail = e.target.value;
    setEmail(userEmail);
    console.log(validator.isEmail(userEmail))

    if (!userEmail) return setErrors({ ...errors, email: 'Please enter your Email' });
    if (errors.email) setErrors(_.omit(errors, 'email'));

  }

  const onPasswordChange = (e) => {
    const pass = e.target.value;
    setPassword(pass);

    if (!pass) return setErrors({ ...errors, pass: 'Please enter your Password' });
    if (errors.password) setErrors(_.omit(errors, 'password'));
  }

  const onSignUpClick = async (e) => {
    e.preventDefault();
    let newErrors = {}
    if (!fullName) newErrors.name = 'Please enter your Full Name';
    if (!email) newErrors.email = 'Please enter your Email';
    if (!validator.isEmail(email)) newErrors.email = 'Please enter a valid email';
    if (!password) newErrors.password = 'Please enter your Password';
    if (password.length < 8) newErrors.password = 'password should be at least 8 characters';
    //checking if this email is previously regestered
    const response = await Api.post('/users/checkemail', { email });
    if (response.data.message === 'Email is Taken') newErrors.email = 'There is already an account associated with this email';

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors)
    setErrors({});

    const values = {
      name: fullName,
      email,
      password
    }

    dispatch(emailSignup(values))
    history.push('/confirm')
  }

  return (
    <div className="uk-grid-collapse" data-uk-grid>
      <div className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center" data-uk-height-viewport>
        <div className="uk-width-3-4@s">
          <div className="uk-text-center uk-margin-bottom">
            <a className="uk-logo uk-text-primary uk-text-bold" href="index.html">Gallon-Recipes</a>
          </div>
          <div className="uk-text-center uk-margin-medium-bottom">
            <h1 className="uk-h2 uk-letter-spacing-small">Create an Account</h1>
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
            <p className="uk-margin-remove">Or use your email for registration:</p>
          </div>

          <form className="uk-text-center">
            <div className="uk-width-1-1 uk-margin">
              <label className="uk-form-label" >Full name</label>
              <input id="name" className="uk-input uk-form-large uk-border-pill uk-text-center" type="text" placeholder="your name.." value={fullName} onChange={onNameChange} />
              {errors.name && <div className="error" style={{ color: 'red' }}>{errors.name}</div>}
            </div>

            <div className="uk-width-1-1 uk-margin">
              <label className="uk-form-label" >Email</label>
              <input id="email" className="uk-input uk-form-large uk-border-pill uk-text-center" type="email" placeholder="tom@company.com" value={email} onChange={onEmailChange} />
              {errors.email && <div className="error" style={{ color: 'red' }}>{errors.email}</div>}
            </div>

            <div className="uk-width-1-1 uk-margin">
              <label className="uk-form-label" >Password</label>
              <input id="password" className="uk-input uk-form-large uk-border-pill uk-text-center" type="password" placeholder="Min 8 characters" value={password} onChange={onPasswordChange} />
              {errors.password && <div className="error" style={{ color: 'red' }}>{errors.password}</div>}
            </div>

            <div className="uk-width-1-1 uk-text-center">
              <button className="uk-button uk-button-primary uk-button-large" onClick={onSignUpClick}>Sign Up</button>
            </div>

            <div className="uk-width-1-1 uk-margin uk-text-center">
              <p className="uk-text-small uk-margin-remove">By signing up you agree to our <a className="uk-link-border" href="/">terms</a> of service.</p>
            </div>
          </form>
        </div>
      </div>
      <div className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center uk-light" data-uk-height-viewport>
        <div className="uk-background-cover uk-background-norepeat uk-background-blend-overlay uk-background-overlay 
          uk-border-rounded-large uk-width-1-1 uk-height-xlarge uk-flex uk-flex-middle uk-flex-center"
          style={{ backGroundImage: `url(https://via.placeholder.com/600x600)` }}>
          <div className="uk-padding-large">
            <div className="uk-text-center">
              <h2 className="uk-letter-spacing-small">Welcome Back</h2>
            </div>
            <div className="uk-margin-top uk-margin-medium-bottom uk-text-center">
              <p>Already signed up, enter your details and start cooking your first meal today</p>
            </div>
            <div className="uk-width-1-1 uk-text-center">
              <span className="uk-button uk-button-primary uk-button-large" onClick={() => history.push('/signin')}>Sign In</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
