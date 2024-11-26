import { createBrowserRouter } from "react-router-dom"
import DashBoard from "../pages/DashBoard"
import Layout from "../components/Layout"
import Students from "../pages/students/Students"
import RegisterStudent from "../pages/students/RegisterStudent"
import Error from "../pages/error/"
import Teachers from "../pages/teachers/Teachers"
import Teacher from "../pages/teachers/Teacher"
import RegisterTeacher from "../pages/teachers/RegisterTeacher"
import UserLogin from "../pages/auth/UserLogin"
import AuthOutlet from "@auth-kit/react-router/AuthOutlet"
import StudentsClass from "../pages/studentclass/StudentsClass"
import SchoolSessions from "../pages/session/SchSessions"
import CreateSession from "../pages/session/CreateSession"
import Subjects from "../pages/subjects/Subjects"
import Student from "../pages/students/Student"

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    children: [
      { index: true, element: <UserLogin /> },
      {
        path: "app",
        element: <AuthOutlet fallbackPath="/" />,
        children: [
          {
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
                  {
                    path: "details/:id",
                    element: <Student />,
                  },
                ],
              },
              {
                path: "teachers",
                children: [
                  { path: "", element: <Teachers /> },
                  { path: "details/:id", element: <Teacher /> },
                  { path: "register", element: <RegisterTeacher /> },
                ],
              },
              {
                path: "studentclass",
                children: [
                  {
                    path: "",
                    element: <StudentsClass />,
                  },
                ],
              },
              {
                path: "session",
                children: [
                  {
                    path: "",
                    element: <SchoolSessions />,
                  },
                  {
                    path: "create",
                    element: <CreateSession />,
                  },
                ],
              },
              {
                path: "subjects",
                children: [
                  {
                    path: "",
                    element: <Subjects />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
])

export default router
