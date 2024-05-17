import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Serv from "./components/Serv";
import Main2 from "./components/Main2";
import Main3 from "./components/Main3";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DashboardDoctor from "./components/DashboardDoctor";
import DashboardPatient from "./components/DashboardPatient";
import HistoryDoctor from "./components/HistoryDoctor";
import BookAppointment from "./components/BookAppointment";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navbar />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/dashboard-doctor" element={<DashboardDoctor />} />
          <Route exact path="/dashboard-patient" element={<DashboardPatient />} />
          <Route exact path="/dashboard-doctor/history" element={<HistoryDoctor />} />
          <Route exact path="/dashboard-patient/book-appointment" element={<BookAppointment />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
