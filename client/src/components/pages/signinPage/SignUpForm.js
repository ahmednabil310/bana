import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import history from '../../../history';
import _ from 'lodash';
import validator from 'validator';
import { emailSignup } from '../../../actions/userActions';
import Api from '../../../apis/Api';

const SignUpForm = ({ activeTab, setActiveTabe }) => {
  //redux store state
  const dispatch = useDispatch();
  //comp local state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypedPassword, setRetypedPassword] = useState('');
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
    if (password.localeCompare(retypedPassword) !== 0) newErrors.retypedPassword = 'Passwords not match';
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

    console.log(values);

    dispatch(emailSignup(values))
    history.push('/confirm')
  }

  return (
    <div className={`tab-pane fade ${activeTab !== 'login' ? 'active show' : ''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
      <p className="mb-4">Enter your details</p>
      <div className="form-animate">
        <div>
          <div className="form-group">
            <div className="d-flex">
              <label htmlFor="exampleInputEmail11">Your Full Name</label>
              {errors.name && <div className="error ml-2" style={{ color: 'red' }}>{errors.name}</div>}
            </div>
            <input type="text" className="form-control" id="exampleInputEmail11" aria-describedby="emailHelp" placeholder="" value={fullName} onChange={onNameChange} />
          </div>

          <div className="form-group">
            <div className="d-flex">
              <label htmlFor="exampleInputEmail12">Email</label>
              {errors.email && <div className="error ml-2" style={{ color: 'red' }}>{errors.email}</div>}
            </div>
            <input type="email" className="form-control" id="exampleInputEmail12" aria-describedby="emailHelp" placeholder="" value={email} onChange={onEmailChange} />
          </div>

          <div className="form-group">
            <div className="d-flex">
              <label htmlFor="exampleInputPassword13">Password</label>
              {errors.password && <div className="error ml-2" style={{ color: 'red' }}>{errors.password}</div>}
            </div>
            <input type="password" className="form-control" id="exampleInputPassword13" placeholder="" value={password} onChange={onPasswordChange} />
          </div>

          <div className="form-group">
            <div className="d-flex">
              <label htmlFor="exampleInputPassword14">Confirm Password</label>
              {errors.retypedPassword && <div className="error ml-2" style={{ color: 'red' }}>{errors.retypedPassword}</div>}
            </div>
            <input type="password" className="form-control" id="exampleInputPassword14" placeholder="" value={retypedPassword} onChange={e => setRetypedPassword(e.target.value)} />
          </div>


          <div className="form-group text-right">
            <button type="submit" className="btn btn-submit" onClick={onSignUpClick}>Ok</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
