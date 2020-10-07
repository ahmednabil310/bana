import React from "react";
import { useSelector } from "react-redux";
import history from "../history";
import { connect } from "react-redux";
import { Router, Route } from "react-router-dom";

//importing components and css (local files)
import Header from "./pages/common/Header/Header";
import HomePage from "./pages/homePage/HomePage";
import LandingPage from "./pages/landingPage/LandingPage";
import FindRecipesPage from "./pages/findRecipesPage/FindRecipesPage";
import RecipePage from "./pages/recipePage/RecipePage";
import SearchPage from "./pages/searchPage/SearchPage";
import ContactUs from "./pages/contact/ContactUs";
import SubmitRecipe from "./pages/submitRecipe/SubmitRecipe";
import SignIn from "./pages/signinPage/SignIn";
import Confirm from "./pages/signinPage/Confirm";
import AccountActivation from "./pages/activateAccount/AccountActivation";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ImageCropper from "./pages/common/ImageCropper/ImageCropper";
import Modal from "./modals/modalTempelate";
import Dashboard from "./pages/dashboard/Dashboard";
import NewPage from "./pages/new/newPage";

import "../css/main.scss";

import Body from "../ahmed/components/Body";

const App = (props) => {
  //redux store state
  const currentUser = useSelector((state) => state.currentUser);

  //to make pages scroll to top with every navigation
  history.listen((_) => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      {/* <Header /> */}

      <Router history={history}>
        <div>
          <Modal />
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" exact component={HomePage} />
          <Route path="/newpage" exact component={NewPage} />
          <Route path="/landingpage" exact component={LandingPage} />
          <Route path="/recipes" component={FindRecipesPage} />
          <Route path="/recipe/:id" component={RecipePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/contact" component={ContactUs} />
          <Route
            path="/submit"
            component={props.currentUser._id ? SubmitRecipe : SignIn}
          />
          <Route path="/confirm" component={Confirm} />
          <Route path="/activation" component={AccountActivation} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignIn} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/crop" component={ImageCropper} />
          <Route
            path="/dashboard"
            component={
              currentUser.userRole === "admin" ? Dashboard : LandingPage
            }
          />
        </div>
        <Route path="/ahmed" component={Body} />;
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    uniqueId: state.uniqueId,
  };
};

export default connect(mapStateToProps)(App);
