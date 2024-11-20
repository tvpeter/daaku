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
  const [showPassword, setShowPassword] = useState(false)

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
          role: response.data.result.role,
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
    <div className="row align-items-center justify-content-center vh-100">
      <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 py-6">
        <h1 className="mb-2 text-center">Sign In</h1>

        <p className="text-secondary text-center">
          Enter your username and password to login
        </p>
        {error && <div className="text-bg-danger-soft p-3">{error}</div>}
        <form action="" onSubmit={formik.handleSubmit} className="was-validated">
          <div className="row">
            <div className="col-12">
              <div className="mb-4">
                <label className="form-label">Username</label>

                <input
                  type="text"
                  className="form-control is-invalid"
                  placeholder="Your username"
                  id="username"
                  {...formik.getFieldProps("username")}
                  required
                />
              </div>
              {formik.touched.username && formik.errors.username ? (
                <div className="invalid-feedback">{formik.errors.username}</div>
              ) : null}
            </div>

            <div className="col-12">
              <div className="mb-4">
                <div className="row">
                  <div className="col">
                    <label className="form-label">Password</label>
                  </div>

                  <div className="col-auto">
                    <a
                      href=""
                      className="form-text small text-muted link-primary"
                    >
                      Forgot password
                    </a>
                  </div>
                </div>

                <div className="input-group input-group-merge">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control is-invalid"
                    autoComplete="off"
                    data-toggle-password-input
                    id="password"
                    placeholder="Your password"
                    {...formik.getFieldProps("password")}
                    required
                  />

                  <button
                    type="button"
                    className="input-group-text px-4 text-secondary link-primary"
                    data-toggle-password
                    onClick={() => setShowPassword(!showPassword)}
                  >
                  </button>
                </div>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>

          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="remember" />

            <label className="form-check-label" htmlFor="remember">
              Remember me
            </label>
          </div>

          <div className="row align-items-center text-center">
            <div className="col-12">
              <button type="submit" className="btn w-100 btn-primary mt-6 mb-2">
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserLogin
