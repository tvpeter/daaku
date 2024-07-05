import SideNavBar from "./components/SideNavBar";
import "./App.css"

function App() {
  return (
    <div id="wrapper" className="wrapper bg-ash">
      <div className="navbar navbar-expand-md header-menu-one bg-light">
        <div className="nav-bar-header-one">
          <div className="header-logo">
            <a href="index.html">
              <img src="img/logo.png" alt="logo" />
            </a>
          </div>
          <div className="toggle-button sidebar-toggle">
            <button type="button" className="item-link">
              <span className="btn-icon-wrap">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
        <div className="d-md-none mobile-nav-bar">
          <button
            className="navbar-toggler pulse-animation"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-navbar"
            aria-expanded="false"
          >
            <i className="far fa-arrow-alt-circle-down"></i>
          </button>
          <button
            type="button"
            className="navbar-toggler sidebar-toggle-mobile"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div
          className="header-main-menu collapse navbar-collapse"
          id="mobile-navbar"
        >
          <ul className="navbar-nav">
            <li className="navbar-item header-search-bar">
              <div className="input-group stylish-input-group">
                <span className="input-group-addon">
                  <button type="submit">
                    <span className="flaticon-search" aria-hidden="true"></span>
                  </button>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Find Something . . ."
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
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
