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
    <div className="container">
      <div className="row bg-contact m-0">
        <div className="col-md-6 ml-auto p-0">
          <div className="login_wrapper p-5">
            <ul className="nav nav-tabs active" id="myTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active button" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link button" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Registration</a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <h1 className="pt-5">Welcome</h1>
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <p className="mb-4">Please login to your details</p>
                <div className="form-animate">
                  <form>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">User Name or Email</label>
                      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />

                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword1" placeholder="" />
                    </div>
                    <div className="form-group text-right d-flex align-items-center">
                      <a href="#" className="mr-auto forgot">Forgot password</a>
                      <button type="submit" className="btn btn-submit">Ok</button>
                    </div>
                  </form>
                  <button className="btn w-100 btn-default my-5"><i className="fa fa-facebook mr-4"></i> Login with Facebook</button>
                  <p className="text-center"><a href="#">Terms and Conditions</a> & <a href="#">Privacy Policy</a></p>
                </div>
              </div>
              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <p className="mb-4">Enter your details</p>
                <div className="form-animate">
                  <form>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail11">User Name</label>
                      <input type="text" className="form-control" id="exampleInputEmail11" aria-describedby="emailHelp" placeholder="" />

                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail12">Email</label>
                      <input type="email" className="form-control" id="exampleInputEmail12" aria-describedby="emailHelp" placeholder="" />

                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword13">Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword13" placeholder="" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword14">Confirm Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword14" placeholder="" />
                    </div>
                    <div className="form-group text-right">

                      <button type="submit" className="btn btn-submit">Ok</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
