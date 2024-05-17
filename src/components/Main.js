import React from "react";
import first from "../first.svg";
import "../css/Main.css";
import Serv from "./Serv";

function main() {
  return (
    // <h2>hello<h2/>
    <div className="">
      <div className="container-fluid">
        <div className=" main d-flex justify-content-center ">
          <div className="upper">
            <div>
              <h2 style={{color:"#1F3E72"}}>
                The best reliable <br />
                health service in <br /> your hands
              </h2>
            </div>
            <div>
              <p style={{color:"#7B88A2"}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                distinctio sed quos sequi, doloribus enim recusandae unde saepe.
              </p>
            </div>
            <div className="but">
              <a class="nav-link" href="#">
                <a class="btn" href="#" role="button">
                  Make an appointment
                </a>
              </a>
            </div>
          </div>
          <div className="img2">
            <img
              src={first}
              alt=""
              className="img-fluid w-100 d-none d-lg-block"
            />
          </div>
        </div>
      </div>
      <Serv />
    </div>
  );
}

export default main;
