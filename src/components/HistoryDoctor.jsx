import React, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import axios from "axios";

const HistoryDoctor = () => {
    const [history, setHistory] = useState();

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("http://localhost:5000/doctor/report/AllReport", {
                    headers: {
                        "x-auth-token": localStorage.getItem("token")
                    }
                })
                setHistory(res.data)
                console.log(history)
            } catch(error) {
                toast.error("No history found")
            }
        })()
    }, []);

  return (
    <div className="container-fluid mt-4">
        {history && history.map(object => {
            return (
                <div className="card my-2 p-2">
                    <p className="card-text">Confirmation: {object?.confirmation}</p>
                    <p className="card-text">Diagnosis: {object?.dignosis}</p>
                    <p className="card-text">Remarks: {object?.remarks}</p>
                    <p className="card-text">Date: {object?.date}</p>
                    <p className="card-text">Prescription: <img style={{height: "300px", width: "300px"}} src={object.priscription} alt={object?.priscription} /></p>
                </div>
            )
        })}
        {!history || history.length === 0 && <h1>History is Empty!</h1>}
    </div>
  )
}

export default HistoryDoctor