import React from 'react';
import { Link } from 'react-router-dom';
import "./Landing.css"

const Landing = (props) => {
  return (
    <div className="jumbotro">
      <div className="container d-flex h-100">
        <div className="row justify-content-center align-self-center">
          <div className="col-md-8">
          <p className="description">Yo! Everyone, Have you guys ever wanted to find an anime where your favourite Seiyuu
            are playing the main characters but it's just so much pain to look for it online, well 
            Rejoice!, cause in this Web App you just need to enter the names of your favourite 
            Seiyuu and it will find the anime for you!
            </p>
            <div className="d-flex justify-content-center">
            <Link to="/search" className="button">Lets Search it!</Link>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;