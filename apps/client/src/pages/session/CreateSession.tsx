import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import { AxiosError } from "axios"
import sessionService from "../../services/sessionService"

const validationSchema = Yup.object({
  name: Yup.string().required("Session name is required"),
})

const CreateSession = () => {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const initialValues = {
    name: "",
  }

  const onSubmit = (values: {name: string}) => {
   
    sessionService
      .create(values)
      .then(() => {
        setSuccess("Session created successfully");
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
        <h3>Session</h3>
      </div>
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h3>Create Session</h3>
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
                <label>Session*</label>
                <input
                  type="text"
                  placeholder="2024/2025"
                  className="form-control"
                  id="name"
                  required
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="col-12 form-group mg-t-8">
                <button
                  type="submit"
                  className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark"
                >
                  Submit
                </button>
            
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateSession;
