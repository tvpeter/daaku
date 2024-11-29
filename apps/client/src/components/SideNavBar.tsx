import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUsers,
  faHouse,
  faCogs,
  faUserTie,
  faBook,
} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Link } from "react-router-dom"

const SideNavBar = () => {
  const [selectedItem, setSelectedItem] = useState(-1)
  const navData = [
    {
      title: "Dashboard",
      icon: faHouse,
      link: "/app",
    },
    {
      title: "Students",
      icon: faUsers,
      subItems: [
        { link: "/app/students", text: "All Students" },
        { link: "/app/students/class", text: "Students In A Class" },
        { link: "/app/students/register", text: "Register Student" },
      ],
    },
    {
      title: "Subjects",
      icon: faBook,
      subItems: [
        { link: "/app/subjects/class", text: "Subject for Class Students" },
      ],
    },
    {
      title: "Teachers",
      icon: faUserTie,
      subItems: [
        { link: "/app/teachers", text: "All Teachers" },
        { link: "/app/teachers/register", text: "Add Teacher" },
      ],
    },
    {
      title: "Settings",
      icon: faCogs,
      subItems: [
        { link: "/app/settings/class", text: "Classes" },
        { link: "/app/settings/session", text: "Session" },
        { link: "/app/settings/subjects", text: "Subjects" },
      ],
    },
   
  ]
  return (
    <nav
      id="mainNavbar"
      className="navbar navbar-vertical navbar-expand-lg scrollbar bg-dark navbar-dark"
    >
      <div className="container-fluid">
        <Link to="/app" className="navbar-brand">
          <img
            src="/img/logo.png"
            className="navbar-brand-img logo-dark logo-large"
            alt="Sch Logo"
            width="60"
            height="50"
          />
          Daaku
        </Link>
        <a
          href="#"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#sidenavCollapse"
          aria-controls="sidenavCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
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
                    onClick={() =>
                      setSelectedItem(selectedItem === index ? -1 : index)
                    }
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="nav-link-icon"
                    />
                    <span>{item.title}</span>
                  </a>
                ) : (
                  <Link
                    to={item.link || "#"}
                    className={`nav-link ${selectedItem === index ? "active" : ""}`}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="nav-link-icon"
                    />
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
