import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUsers,
  faHouse,
  faReceipt,
  faSchool,
  faCalendar,
  faBook,
} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Link } from "react-router-dom"

const SideNavBar = () => {
  const [selectedItem, setSelectedItem] = useState(-1); 
  const navData = [
    {
      title: "Dashboard",
      icon: faHouse,
      link: "/app"
    },
    {
      title: "Students",
      icon: faUsers,
      subItems: [
        { link: "/app/students", text: "All Students" },
        { link: "/app/students/register", text: "Register Student" },
        { link: "#", text: "Student Promotion" },
      ],
    },
    {
      title: "Teachers",
      icon: faUsers,
      subItems: [
        { link: "/app/teachers", text: "All Teachers" },
        { link: "/app/teachers/register", text: "Add Teacher" },
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
      title: "Classes",
      icon: faSchool,
      subItems: [
        { link: "/app/studentclass", text: "All Classes" },
        { link: "/app/studentclass/create", text: "Add New Class" },
      ],
    },
    {
      title: "Sessions",
      icon: faCalendar,
      subItems: [
        { link: "/app/session", text: "All Sessions" },
        { link: "/app/session/create", text: "Add New Session" },
      ],
    },
    {
      title: "Subjects",
      icon: faBook,
      subItems: [
        {
          link: "/app/subjects",
          text: "All Subjects",
        },
        {
          link: "/app/subjects/create",
          text: "Create Subject",
        },
      ],
    },
  ]
  return (
    <nav
      id="mainNavbar"
      className="navbar navbar-vertical navbar-expand-lg scrollbar bg-dark navbar-dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="">
        </a>
        <div className="collapse navbar-collapse" id="sidenavCollapse">
        <ul className="navbar-nav mb-lg-7">
        {navData.map((item, index) => (
          <li className="nav-item dropdown" key={index}>
            {item.subItems ? (
              <a
                className="nav-link"
                href={`#collapse${index}`}
                data-bs-toggle="collapse"
                role="button"
                aria-expanded={selectedItem === index ? "true" : "false"}
                aria-controls={`collapse${index}`}
                onClick={() => setSelectedItem(selectedItem === index ? -1 : index)} 
              >
                <FontAwesomeIcon icon={item.icon} className="nav-link-icon" />
                <span>{item.title}</span>
              </a>
            ) : (
              <Link
                to={item.link || "#"}
                className={`nav-link ${selectedItem === index ? "active" : ""}`}
                >
                <FontAwesomeIcon icon={item.icon} className="nav-link-icon" />
                <span>{item.title}</span>
              </Link>
            )}

            {item.subItems && (
              <div
                className={`collapse ${selectedItem === index ? "show" : ""}`}
                id={`collapse${index}`}
              >
                <ul className="nav flex-column">
                  {item.subItems.map((subItem, subIndex) => (
                    <li className="nav-item" key={subIndex}>
                      <Link to={subItem.link} className="nav-link">
                        <span>{subItem.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
        </div>
      </div>
    </nav>
  )

  
}

export default SideNavBar
