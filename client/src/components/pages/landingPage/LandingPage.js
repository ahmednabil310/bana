import React from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../../../actions/modalsActions";
//imported comps
// import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../common/navigation/NavBar";

const LandingPage = () => {
  //redux store state
  const dispatch = useDispatch();

  return (
    <div>
      <NavBar />

      <div className="uk-container">
        <div
          className="uk-border-rounded-large uk-background-top-center uk-background-cover 
                    uk-background-norepeat uk-light uk-inline uk-overflow-hidden uk-width-1-1 landing-image"
        >
          <div className="uk-position-cover uk-header-overlay"></div>
          <div className="uk-position-relative" data-uk-grid>
            <div className="uk-width-1-2@m uk-flex uk-flex-middle">
              <div className="uk-padding-large uk-padding-remove-right">
                <h1 className="uk-heading-small uk-margin-remove-top text-dark-grey">
                  Choose from thousands of recipes
                </h1>
                <p className="text-dark-grey">
                  Appropriately integrate technically sound value with scalable
                  infomediaries negotiate sustainable strategic theme areas
                </p>
                <p
                  className="text-highliten pointer"
                  onClick={() =>
                    dispatch(
                      showModal("SIGNUP_MODAL", {
                        title: "Sign Up",
                        dialogClassName: "login-signup",
                      })
                    )
                  }
                >
                  Sign up today
                  <i
                    className="uk-margin-small-left text-dark-grey"
                    data-uk-icon="arrow-right"
                  ></i>
                </p>
              </div>
            </div>
            <div className="uk-width-expand@m"></div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="mt-5">
            <div className="icons-container">
              <img
                className="landing-icons"
                src={require("../../../images/landingPage/fileShare.jpg")}
                alt="file-share"
              />
            </div>
            <p className="text-underline text-highliten text-lg mt-3">
              Share Files
            </p>
            <p className="text-dark-grey text-lg mt-3 mb-0">
              Keep files and the messagesabout them
            </p>
            <p className="text-dark-grey text-lg m-0">together in channels.</p>
          </div>
          <div className="mt-5">
            <div className="icons-container">
              <img
                className="landing-icons"
                src={require("../../../images/landingPage/camera-icon.jpg")}
                alt="file-share"
              />
            </div>
            <p className="text-underline text-highliten text-lg mt-3">
              Connect on a call
            </p>
            <p className="text-dark-grey text-lg mt-3 mb-0">
              If working face to face is easier, go from
            </p>
            <p className="text-dark-grey text-lg m-0">
              channel to voice or video call in a click.
            </p>
          </div>
          <div className="mt-5">
            <div className="icons-container">
              <img
                className="landing-icons"
                src={require("../../../images/landingPage/cooperateParterners.jpg")}
                alt="file-share"
              />
            </div>
            <p className="text-underline text-highliten text-lg mt-3">
              Collaborate with parteners
            </p>
            <p className="text-dark-grey text-lg mt-3 mb-0">
              Work faster with external clients, vendors and
            </p>
            <p className="text-dark-grey text-lg m-0">
              more by working in a channel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
