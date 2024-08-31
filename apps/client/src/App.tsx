import SideNavBar from "./components/SideNavBar";
import HeaderTop from "./components/HeaderTop";
import "./App.css"

function App() {
  return (
    <div id="wrapper" className="wrapper bg-ash">
      <HeaderTop />
      <div className="dashboard-page-one">
        <div className="sidebar-main sidebar-menu-one sidebar-expand-md sidebar-color">
          <div className="mobile-sidebar-header d-md-none">
            <div className="header-logo">
              <a href="index.html">
                <img src="img/logo1.png" alt="logo" />
              </a>
            </div>
          </div>
          <SideNavBar/>
        </div>
      </div>
    </div>
  )
}

export default App
