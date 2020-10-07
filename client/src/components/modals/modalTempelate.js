import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/modalsActions';

//imported comps
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ChooseSignUp from './ChooseSignUp';

export class ModalTemplate extends Component {

    renderContent() {
        const { modalType } = this.props

        switch (modalType.modalType) {
            case 'LOGIN_MODAL':
                return <LoginForm />
            case 'SIGNUP_CHOOSE_MODAL':
                return <ChooseSignUp />
            case 'SIGNUP_MODAL':
                return <SignupForm />
            default:
                return null
        }
    }

    render() {
        return (
            <Modal
                show={this.props.modalVisible}
                onHide={() => this.props.hideModal()}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="login"
                dialogClassName={this.props.modalType.modalProps.dialogClassName}
                backdrop="static"
            >
                <Modal.Header closeButton className="p-0">
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.modalType.modalProps.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.renderContent()}
                </Modal.Body>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return { modalType: state.modalType, modalVisible: state.modalVisible }
}

export default connect(mapStateToProps, { hideModal })(ModalTemplate)
