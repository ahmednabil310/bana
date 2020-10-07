import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../../actions/modalsActions';
import { Formik, Form, Field } from 'formik';
import { Form as bootStrapForm, Col, Button, Row } from 'react-bootstrap';
import Api from '../../apis/Api';
import * as yup from 'yup';

const schema = yup.object({
    firstName: yup.string().max(20).matches(/^[0-9a-zA-Z ]+$/, 'No special charachters').required('This is a required field'),
    lastName: yup.string().max(20).matches(/^[0-9a-zA-Z ]+$/, 'No special charachters').required('This is a required field'),
    email: yup.string().max(50).matches(/^[ A-Za-z0-9_.@&',-/()]*$/, 'Only Emails are Allowed').email().required('This is a required field'),
    password: yup.string().max(20).required('This is a required field')
});

function SignupBasicInfo({ onBasicInfoSubmit }) {
    //redux store state
    const dispatch = useDispatch();

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
            onSubmit={async (values, { setErrors }) => {
                const response = await Api.post('/users/checkemail', { email: values.email });
                if (response.data.message === 'Email is Taken') setErrors({ email: 'There is already an account associated with this email' })
                else onBasicInfoSubmit(values);
            }}
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
                validateField,
                isSubmitting
            }) => (
                    <Form autoComplete="off" className="px-3">

                        <Row>
                            <Col md={6} className="pr-md-2">
                                <Field name="firstName">
                                    {({ field, form, meta }) => renderTextField({ field, form, meta }, 'First Name*')}
                                </Field>
                            </Col>
                            <Col md={6} className="pl-md-2">
                                <Field name="lastName">
                                    {({ field, form, meta }) => renderTextField({ field, form, meta }, 'Last Name*')}
                                </Field>
                            </Col>
                        </Row>


                        <Field name="email">
                            {({ field, form, meta }) => renderTextField({ field, form, meta }, 'Email*')}
                        </Field>
                        <Field name="password">
                            {({ field, form, meta }) => renderPasswordField({ field, form, meta }, 'Password')}
                        </Field>

                        <div className="py-4">
                            {/* {error && <strong>{error}</strong>} */}
                            <Button variant="primary" size="lg" className="w-100" type="submit">
                                Continue
                            </Button>

                            <p className="need-account">
                                Already have an account?
                                <span style={{ cursor: "pointer", textDecoration: 'underline' }}
                                    onClick={() => dispatch(showModal('LOGIN_MODAL', { title: 'Log In', dialogClassName: 'login-signup' }))}>
                                    Login
                                </span>
                            </p>
                        </div>

                    </Form>
                )}
        </Formik>
    );
}

export default SignupBasicInfo;
