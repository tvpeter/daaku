import { useFormik } from "formik"
import * as Yup from "yup"

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
})

const UserLogin = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values)
    },
    validationSchema,
  })

  return (
    <div className="login-page-wrap">
      <div className="login-page-content">
        <div className="login-box">
          <div className="item-logo">
            <img src="img/logo2.png" alt="logo" />
          </div>
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
                name="username"
                id="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="invalid-feedback">{formik.errors.username}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="text"
                placeholder="Enter password"
                className="form-control is-invalid"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
