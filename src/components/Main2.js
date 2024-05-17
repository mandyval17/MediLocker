import React from "react";
import "../css/Main2.css";
import img from "../doc1.png";
import Main3 from "./Main3";
const Main2 = () => {
  return (
    <section>
      <div className="container-fluid">
        <div className="main d-flex justify-content-lg-around justify-content-center">
          <div className="left">
            <div className="img3">
              <img
                src={img}
                alt=""
                className="img3-img img2-fluid w-100 d-none d-lg-block"
              />
            </div>
          </div>
          <div className="right">
            <div className="row">
              <div className="col col-sm-10">
                <h3>BOOK APOINTMENT</h3>
              </div>
            </div>
            <div className="row">
              <div className="col col-sm-11">
                <h2 style={{ color: "#1F3E72" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing.
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-10 pt-3">
                <p style={{ color: "#7B88A2" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                  eos ratione aliquid sequi sunt, illum recusandae quas fuga
                  odit magnam ex culpa architecto modi praesentium, error
                  deserunt rerum eaque tenetur!
                </p>
              </div>
              <div className="div p-3">
                <p style={{ color: "#7B88A2" }}>
                  {" "}
                  <i
                    style={{ color: "#2379F9" }}
                    class="bi bi-check-circle-fill"
                  ></i>{" "}
                  Lorem ipsum dolor sit amet.
                </p>
                <p style={{ color: "#7B88A2" }}>
                  {" "}
                  <i
                    style={{ color: "#2379F9" }}
                    class="bi bi-check-circle-fill"
                  ></i>{" "}
                  Lorem ipsum dolor sit amet.
                </p>
                <div className="but">
                  <a class="nav-link" href="#">
                    <a class="btn" href="#" role="button">
                      Book Now
                    </a>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Main3 />
    </section>
  );
};

export default Main2;
