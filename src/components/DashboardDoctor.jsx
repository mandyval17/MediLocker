import React, {useEffect, useState} from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const DashboardDoctor = () => {
  
  const navigate = useNavigate();
  let timeout = undefined;
  const [aadhaar, setAadhaar] = useState();
  const [patientHistory, setPatientHistory] = useState();
  const [addNewHistory, setAddNewHistory] = useState(false);
  const [diagnosis, setDiagnosis] = useState();
  const [remarks, setRemarks] = useState();
  const [imgSrc, setImageSrc] = useState();
  const [disabled, setDisabled] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState();

  useEffect(() => {
    (async () => {
      try {
          const res = await axios.get("http://localhost:5000/doctor/auth/doctorInfo", {
            headers: {
              "x-auth-token": localStorage.getItem("token")
            }
          })
    
          setDoctorInfo(res.data[0]);
      } catch(error) {
        navigate("/login")
      }
    })()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.get("http://localhost:5000/doctor/report/patientReport?addharCardNumber=" + aadhaar, 
      {
        headers: {
        'x-auth-token': localStorage.getItem("token")
      }});

      setPatientHistory(res.data);
      setAddNewHistory(false);
    } catch(error) {
      setPatientHistory();
      setAddNewHistory(false);
      toast.error("No patient found");
    }
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      
      return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
      const base64String = event.target.result;
      setImageSrc(base64String);
    };

    reader.readAsDataURL(file);
  };

  const handlePatientSubmit = async e => {
    e.preventDefault();

    if(!imgSrc || !remarks || !diagnosis || !aadhaar ) {
      toast.error("Fill the details properly")
      
      return;
    }

    const body = {
        priscription: imgSrc,
        remarks: remarks,
        dignosis: diagnosis,
        patientAddharCardNumber: aadhaar
    }

    setDisabled(true);

    try {
      await axios.post("http://localhost:5000/doctor/report", body, {
        headers: {
          'x-auth-token': localStorage.getItem("token")
        },
      })

      const res = await axios.get("http://localhost:5000/doctor/report/patientReport?addharCardNumber=" + aadhaar, 
      {
        headers: {
        'x-auth-token': localStorage.getItem("token")
      }});

      setPatientHistory(res.data);
      setAddNewHistory(false);
      setRemarks();
      setDiagnosis();
      setImageSrc();
      setAadhaar();
      setAddNewHistory(false);
      setDisabled(false);

      toast.success("Details submitted successfully");
    } catch(error) {
      setDisabled(false);
      toast.error("dashboard-error-2")
    }
  }


  return (
    <div className="container-fluid mt-4 position-fixed vh-100">
        <div className="row no-gutters">
          <div className="col-3 sidebar">
            <div className="card mb-3">
              <div className="card-body text-primary">
              <h2 className="card-title">Profile - Doctor</h2>
              <hr className="hr"/>
              {doctorInfo && (<div><p className="card-text">Name: {doctorInfo.name}</p>
              <p className="card-text">Reg No.: {doctorInfo.registrationNo}</p>
              <p className="card-text">Mob No.: {doctorInfo.mobileNumber}</p></div>)}
              </div>
            </div>
            <a href="/dashboard-doctor/history">Show my history</a>
          </div>
          <div className="vr px-0" />
          <div className="col-8 content" style={{height: "100vh", overflow: "auto"}}>
            <form onSubmit={handleSubmit}>
              <input type="text" className="form-control my-2" placeholder='Enter Patient Aadhaar for history' value={aadhaar} onChange={e => setAadhaar(e.target.value)}/>
              <input type="submit" className="btn" value="Search" />
              {patientHistory && <input type="button" className="btn mx-2" value="+" onClick={() => {
                setPatientHistory();
                setAddNewHistory(true);
              }}/>}
            </form>
            <div>
              {patientHistory && patientHistory.length === 0 && <>No Patient history found, add new!</>}
              {patientHistory && patientHistory.length !== 0 && 
              (<>
                <hr className="hr" />
                <h1 className="py-3 text-primary">Patient History</h1>
                {patientHistory.map(object => {
                  return (
                    <div className="card shadow-sm my-2"><div className="card-body">
                      <p className="card-text">Confirmation: {object.confirmation}</p>
                      <p className="card-text">Doctor: {object.doctorName} - {object.doctorRegistrationNo}</p>
                      <p className="card-text">Diagnosis: {object.dignosis}</p>
                      <p className="card-text">Remarks: {object.remarks}</p>
                      <p className="card-text">Date: {object.date}</p>
                      <p className="card-text">Prescription: <img className="card-img-top" style={{height: "300px", width: "300px"}} src={object.priscription} alt={object.priscription} /></p>
                    </div>
                    </div>
                  )
                })}
              </>)}
              {addNewHistory && (
                  <div class="container py-3 min-vh-100 d-flex flex-column align-items-center">
                    <div class="card shadow rounded-3 my-auto w-50">
                      <div
                        class="card-header p-3 h4 text-center"
                        style={{
                          backgroundColor: "#2379F9",
                        }}
                      >
                        Add patient history
                      </div>
                      <div class="card-body p-4 ">
                        <form role="form" class="row">
                          <div class="form-group col-lg-12">
                            <label class="form-control-label" for="form-group-input">
                              Diagnosis
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="form-group-input"
                              onChange={(e) => setDiagnosis(e.target.value)}
                            />
                          </div>
                          <div class="form-group col-lg-12">
                            <label class="form-control-label" for="form-group-input">
                              Remarks
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="form-group-input"
                              onChange={(e) => setRemarks(e.target.value)}
                            />
                          </div>
                          <div class="form-group col-lg-12">
                            <label class="form-control-label" for="form-group-input">
                              Prescription
                            </label>
                            <input
                              type="file"
                              class="form-control"
                              id="form-group-input"
                              onChange={(e) => handleFileSelect(e)}
                            />
                          </div>
                          <img src={imgSrc} alt="" />
                          <div class="form-group col-lg-12 d-flex justify-content-center">
                            <button
                              class="btn mt-2"
                              for="form-group-input"
                              onClick={handlePatientSubmit}
                              disabled={disabled}
                            >
                              Add 
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
              )}
            </div>
          </div>
      </div>
    </div>
  )
}

export default DashboardDoctor;