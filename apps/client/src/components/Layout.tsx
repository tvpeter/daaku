import { Outlet } from "react-router-dom"
import "../App.css"
import Header from "./Header"
import SideNavBar from "./SideNavBar"

function App() {
  return (
    <div id="wrapper" className="wrapper bg-ash">
      <Header />
      <div className="dashboard-page-one">
        <SideNavBar />

        <Outlet />
      </div>
    </div>
  )
}

export default App
