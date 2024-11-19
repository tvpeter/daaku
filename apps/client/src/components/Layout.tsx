import { Outlet } from "react-router-dom"
import Header from "./Header"
import SideNavBar from "./SideNavBar"
import Footer from "./Footer"

function Layout() {
  return (
    <>
      <SideNavBar />
      <main>
        <Header />
        <Outlet />
        <Footer />
      </main>
    </>
  )
}

export default Layout
