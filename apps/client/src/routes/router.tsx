import { createBrowserRouter } from "react-router-dom"
import Students from "../pages/Students"
import DashBoard from "../pages/DashBoard"
import Layout from "../components/Layout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true,  element: <DashBoard /> },
      { path: "students", element: <Students /> },
    ],
  },
])

export default router
