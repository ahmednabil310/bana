import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideModal, showModal } from '../../actions/modalsActions';
import { emailLogin } from '../../actions/userActions';
import { Formik, Form, Field } from 'formik';
import { Form as bootStrapForm, Button } from 'react-bootstrap';
import * as yup from 'yup';

const schema = yup.object({
    email: yup.string().max(50).matches(/^[ A-Za-z0-9_.@&',-/()]*$/, 'Only Emails are Allowed').email().required('This is a required field'),
    password: yup.string().max(20).required('This is a required field')
});

function SignupBasicInfo(props) {
    //redux store state
    const dispatch = useDispatch();
    //comp. local state
    const [loginError, setLoginError] = useState('')

    const renderTextField = ({ field, form, meta, checkHidden }, label) => {
        return (
            <bootStrapForm.Group>
                {/* <bootStrapForm.Label>{label}</bootStrapForm.Label> */}
                <bootStrapForm.Control isInvalid={meta.touched && meta.error} {...field} type="text" placeholder={label} />
                {meta.touched && meta.error && <div className="error" style={{ color: 'red' }}>{meta.error}</div>}
            </bootStrapForm.Group>
        )
    }

    const renderPasswordField = ({ field, form, meta, checkHidden }, label) => {
        return (
            <bootStrapForm.Group>
                {/* <bootStrapForm.Label>{label}</bootStrapForm.Label> */}
                <bootStrapForm.Control isInvalid={meta.touched && meta.error} {...field} type="password" placeholder={label} />
                {meta.touched && meta.error && <div className="error" style={{ color: 'red' }}>{meta.error}</div>}
            </bootStrapForm.Group>
        )
    }

    return (
        <Formik
            validationSchema={schema}
            // validate={values => validate(values)}
            onSubmit={async (values, { setErrors }) => {
                try {
                    const response = await dispatch(emailLogin(values));

                    if (response === 'Unable to Login') {
                        //here user has entered wrong login data
                        setLoginError('No user with this data')
                    } else if (response === 'Please activate your account') {
                        //here user has entered correct login data but he have not activated his account.
                        setLoginError('Please go to your mail to activate your account')
                    } else dispatch(hideModal());

                } catch (error) {
                    console.log(error.message)
                }
            }}
            initialValues={{
                email: '',
                password: '',
            }}
        >
            {(
                // {
                // handleSubmit,
                // handleChange,
                // handleBlur,
                // values,
                // touched,
                // isValid,
                // errors,
                // validateField,
                // isSubmitting,
                // reset
                // }
            ) => (
                    <Form autoComplete="off" className="px-3">


                        <Field name="email">
                            {({ field, form, meta }) => renderTextField({ field, form, meta }, 'Email*')}
                        </Field>
                        <Field name="password">
                            {({ field, form, meta }) => renderPasswordField({ field, form, meta }, 'Password')}
                        </Field>
                        <div className="d-flex justify-content-end px-md-5 pb-3">
                            <a href="/" className="forgot-password">Forgot password?</a>
                        </div>

                        <div className="px-md-5 pt-4">
                            {loginError && <strong style={{ color: 'red' }}>{loginError}</strong>}
                            <Button variant="primary" size="lg" className="w-100" type="submit">
                                Log In
                            </Button>
                            <a href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77vndh3rm60v1w&redirect_uri=${process.env.REACT_APP_LINKEDIN_REDIRECT_LOGIN}&state=ebrahimsaed&scope=r_liteprofile%20r_emailaddress%20w_member_social`} className="btn btn-linkedin">
                                <img src={require('../../images/login/linkedinin.svg')} alt="linkedin" className="img-fluid" />
                            Login with Linkedin
                            </a>

                            <p className="need-account">
                                Need Trukno account?
                                <span style={{ cursor: "pointer", textDecoration: 'underline' }}
                                    onClick={() => dispatch(showModal('SIGNUP_CHOOSE_MODAL', { title: 'Sign Up', dialogClassName: 'login-signup' }))}>
                                    Create an account
                                </span>
                            </p>

                        </div>

                    </Form>
                )}
        </Formik>
    );
}

export default SignupBasicInfo;