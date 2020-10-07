import React, { useState, useEffect } from 'react'
import Api from '../../../apis/Api';
import { Button, Form } from 'react-bootstrap';
import _ from 'lodash';
//imported comps
import SearchByIngredients from '../common/SearchByIngredients/SearchByIngredients';
import RecipesList from '../findRecipesPage/RecipesList';
import Pagination from '../common/pagination/Pagination';

const ManageRecipes = () => {
  //comp local state
  const [recipes, setRecipes] = useState([])
  const [filters, setFilters] = useState({})
  const [exact, setExact] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [showPending, setShowPending] = useState(true);
  const [showApproved, setShowApproved] = useState(false);
  const [showRejected, setShowRejected] = useState(false);


  const getrecipes = async () => {
    const approvalArray = [];
    if (showPending) approvalArray.push('pending');
    if (showApproved) approvalArray.push('approved');
    if (showRejected) approvalArray.push('rejected');

    const response = await Api.post('/getrecipes', { filters, page, exact, approvalArray });

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
  }, [filters, page, exact, showApproved, showPending, showRejected])

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
              <Form.Check
                checked={showPending}
                onChange={(e) => setShowPending(e.target.checked)}
                className="mt-5 mb-2"
                type="switch"
                id="custom-switch01"
                label="Show Pending Recipes"
              />
              <Form.Check
                checked={showApproved}
                onChange={(e) => setShowApproved(e.target.checked)}
                className="mb-2"
                type="switch"
                id="custom-switch02"
                label="Show Approved Recipes"
              />
              <Form.Check
                checked={showRejected}
                onChange={(e) => setShowRejected(e.target.checked)}
                className="mb-2"
                type="switch"
                id="custom-switch03"
                label="Show Rejected Recipes"
              />
              <div className="d-flex mt-1 align-items-center justify-content-between">
                {filters.difficulty && <Button className=" d-flex align-items-center text-xs p-0 m-0 px-1" variant="outline-secondary" size="sm" onClick={() => setFilters(_.omit(filters, 'difficulty'))}>Difficulty: {getDifficulty(filters.difficulty)} <span className="material-icons ml-1 text-md">clear</span></Button>}
                {filters.strength && <Button className=" d-flex align-items-center text-xs p-0 m-0 px-1" variant="outline-secondary" size="sm" onClick={() => setFilters(_.omit(filters, 'strength'))}>Strength: {getStrength(filters.strength)} <span className="material-icons ml-1 text-md">clear</span></Button>}
              </div>
            </div>
          </div>

          <div className="uk-width-expand@m">
            <SearchByIngredients inputSize={7} labelSize={3} onValuesChange={onValuesChange} />

            <RecipesList recipes={recipes} getUserRecipies={getrecipes} />
            {totalCount > 12 && <Pagination totalPages={Math.ceil(totalCount / 12)} page={page} setPage={setPage} />}

          </div>

        </div>
      </div>
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

export default ManageRecipes
