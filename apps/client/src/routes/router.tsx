import { createBrowserRouter } from "react-router-dom"
import DashBoard from "../pages/DashBoard"
import Layout from "../components/Layout"
import Students from "../pages/students/Students"
import RegisterStudent from "../pages/students/RegisterStudent"
import Error from "../pages/error/"
import Teachers from "../pages/teachers/Teachers"

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
      {
        path: "teachers",
        children: [
          { path: "", element: <Teachers/>}
        ]
      }
    ],
  },
])

export default router
