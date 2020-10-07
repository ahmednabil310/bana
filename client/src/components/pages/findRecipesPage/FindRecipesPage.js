import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Api from '../../../apis/Api';
import _ from 'lodash';
//imported comps
import Footer from '../common/footer/Footer';
import RecipesList from './RecipesList';
import NavBar from '../common/navigation/NavBar';
import SearchByIngredients from '../common/SearchByIngredients/SearchByIngredients';
import Pagination from '../common/pagination/Pagination';
import VideosSection from '../common/VideosSection/VideosSection';

const FindRecipesPage = () => {
  const [recipes, setRecipes] = useState([])
  const [filters, setFilters] = useState({})
  const [exact, setExact] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const getrecipes = async () => {
    const response = await Api.post('/getrecipes', { filters, page, exact, approvalArray: ['approved'] });

    if (response.data.length > 0) {
      setRecipes(response.data[0].paginatedResults);
      if (response.data[0] && response.data[0].totalCount[0]) setTotalCount(response.data[0].totalCount[0].count);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  useEffect(() => {
    getrecipes();
  }, [filters, page, exact])

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

  return (
    <div>
      <NavBar />
      <div className="uk-container">
        <div className="uk-border-rounded-large uk-background-top-center uk-background-cover uk-background-norepeat uk-light uk-inline uk-overflow-hidden uk-width-1-1 landing-image">
          <div className="uk-position-cover uk-header-overlay"></div>
          <div className="uk-position-relative" data-uk-grid>
            <div className="uk-width-1-2@m uk-flex uk-flex-middle">
              <div className="uk-padding-large uk-padding-remove-right">
                <h1 className="uk-heading-small uk-margin-remove-top">Choose from thousands of recipes</h1>
                <p className="uk-text-secondary">Appropriately integrate technically sound value with scalable infomediaries
                negotiate sustainable strategic theme areas</p>
                <a className="uk-text-secondary uk-text-600 uk-text-small hvr-forward" href="sign-up.html">Sign up today<span
                  className="uk-margin-small-left" data-uk-icon="arrow-right"></span></a>
              </div>
            </div>
            <div className="uk-width-expand@m">
            </div>
          </div>
        </div>
      </div>

      <div className="uk-section uk-section-default">
        <div className="uk-container">
          <div data-uk-grid>
            <div className="uk-width-1-4@m sticky-container">
              <div data-uk-sticky="offset: 100; bottom: true; media: @m;">
                <h2>Recipes</h2>
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

              <RecipesList recipes={recipes} />
              {totalCount > 12 && <Pagination totalPages={Math.ceil(totalCount / 12)} page={page} setPage={setPage} />}

            </div>

          </div>
        </div>
      </div>

      <VideosSection />

      {/* <div className="uk-section uk-section-default">
        <div className="uk-container">
          <div data-uk-grid>
            <div className="uk-width-expand">
              <h2>Videos</h2>
            </div>
            <div className="uk-width-1-3 uk-text-right uk-light">
              <select className="uk-select uk-select-light uk-width-auto uk-border-pill uk-select-primary">
                <option>Featured</option>
                <option>Top Rated</option>
                <option>Trending</option>
              </select>
            </div>
          </div>
          <div className="uk-child-width-1-2 uk-child-width-1-4@s" data-uk-grid>
            <div>
              <div className="uk-card uk-card-video">
                <div className="uk-inline uk-light">
                  <img className="uk-border-rounded-large" src="https://via.placeholder.com/300x400" alt="Course Title" />
                  <div className="uk-position-cover uk-card-overlay uk-border-rounded-large"></div>
                  <div className="uk-position-center">
                    <span data-uk-icon="icon: play-circle; ratio: 3.4"></span>
                  </div>
                  <div className="uk-position-small uk-position-bottom-left">
                    <h5 className="uk-margin-small-bottom">Business Presentation Course</h5>
                    <div className="uk-text-xsmall">by Thomas Haller</div>
                  </div>
                </div>
                <a href="recipe.html" className="uk-position-cover"></a>
              </div>
            </div>
            <div>
              <div className="uk-card uk-card-video">
                <div className="uk-inline uk-light">
                  <img className="uk-border-rounded-large" src="https://via.placeholder.com/300x400" alt="Course Title" />
                  <div className="uk-position-cover uk-card-overlay uk-border-rounded-large"></div>
                  <div className="uk-position-center">
                    <span data-uk-icon="icon: play-circle; ratio: 3.4"></span>
                  </div>
                  <div className="uk-position-small uk-position-bottom-left">
                    <h5 className="uk-margin-small-bottom">Business Presentation Course</h5>
                    <div className="uk-text-xsmall">by Thomas Haller</div>
                  </div>
                </div>
                <a href="recipe.html" className="uk-position-cover"></a>
              </div>
            </div>
            <div>
              <div className="uk-card uk-card-video">
                <div className="uk-inline uk-light">
                  <img className="uk-border-rounded-large" src="https://via.placeholder.com/300x400" alt="Course Title" />
                  <div className="uk-position-cover uk-card-overlay uk-border-rounded-large"></div>
                  <div className="uk-position-center">
                    <span data-uk-icon="icon: play-circle; ratio: 3.4"></span>
                  </div>
                  <div className="uk-position-small uk-position-bottom-left">
                    <h5 className="uk-margin-small-bottom">Business Presentation Course</h5>
                    <div className="uk-text-xsmall">by Thomas Haller</div>
                  </div>
                </div>
                <a href="recipe.html" className="uk-position-cover"></a>
              </div>
            </div>
            <div>
              <div className="uk-card uk-card-video">
                <div className="uk-inline uk-light">
                  <img className="uk-border-rounded-large" src="https://via.placeholder.com/300x400" alt="Course Title" />
                  <div className="uk-position-cover uk-card-overlay uk-border-rounded-large"></div>
                  <div className="uk-position-center">
                    <span data-uk-icon="icon: play-circle; ratio: 3.4"></span>
                  </div>
                  <div className="uk-position-small uk-position-bottom-left">
                    <h5 className="uk-margin-small-bottom">Business Presentation Course</h5>
                    <div className="uk-text-xsmall">by Thomas Haller</div>
                  </div>
                </div>
                <a href="recipe.html" className="uk-position-cover"></a>
              </div>
            </div>

          </div>
        </div>
      </div> */}

      <div className="uk-container">
        <div className="uk-background-primary uk-border-rounded-large uk-light">
          <div className="uk-width-3-4@m uk-margin-auto uk-padding-large">
            <div className="uk-text-center">
              <h2 className="uk-h2 uk-margin-remove">Be the first to know about the latest deals, receive new trending recipes
            &amp; more!</h2>
            </div>
            <div className="uk-margin-medium-top">
              <div data-uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
                <form>
                  <div className="uk-grid-small" data-uk-grid>
                    <div className="uk-width-1-1 uk-width-expand@s uk-first-column">
                      <input type="email" placeholder="Email Address" className="uk-input uk-form-large uk-width-1-1 uk-border-pill" />
                    </div>
                    <div className="uk-width-1-1 uk-width-auto@s">
                      <input type="submit" value="Subscribe" className="uk-button uk-button-large uk-button-warning" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
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


export default FindRecipesPage
