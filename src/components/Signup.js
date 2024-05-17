import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate  = useNavigate();

  console.log(registrationNo, password);
  const handleSignup=async(e)=>{
    try {
      e.preventDefault();
      setDisabled(true);
      const res = await axios.post("http://localhost:5000/doctor/auth/signup", {
        name:name,
        mobileNumber:mobileNumber,
        registrationNo: registrationNo,
        password: password,
        confirmPassword:confirmPassword
      });
      console.log(res,"testing")
      setDisabled(false);
      localStorage.setItem("token", res?.data?.accessToken);
      navigate("/dashboard-doctor");
    } catch (error) {
      setDisabled(false);
      toast.error("signup-error")
      console.log(error.status);
    }
  }


  return (
    <div class="container py-3 min-vh-100 d-flex flex-column align-items-center">
      <div class="card shadow rounded-3 my-auto w-50">
        <div
          class="card-header p-3 h4 text-center"
          style={{
            backgroundColor: "#2379F9",
          }}
        >
          Signup
        </div>
        <div class="card-body p-4 ">
          <form role="form" class="row">
            <div class="form-group col-lg-12">
              <label class="form-control-label" for="form-group-input">
                Registration Number
              </label>
              <input
                type="text"
                class="form-control"
                id="form-group-input"
                name="name"
                onChange={(e) => setRegistrationNo(e.target.value)}
              />
            </div>
            <div class="form-group col-lg-12">
              <label class="form-control-label" for="form-group-input">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                id="form-group-input"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="form-group col-lg-12">
              <label class="form-control-label" for="form-group-input">
                Mobile Number
              </label>
              <input
                type="text"
                class="form-control"
                id="form-group-input"
                name="name"
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <div class="form-group col-lg-12">
              <label class="form-control-label" for="form-group-input">
                Password
              </label>
              <input
                type="text"
                class="form-control"
                id="form-group-input"
                name="name"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="form-group col-lg-12">
              <label class="form-control-label" for="form-group-input">
                confirmPassword
              </label>
              <input
                type="text"
                class="form-control"
                id="form-group-input"
                name="email"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div class="form-group col-lg-12 d-flex justify-content-center">
              <button
                class="btn mt-2"
                for="form-group-input"
                onClick={handleSignup}
                disabled={disabled}
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>Already have an account? <a href="/login">Login</a></div>
    </div>
  );
};

export default Signup;
