import { Routes, Route } from "react-router-dom";
// import Home from "./pages/HomePage/home";
// import Courses from "./pages/Courses/course";
// import Bookmark from "./pages/Bookmark/bookmark";
// import Profile from "./pages/ProfilePage/profile";
// import Tutor from "./pages/Tutor/tutor";
// import Content from "./pages/ContentPages/CouContent";
// import Registration from "./pages/RegistrationPage/index";
// import Login from "./pages/LoginPage/index";
// import CourseDescription from "./pages/Courses/components/CourCard/courseDiscription";

import LandingPage from "./components/learner/landingPage";
import LoginPage from "./components/learner/loginPage";
import SignUpPage from "./components/learner/signupPage";
import CourseDescriptionPage from "./components/learnerPages/courseDiscrptionPage";
import SideBarforLearner from "./components/learnerPages/LearnerSideBar";
import CreateProfilePage from "./components/learnerPages/createProfile";
function App() {
  return (
    <Routes>
      {/* <Route  path="/login" element={<Login/>} />
        <Route  path="/registration" element={<Registration/>} />
        <Route exact path="/" element={<Home />} />
        <Route  path="/courses" element={<Courses/>} />
        <Route  path="/bookmark" element={<Bookmark/>} />
        <Route  path="/pro" element={<Profile />} />
        <Route  path="/tut" element={<Tutor />} />
        <Route  path="/content" element={<Content />} />
        <Route  path="/courses/:id" element={<CourseDescription />} /> */}

      {/* our code renders from here -> */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/SignUp" element={<SignUpPage />} />
      {/* <Route path="/Courses" element={<CoursesPage />} /> */}
      <Route path="/courses/:courseId" element={<CourseDescriptionPage />} />
      <Route path="/CreateProfilePage" element={<CreateProfilePage />} />
      <Route path="/LearnerDashBoard" element={<SideBarforLearner />} />
    </Routes>
  );
}

export default App;
