import React from 'react';
import ExampleImage from '../../assets/images/sample.jpg';
import './Grid.css';

function Grid() {
  return (
    <div className="container grid-container">
      <div className="row">
        <div className="col-md-4">
          <img className="d-block w-100 grid-image" src={ExampleImage} alt="Sample 1" />
        </div>
        <div className="col-md-4">
          <img className="d-block w-100 grid-image" src={ExampleImage} alt="Sample 2" />
        </div>
        <div className="col-md-4">
          <img className="d-block w-100 grid-image" src={ExampleImage} alt="Sample 3" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <img className="d-block w-100 grid-image" src={ExampleImage} alt="Sample 4" />
        </div>
        <div className="col-md-4">
          <img className="d-block w-100 grid-image" src={ExampleImage} alt="Sample 5" />
        </div>
        <div className="col-md-4">
          <img className="d-block w-100 grid-image" src={ExampleImage} alt="Sample 6" />
        </div>
      </div>
    </div>
  );
}

export default Grid;