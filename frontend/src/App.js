import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import store from "./store";
import Home from "./components/Home/Home";
import Register from "./components/Auth/Register";
import HuntJobsDashboard from "./components/HuntJobs/HuntJobsDashboard";
import JobDetails from "./components/Job/JobDetails";
import JobDetailsPage from "./components/Job/JobDetailsPage";
import CreateJobPage from "./components/Job/CreateJobPage";
import JobApplicationListPage from "./components/JobApplication/JobApplicationListPage";
import PostedJobsPage from "./components/PostedJobs/PostedJobsPage";
import JobApplicationPerJobPage from "./components/JobApplication/JobApplicationPerJobPage";
import UserProfilePage from "./components/User/UserProfilePage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hunt-jobs" element={<HuntJobsDashboard />} />
          <Route path="/job-details/:id" element={<JobDetailsPage />} />
          <Route path="/create-job" element={<CreateJobPage />} />
          <Route path="/application-list" element={<JobApplicationListPage />} />
          <Route path="/posted-jobs" element={<PostedJobsPage />} />
          <Route path="/application-list-per-job/:id" element={<JobApplicationPerJobPage />} />
          <Route path="/user-profile/:id" element={<UserProfilePage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;