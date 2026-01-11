import React from 'react'
import Slides from './Slides'
import Category from './Funds';
import Section2 from './Section2';
import Footer from './Footer';
import CustomerNavbar from './CustomerNavbar';
import Slide2 from './Slide2';
import Section1 from './Section1';
import ExploreProjects from './ExploreProjects';

function Home() {
  return (
    <div>
      <CustomerNavbar/>
      <Slides/>
      <ExploreProjects/>
      <Category/>
      <Slide2/>
      <Footer/>
    </div>
  )
}

export default Home;