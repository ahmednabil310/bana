import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Api from '../../../apis/Api';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
//imported comps
import NavBar from '../common/navigation/NavBar';
import RecipesList from '../findRecipesPage/RecipesList';
import SearchByIngredients from '../common/SearchByIngredients/SearchByIngredients';
import Pagination from '../common/pagination/Pagination';
import Name from './Name';
import ProfileImage from './ProfileImage';
import CoverImage from './CoverImage';
import VideoSection from './VideoSection';

const ProfilePage = () => {
  //redux store state
  const currentUser = useSelector(state => state.currentUser);
  const accessToken = useSelector(state => state.accessToken);
  //comp local state
  const [recipeCount, setRecipeCount] = useState('');
  const [userRecipes, setUserRecipes] = useState([]);
  const [filters, setFilters] = useState({ owner: currentUser._id })
  const [exact, setExact] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  //for uploading indicators
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState({})

  //effect to get the total recipes count for the current user
  const getRecipiesCount = async () => {
    const response = await Api.get('/recipecount', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
    setRecipeCount(response.data.count)
  }

  //effect to get the uploaded recipes for the current user
  const getUserRecipies = async () => {
    const response = await Api.post('/getrecipes', { filters, page, exact }, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })

    if (response.data.length > 0) {
      setUserRecipes(response.data[0].paginatedResults);
      if (response.data[0] && response.data[0].totalCount[0]) setTotalCount(response.data[0].totalCount[0].count);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  useEffect(() => {
    getRecipiesCount();
  }, [])

  useEffect(() => {
    getUserRecipies();
  }, [filters, page])

  const onValuesChange = (values, exact) => {
    setPage(1);
    if (values.length > 0) {
      const ingredients = values.map(el => el.name)
      setFilters({ ...filters, ingredients });
      setExact(exact);
    } else {
      if (filters.ingredients) {
        setFilters(_.omit(filters, 'ingredients'));
        setExact(false);
      }
    }
  }

  const onDifficultyClick = (value) => {
    setPage(1);
    setFilters({ ...filters, difficulty: value })
  }

  const onStrengthClick = (value) => {
    setPage(1);
    setFilters({ ...filters, strength: value })
  }

  const onImageUploadClick = (newImage) => {
    setUploading(false);
    console.log(newImage)
  }

  return (
    <div>
      <NavBar />

      <div className="uk-container profile-container">
        <CoverImage />
        <div className="profile-image-container d-flex">
          <ProfileImage />
          <div className="align-self-end ml-2">
            <Name />
            <p className="m-0 p-0">{currentUser.email}</p>
            <p className="m-0 p-0 mt-2 text-md text-highliten">Total recipes: {recipeCount}</p>
          </div>
        </div>
        {/* <div className="fb-profile">
          <img align="left" className="fb-image-lg" src={require("../../../images/profile 2.jpg")} alt="Profile image example" />
          <img align="left" className="fb-image-profile thumbnail" src={currentUser.image} alt="Profile image example" />

          <div className="fb-profile-text">
            <Name />
            <p className="m-0 p-0">{currentUser.email}</p>
            {recipeCount && <p className="m-0 p-0 mt-2 text-md text-highliten">Total recipes: {recipeCount}</p>}
          </div>
          <span className="material-icons edit-profile-image">create</span>
        </div> */}
      </div>

      <div className="uk-section uk-section-default">
        <div className="uk-container">
          <div data-uk-grid>
            <div className="uk-width-1-4@m sticky-container">
              <div data-uk-sticky="offset: 100; bottom: true; media: @m;">
                <h2>My  Recipes</h2>
                <ul className="uk-nav-default uk-nav-parent-icon uk-nav-filter uk-margin-medium-top" data-uk-nav>
                  <li className="uk-parent">
                    <a href="#">Difficulty</a>
                    <ul className="uk-nav-sub">
                      <li><span className={`pointer ${filters.difficulty && filters.difficulty === 1 ? 'text-orange' : ''}`} onClick={() => onDifficultyClick(1)}>Easy</span></li>
                      <li><span className={`pointer ${filters.difficulty && filters.difficulty === 2 ? 'text-orange' : ''}`} onClick={() => onDifficultyClick(2)}>Medium</span></li>
                      <li><span className={`pointer ${filters.difficulty && filters.difficulty === 3 ? 'text-orange' : ''}`} onClick={() => onDifficultyClick(3)}>Hard</span></li>
                    </ul>
                  </li>
                  <li className="uk-parent">
                    <a href="#">Strength</a>
                    <ul className="uk-nav-sub">
                      <li><span className={`pointer ${filters.strength && filters.strength === 1 ? 'text-orange' : ''}`} onClick={() => onStrengthClick(1)}>Non-Alcoholic</span></li>
                      <li><span className={`pointer ${filters.strength && filters.strength === 2 ? 'text-orange' : ''}`} onClick={() => onStrengthClick(2)}>Weak</span></li>
                      <li><span className={`pointer ${filters.strength && filters.strength === 3 ? 'text-orange' : ''}`} onClick={() => onStrengthClick(3)}>Medium</span></li>
                      <li><span className={`pointer ${filters.strength && filters.strength === 4 ? 'text-orange' : ''}`} onClick={() => onStrengthClick(4)}>Strong</span></li>
                    </ul>
                  </li>

                </ul>
                <div className="d-flex mt-1 align-items-center justify-content-between">
                  {filters.difficulty && <Button className=" d-flex align-items-center text-xs p-0 m-0 px-1" variant="outline-secondary" size="sm" onClick={() => setFilters(_.omit(filters, 'difficulty'))}>Difficulty: {getDifficulty(filters.difficulty)} <span className="material-icons ml-1 text-md">clear</span></Button>}
                  {filters.strength && <Button className=" d-flex align-items-center text-xs p-0 m-0 px-1" variant="outline-secondary" size="sm" onClick={() => setFilters(_.omit(filters, 'strength'))}>Strength: {getStrength(filters.strength)} <span className="material-icons ml-1 text-md">clear</span></Button>}
                </div>
              </div>
            </div>

            <div className="uk-width-expand@m">
              <SearchByIngredients inputSize={7} labelSize={3} onValuesChange={onValuesChange} />

              <RecipesList recipes={userRecipes} getUserRecipies={getUserRecipies} />
              {totalCount > 12 && <Pagination totalPages={Math.ceil(totalCount / 12)} page={page} setPage={setPage} />}

            </div>
          </div>

          <VideoSection />

        </div>
      </div>


      {/* <div className="uk-section uk-section-default">
        <div className="uk-container">
          <div data-uk-grid>
            {userRecipes.length > 0 && <RecipesList recipes={userRecipes} />}
          </div>
        </div>
      </div> */}

    </div>
  )
}

const getDifficulty = (number) => {
  if (number === 1) return 'Easy';
  if (number === 2) return 'Medium';
  if (number === 3) return 'Hard';
}

const getStrength = (number) => {
  if (number === 1) return 'Non-Alcoholic';
  if (number === 2) return 'Weak';
  if (number === 3) return 'Medium';
  if (number === 4) return 'Strong';
}


export default ProfilePage
