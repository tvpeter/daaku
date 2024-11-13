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

  const onSubmit = (values: User) => {
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
    <div className="dashboard-content-one">
      <div className="breadcrumbs-area">
        <h3>Teacher</h3>
        <ul>
          <li>
            <a href="index.html">Home</a>
          </li>
          <li>Add New Teacher</li>
        </ul>
      </div>
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h3>Add New Teacher</h3>
            </div>

            <div className="dropdown">
              <a
                className="dropdown-toggle"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                ...
              </a>

              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">
                  <i className="fas fa-times text-orange-red"></i>Close
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-cogs text-dark-pastel-green"></i>Edit
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-redo-alt text-orange-peel"></i>Refresh
                </a>
              </div>
            </div>
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}
          {success && (
            <div
              className="alert alert-success fade show"
              role="alert"
            >
              {success}
             
            </div>
          )}
          <form
            className="new-added-form was-validated"
            action=""
            onSubmit={formik.handleSubmit}
          >
            <div className="row">
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Firstname Lastname"
                  className="form-control"
                  id="name"
                  required
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Username *</label>
                <input
                  type="text"
                  placeholder="username"
                  className="form-control"
                  id="username"
                  required
                  {...formik.getFieldProps("username")}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="invalid-feedback">
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>

              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>E-Mail</label>
                <input
                  type="email"
                  placeholder="yourmail@domain.com"
                  className="form-control"
                  id="email"
                  {...formik.getFieldProps("email")}
                  required
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="08130303030"
                  className="form-control"
                  id="phone"
                  required
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="invalid-feedback">{formik.errors.phone}</div>
                ) : null}
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Role</label>
                <select
                  id="role"
                  className="select2 form-control"
                  required
                  {...formik.getFieldProps("role")}
                >
                  <option value="">Please Select Role</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
                {formik.touched.role && formik.errors.role ? (
                  <div className="invalid-feedback">{formik.errors.role}</div>
                ) : null}
              </div>

              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="**************"
                  className="form-control"
                  id="password"
                  required
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="invalid-feedback">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              {/* Todo: Handle file upload */}
              {/* <div className="col-lg-6 col-12 form-group mg-t-30">
                <label className="text-dark-medium">Upload Signature</label>
                <input type="file" className="form-control-file" />
              </div> */}
              <div className="col-12 form-group mg-t-8">
                <button
                  type="submit"
                  className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark"
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="btn-fill-lg bg-blue-dark btn-hover-yellow"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterTeacher
