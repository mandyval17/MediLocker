import React from "react";
import "../css/Serv.css";
import car from "../car.jpg";
import Main2 from "./Main2";
const Serv = () => {
  return (
    <div className="container">
      <div class="text-center main-text">
        <div>
          <h3>
            <span className="x" style={{color:"#fe3f3f"}}>SERVICES</span>
          </h3>
        </div>
        <div>
          <h1 style={{color:"#1F3E72"}}>Provides Our Best Services</h1>
        </div>
      </div>
      <div className="main-card d-flex justify-content-lg-center flex-column flex-lg-row align-items-center justify-content-around">
        <div class="card" style={{width: "14rem"} }>
          <div className="div text-center">
              <img class="card-img-top" src={car} alt="Card image cap"/>
          </div>
          <div class="card-body">
            <h5 class="card-title text-center">Cardiology</h5>
            <p class="card-text text-center">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div class="card" style={{width: "14rem"} }>
          <div className="div text-center">
              <img class="card-img-top" src={car} alt="Card image cap"/>
          </div>
          <div class="card-body">
            <h5 class="card-title text-center">Cardiology</h5>
            <p class="card-text text-center">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div class="card" style={{width: "14rem"} }>
          <div className="div text-center">
              <img class="card-img-top" src={car} alt="Card image cap"/>
          </div>
          <div class="card-body">
            <h5 class="card-title text-center">Cardiology</h5>
            <p class="card-text text-center">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div class="card" style={{width: "14rem"}}>
          <div className="div text-center">
              <img class="card-img-top" src={car} alt="Card image cap"/>
          </div>
          <div class="card-body">
            <h5 class="card-title text-center">Cardiology</h5>
            <p class="card-text text-center">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
      {/* <div className="row"></div> */}
      {/* <div className="row text-center">
        <div className="col-md">
          <div class="card">
            <div className="div text-center">
              <img class="card-img-top" src={car} alt="Card image cap" />
            </div>
            <div class="card-body">
              <h5 class="card-title text-center">Cardiology</h5>
              <p class="card-text text-center">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <Main2 />
    </div>
  );
};

export default Serv;
