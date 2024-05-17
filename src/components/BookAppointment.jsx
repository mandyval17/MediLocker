import React, {useState, useEffect} from 'react'
import axios from "axios";
import { toast } from 'react-toastify';

const BookAppointment = () => {
    const [hospital, setHospital] = useState();
    const [hosArr, setHosArray] = useState();
    const [hosObject, setHosObject] = useState();
    const [timeIdx, setTimeIdx] = useState();

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("http://localhost:5000/hospital/allhospital", {
                    withCredentials: true
                })
                setHosArray(res.data)
            } catch(error) {
                toast.error("Error finding hospital, Please refresh the page")
            }
        })()
    }, []);

    const handleHosSearch = (e) => {
        e.preventDefault();
    }

    const disabledStyle = {cursor: "default", background: "#f8f9fa", color: "#6c757d"};
    const selectedStyle = (idx, id) => {
        return {cursor: "pointer", background: isSelectedTime(idx, id) ? '#0d6efd' : '', color: isSelectedTime(idx, id) ? 'white' : ''}};

    const isSelectedTime = (idx, id) => {
        return idx === timeIdx && hosObject && id === hosObject._id;
    }

    const bookAppointment = async (id) => {
        if(id !== hosObject._id) {
            toast.error("Invalid book appointment")

            return ;
        }

        let body = {};
        if(timeIdx === 0) body = {"10-12": true}
        if(timeIdx === 1) body = {"12-14": true}
        if(timeIdx === 2) body = {"14-16": true}
        if(timeIdx === 3) body = {"16-18": true}
        body.id = hosObject._id;
        try {
            await axios.post("http://localhost:5000/hospital/updateTimeSlot", {...body}, {
                withCredentials: true
            })

            const res = await axios.get("http://localhost:5000/hospital/allhospital", {
                withCredentials: true
            })
            setHosArray(res.data)
            setTimeIdx();
            setHosObject();
            toast.success("Successfully booked an appointment")
        } catch (error) {
            toast.error("Error booking slot please try again later");
        }
    }

  return (
    <div className="container-fluid mt-4">
        <form>
            <input type="text" className="form-control my-2" placeholder='Enter Patient Aadhaar for hospital' value={hospital} onChange={e => setHospital(e.target.value)}/>
            <input type="submit" className="btn my-3" value="Search" onClick={handleHosSearch}/>
        </form>
        {hosArr && hosArr.map((object, index) => {
            return (
                <div className="card my-2 p-2" key={object._id}>
                    <h4 className="card-text">Name: {object.hospitalName}</h4>
                    <h6>Appointments</h6>
                    <hr className="hr"/>
                    <div className="d-flex">
                        <p className="border mx-3 p-2" style={object["10-12"] ? disabledStyle : selectedStyle(0, object._id)} onClick={() => {setHosObject(object); setTimeIdx(0);}}>10 - 12</p>
                        <p className="border mx-3 p-2" style={object["12-14"] ? disabledStyle : selectedStyle(1, object._id)} onClick={() => {setHosObject(object); setTimeIdx(1);}}>12 - 14</p>
                        <p className="border mx-3 p-2" style={object["14-16"] ? disabledStyle : selectedStyle(2, object._id)} onClick={() => {setHosObject(object); setTimeIdx(2);}}>14 - 16</p>
                        <p className="border mx-3 p-2" style={object["16-18"] ? disabledStyle : selectedStyle(3, object._id)} onClick={() => {setHosObject(object); setTimeIdx(3);}}>16 - 18</p>
                    </div>
                    <button type="button" style={{width: "200px"}} className="btn my-3" onClick={() => bookAppointment(object._id)}>
                        Book an appointment
                    </button>
                </div>
            )
        })}
        {!hospital || hospital.length === 0 && <h1>History is Empty!</h1>}
    </div>
  )
}

export default BookAppointment