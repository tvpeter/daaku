import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleRight,
  faUsers,
  faHouse,
  faReceipt,
  faSchool,
} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Link } from "react-router-dom"

const SideNavBar = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [selectedSubIndex, setSelectedSubIndex] = useState(-1)
  const navData = [
    {
      title: "Dashboard",
      icon: faHouse,
      subItems: [
        { link: "/", text: "Admin" },
        { link: "/students", text: "Students" },
        { link: "#", text: "Parents" },
        { link: "#", text: "Teachers" },
      ],
    },
    {
      title: "Students",
      icon: faUsers,
      subItems: [
        { link: "/students", text: "All Students" },
        { link: "#", text: "Student Details" },
        { link: "/students/register", text: "Register Student" },
        { link: "#", text: "Student Promotion" },
      ],
    },
    {
      title: "Teachers",
      icon: faUsers,
      subItems: [
        { link: "#", text: "All Teachers" },
        { link: "#", text: "Teacher Details" },
        { link: "#", text: "Add Teacher" },
      ],
    },
    {
      title: "Account",
      icon: faReceipt,
      subItems: [
        { link: "#", text: "Fees" },
        { link: "#", text: "Add Fees" },
      ],
    },
    {
      title: "Class Name",
      icon: faSchool,
      subItems: [
        { link: "#", text: "All Class Names" },
        { link: "#", text: "Add New Class Name" },
        { link: "#", text: "All Class Names" },
      ],
    },
  ]
  return (
    <div className="sidebar-main sidebar-menu-one sidebar-expand-md sidebar-color">
    <div className="mobile-sidebar-header d-md-none">
      <div className="header-logo">
        <a href="index.html">
          <img src="img/logo1.png" alt="logo" />
        </a>
      </div>
    </div>
    <div className="sidebar-menu-content">
      <ul className="nav nav-sidebar-menu sidebar-toggle-view">
        {navData.map((item, index) => (
          <li key={index} className="nav-item sidebar-nav-item">
            <a href="#" className="nav-link">
              <FontAwesomeIcon icon={item.icon} size="2x" color="orange" />
              <span>{item.title}</span>
            </a>
            <ul className="nav sub-group-menu sub-group-active">
              {item.subItems.map((subItem, subIndex) => (
                <li
                  key={subIndex}
                  onClick={() => {
                    setSelectedIndex(index)
                    setSelectedSubIndex(subIndex)
                  }}
                  className={
                    index === selectedIndex && selectedSubIndex === subIndex
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to={subItem.link} className="nav-link">
                    <FontAwesomeIcon icon={faAngleRight} />
                    {subItem.text}
                    </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  </div>
  )
}

export default SideNavBar
