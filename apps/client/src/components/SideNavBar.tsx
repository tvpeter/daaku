import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleRight,
  faUsers,
  faHouse,
  faReceipt,
  faSchool,
} from "@fortawesome/free-solid-svg-icons"

const SideNavBar = () => {
  const navData = [
    {
      title: "Dashboard",
      icon: faHouse,
      subItems: [
        { link: "#", text: "Admin" },
        { link: "#", text: "Students" },
        { link: "#", text: "Parents" },
        { link: "#", text: "Teachers" },
      ],
    },
    {
      title: "Students",
      icon: faUsers,
      subItems: [
        { link: "#", text: "All Students" },
        { link: "#", text: "Student Details" },
        { link: "#", text: "Admission Form" },
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
    <div className="sidebar-menu-content">
      <ul className="nav nav-sidebar-menu sidebar-toggle-view">
        {navData.map((item, index) => (
          <li key={index} className="nav-item sidebar-nav-item">
            <a href="#" className="nav-link">
              <FontAwesomeIcon icon={item.icon} size="2x" color="orange"/>
              <span>{item.title}</span>
            </a>
            <ul className="nav sub-group-menu sub-group-active">
              {item.subItems.map((subItem, subIndex) => (
                <li key={subIndex} className="nav-item">
                  <a href={subItem.link} className="nav-link">
                    <FontAwesomeIcon icon={faAngleRight} />
                    {subItem.text}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideNavBar
