import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { activatedUser } from '../../../actions/userActions';
import { Spinner, Button } from 'react-bootstrap';
import Api from '../../../apis/Api';
//imported comps
import NavBar from '../common/navigation/NavBar';

function AccountActivation(props) {
    //redux store state
    const dispatch = useDispatch();
    //comp. local state
    const [name, setName] = useState('');

    const getData = async () => {
        const token = props.location.search.replace('?token=', '');
        if (token) {
            const response = await Api.post('/activateaccount', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.user) {
                setName(response.data.user.name);
                dispatch(activatedUser(response.data));
            }
        }
    }

    useEffect(getData, [])

    const renderContent = () => {
        return (
            <div>
                <NavBar />
                <div className="app-content">
                    <div className="row justify-content-center">
                        <div className="col-6 card-custom py-3">
                            <div className="row px-4 align-items-center">
                                <div className="col-md-8 profile-name">
                                    <h2>Welcome</h2>
                                    <p>{name}</p>
                                </div>
                            </div>
                            <h4 className="my-4 px-4">Your account has been activated successfully. You can now access the website</h4>
                            <Button href="/" className="ml-4" variant="primary">Access Website</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderSpinner = () => {
        return (
            <div className="row justify-content-center">
                <Spinner className="mx-auto" animation="border" />
            </div>
        )
    }

    return (
        <div className="grid" style={{ marginTop: '30px' }}>
            {name ? renderContent() : renderSpinner()}
        </div>
    )
}

export default AccountActivation
