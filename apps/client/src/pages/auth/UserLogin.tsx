import { useFormik } from "formik"

const UserLogin = () => {

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      console.log(values);
    }
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
                className="login-form"
                onSubmit={formik.handleSubmit}
              >
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Enter usrename"
                    className="form-control"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="text"
                    placeholder="Enter password"
                    className="form-control"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

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
