import { createBrowserRouter } from "react-router-dom"
import DashBoard from "../pages/DashBoard"
import Layout from "../components/Layout"
import Students from "../pages/students/Students"
import RegisterStudent from "../pages/students/RegisterStudent"
import Error from "../pages/error/Error"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error/>,
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
