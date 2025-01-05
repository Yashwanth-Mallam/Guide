import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../UI/SideBar";
import { IconUsers, IconList, IconLogout } from "@tabler/icons-react";
import { useState } from "react";
import CoursesPage from "./coursesPage";
import ProfilePage from "./ProfilePage";
import { useNavigate } from "react-router-dom";
const DashboardSidebar = ({ selectedSection, setSelectedSection }) => {
  const navigate = useNavigate();

  const sections = [
    { label: "Courses", icon: <IconList />, key: "Courses" },
    {
      label: "Profile",
      icon: <IconUsers />,
      key: "Profile",
    },
  ];

  return (
    <Sidebar className="">
      <SidebarBody>
        {/* Map through sections to create sidebar links */}
        {sections.map((section, index) => (
          <SidebarLink
            key={section.key}
            link={{
              href: "#", // In the actual project, change this to the respective route
              label: section.label,
              icon: section.icon,
            }}
            isActive={selectedSection === section.key}
            onClick={() => setSelectedSection(section.key)}
            style={{
              marginBottom: index !== sections.length - 1 ? "0.625rem" : "0rem", // Add space between links
            }}
          />
        ))}
        {/* Logout Button */}
        {/* Logout Button */}
<div className="mt-4">
  <button
    auto
    onClick={() => {
      localStorage.removeItem('learnerId'); // Remove learnerId from localStorage
      navigate("/login"); // Navigate to login page
    }}
    className="w-full flex justify-start px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md"
  >
    <IconLogout />
  </button>
</div>

      </SidebarBody>
    </Sidebar>
  );
};

const MainReqDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("List");

  const renderContent = () => {
    switch (selectedSection) {
      case "Courses":
        return <CoursesPage />;
      case "Profile":
        return <ProfilePage />;
      default:
        return <CoursesPage />;
    }
  };

  return (
    <div className="flex h-screen">
      <DashboardSidebar
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      {/* Main content area */}
      <div className="flex-1 p-4 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default MainReqDashboard;
