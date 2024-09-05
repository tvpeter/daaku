import { createBrowserRouter } from "react-router-dom"
import Students from "../pages/Students"
import DashBoard from "../pages/DashBoard"
import Layout from "../components/Layout"
import RegisterStudent from "../pages/RegisterStudent"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <DashBoard /> },
      {
        path: "students",
        children: [
          { path: "", element: <Students /> },
          {
            path: "register",
            element: <RegisterStudent />,
          },
        ],
      },
    ],
  },
])

export default router
