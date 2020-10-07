import React, { useState } from 'react';
//imported comps
import SideBar from './SideBar';
import DashboardHeader from './DashboardHeader';
import ManageRecipes from './ManageRecipes';
import ManageIngredients from './ManageIngredients';
import ManageVideos from './ManageVideos';
import ManageUsers from './ManageUsers';

const Dashboard = () => {
  //comp local state
  const [activeSection, setActiveSection] = useState('recipes') // sections => (recipes, ingredients, users, videos)

  const renderContent = () => {
    if (activeSection === 'recipes') return <ManageRecipes />
    if (activeSection === 'ingredients') return <ManageIngredients />
    if (activeSection === 'videos') return <ManageVideos />
    if (activeSection === 'users') return <ManageUsers />
  }

  return (
    <div className="page-wrapper chiller-theme toggled">
      <SideBar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="page-content">
        <DashboardHeader />
        <div className="container">
          {renderContent()}
        </div>
      </main >
    </div >
  )
}

export default Dashboard