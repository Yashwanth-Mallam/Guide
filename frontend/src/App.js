import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
// import CoursesPage from "./components/learnerPages/coursesPage";
import CourseDescriptionPage from "./components/learnerPages/courseDiscrptionPage";
// import ProfilePage from "./components/learnerPages/ProfilePage";
import SideBarforLearner from "./components/learnerPages/LearnerSideBar";
function App() {
  return (
    <BrowserRouter>
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
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        {/* <Route path="/Courses" element={<CoursesPage />} /> */}
        <Route path="/courses/:courseId" element={<CourseDescriptionPage />} />
        {/* <Route path="/Profile" element={<ProfilePage />} /> */}
        <Route path="/LearnerDashBoard" element={<SideBarforLearner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
