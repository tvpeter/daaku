import { createBrowserRouter } from "react-router-dom"
import Students from "../components/Students"
import DashBoard from "../components/DashBoard"
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
