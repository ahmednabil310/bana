import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateProfile } from '../../../actions/userActions';
import { Formik, Form, Field } from 'formik';
import { Form as bootStrapForm, InputGroup, Col, Button } from 'react-bootstrap';
import Api from '../../../apis/Api';
import { jobRoleOptions, companySizeOptions, getIndustryOptions, countryOptions, jobSeniorityOptions, statesOptions, getSubCategoryOptions } from '../../../configs/dropdownOptions';
import history from '../../../history';
import * as yup from 'yup';
//imported comps
import ImageUpload from '../common/ImageUpload/ImageUpload';

const schema = yup.object({
    name: yup.string().max(20).matches(/^[0-9a-zA-Z ]+$/, 'No special charachters').required('This is a required field'),
    jobTitle: yup.string().matches(/^[ A-Za-z0-9_.&',-/()]*$/, 'No special charachters').max(50),
    jobRole: yup.string(),
    companyName: yup.string().matches(/^[ A-Za-z0-9_.&',-/()]*$/, 'No special charachters').max(50),
    location: yup.string(),
    state: yup.string().matches(/^[ A-Za-z0-9_.&',-/()]*$/, 'No special charachters').max(20),
});

function EditProfileForm(props) {
    const [image, setImage] = useState(props.currentUser.image)
    const [updated, setUpdated] = useState(false)

    const onImageUploadClick = (newImage) => {
        setImage(newImage);
    }

    const renderTextField = ({ field, form, meta }, label, disabled) => {
        return (
            <bootStrapForm.Group >
                <bootStrapForm.Label>{label}</bootStrapForm.Label>
                <Col className="px-0" sm={12}>
                    <bootStrapForm.Control isInvalid={meta.error} {...field} type="text" placeholder={label} disabled={disabled} />
                    {meta.touched && meta.error && <div className="error" style={{ color: 'red' }}>{meta.error}</div>}
                </Col>
            </bootStrapForm.Group>
        )
    }

    const renderDropDown = ({ field, form, meta, checkHidden }, label, dropdownOptions) => {
        return (
            <bootStrapForm.Group controlId="formGrid">
                <bootStrapForm.Label>{label}</bootStrapForm.Label>
                <bootStrapForm.Control isInvalid={meta.touched && meta.error} as="select" {...field} type="select" placeholder={label}>
                    <option value="">{label}</option>
                    {dropdownOptions.map(el => <option key={el} value={el}>{el}</option>)}
                </bootStrapForm.Control>
                {meta.touched && meta.error && <span style={{ color: 'red' }}>{meta.error}</span>}
            </bootStrapForm.Group>
        )
    }

    return (
        <Formik
            validationSchema={schema}
            // validate={values => validate(values)}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
                let data = { ...values, image };
                data.expert = true;

                if (values.expertiseSummary && !values.primarySubCategory) return setErrors({ primarySubCategory: 'Required' });
                if (values.location === 'United States' && !values.state) return setErrors({ state: 'Required' });

                const response = await Api.post('/updateprofile', { $set: data }, {
                    headers: {
                        Authorization: `Bearer ${props.accessToken}`
                    }
                })
                props.updateProfile(response.data)
                setUpdated(true)
            }}
            initialValues={{
                name: props.currentUser.name,
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
                    <Form autoComplete="off">
                        <div className="container edit-profile">
                            <div className="row">
                                <div className="col-md-3 pl-4 mt-3" align="center">
                                    <div className="img-upload">
                                        <div className="img-upload-wrapper">
                                            <img className="mx-auto" src={image} alt="HH" />
                                            {props.currentUser.signupMethod === 'email' && <ImageUpload onImageUploadClick={onImageUploadClick} alertContainer="oc-alert-container" />}
                                        </div>
                                        {/* For Alert box*/}
                                        <div id="oc-alert-container"></div>
                                        {props.currentUser.signupMethod === 'email' && <p className="mt-2 text-xs">Upload Image (Max 1MB)</p>}
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="block-card mt-3">
                                        <div className="block-card-header">
                                            <h3>General Profile</h3>
                                        </div>

                                        <div className="block-card-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Field name="name">
                                                        {({ field, form, meta }) => renderTextField({ field, form, meta }, 'Name')}
                                                    </Field>
                                                </div>
                                                <div className="col-md-6">
                                                    <Field name="jobTitle">
                                                        {({ field, form, meta }) => renderTextField({ field, form, meta }, 'Job Title')}
                                                    </Field>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Field name="jobRole">
                                                        {({ field, form, meta }) => renderTextField({ field, form, meta }, 'Job Role')}
                                                    </Field>
                                                </div>
                                                <div className="col-md-6">
                                                    <Field name="companyName">
                                                        {({ field, form, meta }) => renderTextField({ field, form, meta }, 'Company Name')}
                                                    </Field>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Field name="location">
                                                        {({ field, form, meta }) => renderDropDown({ field, form, meta }, 'Location', countryOptions())}
                                                    </Field>
                                                </div>
                                                {values.location === 'United States' && <div className="col-md-6">
                                                    <Field name="state">
                                                        {({ field, form, meta }) => renderDropDown({ field, form, meta }, 'State', statesOptions())}
                                                    </Field>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className={`text-center mt-3 ${updated && isValid ? null : 'd-none'}`} style={{ color: 'green' }} >Profile Updated</h3>
                                    <h3 className={`text-center mt-3 ${isValid ? 'd-none' : null}`} style={{ color: 'red' }} >Please fill in the required fields</h3>

                                    <div className="d-flex justify-content-center py-3">
                                        <Button disabled={isSubmitting} size="lg" variant="outline-primary" className="mr-3" onClick={() => history.goBack()}>Cancel</Button>
                                        <Button disabled={isSubmitting} type="submit" size="lg">Save</Button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </Form>
                )}
        </Formik>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        accessToken: state.accessToken
    }
}

export default connect(mapStateToProps, { updateProfile })(EditProfileForm);
