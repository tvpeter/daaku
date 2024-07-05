const SideNavBar = () => {
  const navData = [
    {
      title: "Dashboard",
      iconClass: "flaticon-dashboard",
      subItems: [
        { link: "#", text: "Admin" },
        { link: "#", text: "Students" },
        { link: "#", text: "Parents" },
        { link: "#", text: "Teachers" },
      ],
    },
    {
      title: "Students",
      iconClass: "flaticon-classNamemates",
      subItems: [
        { link: "#", text: "All Students" },
        { link: "#", text: "Student Details" },
        { link: "#", text: "Admission Form" },
        { link: "#", text: "Student Promotion" },
      ],
    },
    {
      title: "Teachers",
      iconClass: "flaticon-multiple-users-silhouette",
      subItems: [
        { link: "#", text: "All Teachers" },
        { link: "#", text: "Teacher Details" },
        { link: "#", text: "Add Teacher" },
      ],
    },
    {
      title: "Account",
      iconClass: "flaticon-technological",
      subItems: [
        { link: "#", text: "Fees" },
        { link: "#", text: "Add Fees" },
      ],
    },
    {
      title: "Class Name",
      iconClass:
        "flaticon-maths-className-materials-cross-of-a-pencil-and-a-ruler",
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
              <i className={item.iconClass}></i>
              <span>{item.title}</span>
            </a>
            <ul className="nav sub-group-menu sub-group-active">
              {item.subItems.map((subItem, subIndex) => (
                <li key={subIndex} className="nav-item">
                  <a href={subItem.link} className="nav-link">
                    <i className="fas fa-angle-right"></i>
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
