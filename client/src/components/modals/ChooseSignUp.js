import React from 'react'
import { useDispatch } from 'react-redux'
import { showModal } from '../../actions/modalsActions';
import { Button } from 'react-bootstrap';


function ChooseSignUp(props) {
    //redux store state
    const dispatch = useDispatch();

    return (
        <div>
            <Button variant="primary" size="lg" className="w-100" onClick={() => dispatch(showModal('SIGNUP_MODAL', { title: 'Sign Up', dialogClassName: 'login-signup' }))}>
                Sign Up with Email
            </Button>
            <a href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77vndh3rm60v1w&redirect_uri=${process.env.REACT_APP_LINKEDIN_REDIRECT_LOGIN}&state=ebrahimsaed&scope=r_liteprofile%20r_emailaddress%20w_member_social`} className="btn btn-linkedin">
                <img src={require('../../images/login/linkedinin.svg')} alt="linkedin" className="img-fluid" />
                Sign Up with Linkedin
            </a>

            <p className="need-account">
                Already have an account?
                <span style={{ cursor: "pointer", textDecoration: 'underline' }}
                    onClick={() => dispatch(showModal('LOGIN_MODAL', { title: 'Log In', dialogClassName: 'login-signup' }))}>
                    Login
                </span>
            </p>
        </div>
    )
}

export default ChooseSignUp;
