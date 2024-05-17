import React from "react";
import "../css/Main3.css";
import img from "../doc2.jpg";

const Main3 = () => {
  return (
    <section>
      <div className="container-fluid">
        <div className="main d-flex justify-content-lg-around justify-content-center">
          <div className="right-2">
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
                    class="bi bi-calendar-event-fill"
                  ></i>{" "}
                  Lorem ipsum dolor sit amet.
                </p>
                <p style={{ color: "#7B88A2" }}>
                  {" "}
                  <i
                    style={{ color: "#2379F9" }}
                    class="bi bi-people-fill"
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
          <div className="left-2">
            <div className="img4">
              <img
                src={img}
                alt=""
                className="img4-img img2-fluid w-100 d-none d-lg-block"
              />
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Main3;
