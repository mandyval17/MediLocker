import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const DashboardPatient = () => {
    const navigate = useNavigate();
    const [details, setDetails] = useState();
    const [history, setHistory] = useState();
    const [disabled, setDisabled] = useState(false);
    const [aadhaar, setAadhaar] = useState();
    const [historyType, setHistoryType] = useState();
    const [historyArray, setHistoryArray] = useState();
    const [bookings, setBookings] = useState();

    useEffect(() => {
        (async () => {
            const session = Cookies.get("session");
            const sessionSig = Cookies.get("session.sig");

            try {
                const res = await axios.get("http://localhost:5000/auth/patient-details", {
                    withCredentials: true
                })
                
                if(res.data !== "pleaseLoginFirst") {
                    setDetails(res.data[0]);
                    setBookings(res.data[0].appointment);
                }else{
                    navigate("/")
                }
            } catch (error) {
                toast.error("Error in making an account please try again later ")
            }
        })()
    }, []);

    useEffect(() => {
        if(!details) return ;

        if('addharCardNumber' in details) {
            (async () => {
                const res = await axios.get("http://localhost:5000/patient/checkConfirmation", {
                    withCredentials: true
                })

                console.log(res.data);
                setHistory(res.data);
                setHistoryType("all")
            })()
        }
    }, [details]);

    const handleAadhaarSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);

        try {
            await axios.post("http://localhost:5000/auth/addAddhar", {addharCardNumber: aadhaar}, {
                withCredentials: true,
            })

            const res = await axios.get("http://localhost:5000/auth/patient-details", {
                withCredentials: true
            })

            setDetails(res.data[0]);
            setDisabled(false);
        } catch (error) {
            setDisabled(false)
            toast.error("dashboard-patient-error-2")
        }
    }

    useEffect(() => {
        if(!history || !historyType) return ;

        setHistoryArray(history[historyType]);
    }, [historyType, history])

    const filterPatientHistory = type => {
        setHistoryType(type);
    }

    const changeConfirm = async id => {
        try {
            await axios.post("http://localhost:5000/patient/changeConfirmation", {id}, {withCredentials: true})

            const res = await axios.get("http://localhost:5000/patient/checkConfirmation", {
                withCredentials: true
            })

            setHistory(res.data);
            setHistoryType("all")
        } catch(error) {
            toast.error("change confirm error 1");
        }
    }

    const handleBookingCancel = async (object) => {
        try {
            await axios.post("http://localhost:5000/hospital/cancelTimeSlot", {
                id: object.hospitalId,
                [object.timeSlot]: false
            }, {
                withCredentials: true
            })

            const res = await axios.get("http://localhost:5000/auth/patient-details", {
                withCredentials: true
            })
            
            if(res.data !== "pleaseLoginFirst") {
                setDetails(res.data[0]);
                setBookings(res.data[0].appointment);
                
                toast.success("Booking cancelled successfully");
            } else toast.error("cancel booking error 1")
        } catch (error) {
            toast.error("cancel booking error 2")
        }
    }

  return (
    <div>
        <div className="container-fluid mt-4 position-fixed vh-100">
        <div className="row no-gutters">
          <div className="col-3 sidebar"  style={{height: "100vh", overflow: "auto"}}>
            <div className="card mb-3">
              <div className="card-body text-primary">
              <h2 className="card-title">Profile - Patient</h2>
              <hr className="hr"/>
              {details && (<div><p className="card-text">Name: {details.username}</p>
              <p className="card-text">Aadhaar No.: {details.addharCardNumber}</p></div>)}
              </div>
            </div>
            {bookings && bookings.map(object => {
                return (
                    <div className="card my-3 p-3"> 
                        <h5 className="card-title">Hospital - {object.hospital}</h5>
                        <hr className="hr" />
                        <h6 className="mt-4">{object.timeSlot} <span className="btn mx-4" onClick={() => {handleBookingCancel(object)}}>Cancel booking</span></h6>
                    </div>
                )
            })}
            {details && details.addharCardNumber && <a href="/dashboard-patient/book-appointment">Book appointment</a>}
          </div>
          <div className="vr px-0" />
          <div className="col-8 content" style={{height: "100vh", overflow: "auto"}}>
            <div>
                {!historyArray && (
                    <div class="container py-3 min-vh-100 d-flex flex-column align-items-center">
                        <div class="card shadow rounded-3 my-auto w-50">
                            <div
                                class="card-header p-3 h4 text-center"
                                style={{
                                    backgroundColor: "#2379F9",
                                }}
                            >
                                Add patient Aadhaar
                            </div>
                            <div class="card-body p-4 ">
                                <form role="form" class="row">
                                    <div class="form-group col-lg-12">
                                        <label class="form-control-label" for="form-group-input">
                                            Aadhaar Number
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="form-group-input"
                                            onChange={(e) => setAadhaar(e.target.value)}
                                        />
                                    </div>
                                    <div class="form-group col-lg-12 d-flex justify-content-center">
                                        <button
                                            class="btn mt-2"
                                            for="form-group-input"
                                            onClick={handleAadhaarSubmit}
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
                {historyArray && <><div>
                    <h1 className="py-3 text-primary">Patient History</h1>
                    <button type="button" className="btn btn-success" onClick={() => filterPatientHistory("verified")}>Verified</button>
                    <button type="button" className="btn mx-2 btn-warning" onClick={() => filterPatientHistory("notVerified")}>Not Verified</button>
                    <button type="button" className="btn mx-2" onClick={() => filterPatientHistory("all")}>All</button>
                    <h4 className="my-3 text-primary">Status: {historyType.toUpperCase()}</h4>
                </div>{historyArray.map(object => {
                  return (
                    <div className="card shadow-sm my-2"><div className="card-body">
                      <p className="card-text">Confirmation: <span style={object.confirmation === "Verified" ? {color: "#198754"} : {color: "#ffc107"}}>{object.confirmation}</span></p>
                      <p className="card-text">Doctor: {object.doctorName} - {object.doctorRegistrationNo}</p>
                      <p className="card-text">Diagnosis: {object.dignosis}</p>
                      <p className="card-text">Remarks: {object.remarks}</p>
                      <p className="card-text">Date: {object.date}</p>
                      <p className="card-text">Prescription: <img className="card-img-top" style={{height: "300px", width: "300px"}} src={object.priscription} alt={object.priscription} /></p>
                      {object.confirmation !== "Verified" ? <button onClick={() => changeConfirm(object._id)} className="btn btn-success">Verify</button> : <></>}
                    </div>
                    </div>
                  )
                })}</>}
                {historyArray && historyArray.length === 0 && <div className="my-3">Empty History for Patient</div>}
            </div>
          </div>
      </div>
    </div>
    </div>
  )
}

export default DashboardPatient