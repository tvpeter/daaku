import { AxiosError } from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import useSignIn from "react-auth-kit/hooks/useSignIn"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import apiClient from "../../services/apiClient"

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
})

const UserLogin = () => {
  const [error, setError] = useState("")
  const signIn = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values: { username: string; password: string }) => {
    setError("")

    try {
      const response = await apiClient.post("/auth/login", values, {
        withCredentials: true,
      })
      signIn({
        auth: {
          token: response.data.result.accessToken,
        },
        refresh: response.data.result.refreshToken,
        userState: {
          username: values.username,
        },
      })
      navigate("/app")
    } catch (error) {
      if (error && error instanceof AxiosError)
        setError(error.response?.data.message)
      else if (error && error instanceof Error) setError(error.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
    validationSchema,
  })

  return (
    <div className="login-page-wrap">
      <div className="login-page-content">
        <div className="login-box">
          <div className="item-logo">
            {/* <img src="img/logo2.png" alt="logo" /> */}
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}
          <form
            action=""
            className="login-form was-validated"
            onSubmit={formik.handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Enter usrename"
                className="form-control is-invalid"
                id="username"
                {...formik.getFieldProps("username")}
                required
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="invalid-feedback">{formik.errors.username}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="text"
                placeholder="Enter password"
                className="form-control is-invalid"
                id="password"
                {...formik.getFieldProps("password")}
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="form-group d-flex align-items-center justify-content-between">
              <a href="#" className="forgot-btn">
                Forgot Password?
              </a>
            </div>
            <div className="form-group">
              <button type="submit" className="login-btn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
