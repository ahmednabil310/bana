import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import SignupBasicInfo from "./SignupBasicInfo";
import { emailSignup } from "../../actions/userActions";
import { hideModal } from "../../actions/modalsActions";

// import "../../css/main.scss";
const SignupForm = () => {
  //redux store state
  const dispatch = useDispatch();
  //comp. local state
  const [activeForm, setActiveForm] = useState("LoginDetails");

  const onBasicInfoSubmit = (values) => {
    dispatch(emailSignup(values));
    setActiveForm("confirm");
  };

  return (
    <Tabs
      defaultActiveKey={activeForm}
      activeKey={activeForm}
      id="uncontrolled-tab-example"
      className="px-md-4"
      onSelect={(key) => {
        setActiveForm(key);
      }}
    >
      <Tab eventKey="LoginDetails" title="Details" className="px-md-4">
        <SignupBasicInfo onBasicInfoSubmit={onBasicInfoSubmit} />
      </Tab>

      <Tab eventKey="confirm" title="Confirm" className="px-md-4" disabled>
        <div className="row justify-content-center">
          <div className="col card-custom py-3">
            <h5 className="my-4 px-4">
              Your account has been created successfully. Please go to your mail
              and follow the activation link.
            </h5>
            <Button variant="primary" onClick={() => dispatch(hideModal())}>
              Close
            </Button>
          </div>
        </div>
      </Tab>
    </Tabs>
  );
};

export default SignupForm;
