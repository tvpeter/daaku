import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import userService, { User, UserStatus } from "../../services/userService"
import { AxiosError } from "axios"

const validationSchema = Yup.object({
  username: Yup.string()
    .matches(/^\S*$/, "Username must be a single word without spaces")
    .required("Username is required"),
  password: Yup.string().required("Password is required"),
  name: Yup.string().required("Staff name is required"),
  phone: Yup.string().matches(
    /^[0-9]{11}$/,
    "Phone number must be exactly 11 digits"
  ),
  email: Yup.string().email().required("Email is required"),
  role: Yup.string().oneOf(
    ["staff", "admin"],
    "Role must be either staff or admin"
  ),
})

const RegisterTeacher = () => {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const initialValues = {
    username: "",
    name: "",
    password: "",
    sig_url: "some_random_string",
    phone: "",
    email: "",
    role: "",
    status: UserStatus.Active,
    created_at: new Date(),
  }

  const onSubmit = (values: Partial<User>) => {
    userService
      .create(values)
      .then(() => {
        setSuccess("User created successfully");
        formik.resetForm();
      })
      .catch((error) => {
        if (error && error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })
  return (
             

    <div className="container-fluid">
    <div className="d-flex align-items-baseline justify-content-between">
      <h1 className="h2">Staff Registration</h1>

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Register Teacher
          </li>
        </ol>
      </nav>
    </div>

    {error && (
      <div
        className={
          "alert d-flex align-items-center mb-6  text-bg-danger-soft"
        }
        role="alert"
      >
        {error}
      </div>
    )}

    {success && (
      <div
        className={"alert d-flex align-items-center mb-6  text-bg-info-soft"}
        role="alert"
      >
        {success}
      </div>
    )}

    <div className="row justify-content-center">
      <div className="col-lg-10 col-xl-9 col-xxl-7 mt-8">
        <form
          className="needs-validation"
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <div className="tab-content mt-3">
            <div className="card border-0 py-6 px-md-6">
              <div className="card-body">
                <h2 className="text-center mb-0">Register Staff</h2>
                <p className="text-secondary text-center">
                  Fill all information
                </p>

                <div className="mb-3">
                  <div className="row">
                    <div className="col-md">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Firstname Lastname"
                        required
                        {...formik.getFieldProps("name")}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="invalid-feedback">
                          {formik.errors.name}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-md">
                      <label htmlFor="username" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="username"
                        required
                        {...formik.getFieldProps("username")}
                      />
                      {formik.touched.username && formik.errors.username ? (
                        <div className="invalid-feedback">
                          {formik.errors.username}
                        </div>
                      ) : null}
                    </div>
                
                    {/* <div className="col-md">
                      <label htmlFor="dob" className="form-label">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dob"
                        placeholder="28/10/2017"
                        {...formik.getFieldProps("dob")}
                        required
                      />
                      {formik.touched.dob && formik.errors.dob ? (
                        <div className="invalid-feedback">
                          {formik.errors.dob}
                        </div>
                      ) : null}
                    </div>
                     */}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="row">
                    <div className="col-md">
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Phone"
                        {...formik.getFieldProps("phone")}
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <div className="invalid-feedback">
                          {formik.errors.phone}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-md">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="invalid-feedback">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="row">
                    <div className="col-md">
                      <label htmlFor="role" className="form-label">
                        Role
                      </label>
                      <select
                        className="form-select"
                        id="role"
                        required
                        {...formik.getFieldProps("role")}
                      >
                        <option value="" label="select"></option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
                      {formik.touched.role && formik.errors.role ? (
                        <div className="invalid-feedback">
                          {formik.errors.role}
                        </div>
                      ) : null}
                    </div>


                    <div className="col-md">
                      <label
                        htmlFor="password"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="*********"
                        {...formik.getFieldProps("password")}
                        required
                      />
                      {formik.touched.password &&
                      formik.errors.password ? (
                        <div className="invalid-feedback">
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              
              </div>

              <div className="card-footer">
                <div className="d-flex justify-content-end mt-5">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default RegisterTeacher
