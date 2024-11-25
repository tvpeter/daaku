import {
  faTrash,
  faEdit,
  faPlus,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import studentClassService, {
  StudentClass,
} from "../../services/studentClassService"
import { AxiosError } from "axios"
import { useFormik } from "formik"
import * as Yup from "yup"

const validationSchema = Yup.object({
  name: Yup.string().required("Class name is required"),
})

const StudentsClass = () => {
  const [studentclass, setStudentclass] = useState<StudentClass[]>([])
  const [error, setError] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState("")
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [success, setSuccess] = useState("")

  useEffect(() => {
    loadStudentClasses()
  }, [])

  const loadStudentClasses = () => {
    const { request, cancel } = studentClassService.getAll<{
      result: StudentClass[]
    }>()

    request
      .then((response) => {
        setStudentclass(response.data.result)
      })
      .catch((error) => {
        if (error && error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })
    return () => cancel()
  }

  const openModal = (id: number, name: string) => {
    setDeleteId(id)
    setSelectedClass(name)
    setIsDeleteModalOpen(true)
  }

  const closeModal = () => {
    setIsDeleteModalOpen(false)
    setDeleteId(null)
  }

  const confirmDelete = () => {
    if (deleteId !== null) {
      studentClassService
        .delete(deleteId)
        .then(() => {
          setStudentclass((studentclass) =>
            studentclass.filter((stclass) => stclass.id !== deleteId)
          )
          setSuccess("Class deleted successfully")
        })
        .catch((error) => {
          if (error && error instanceof AxiosError) {
            setError(error.response?.data.message)
          } else if (error && error instanceof Error) setError(error.message)
        })
        .finally(() => {
          closeModal()
        })
    }
  }

  const initialValues = {
    name: "",
  }

  const onSubmit = (values: { name: string }) => {
    const transformValues = {
      ...values,
      name: values.name.toUpperCase(),
    }

    studentClassService
      .create(transformValues)
      .then(() => {
        setSuccess("Class created successfully")
        formik.resetForm()
        loadStudentClasses()
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
        <h1 className="h2">All Classes</h1>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Classes
            </li>
          </ol>
        </nav>
      </div>

      {error && (
        <div
          className="alert d-flex align-items-center mb-6 text-bg-danger-soft"
          role="alert"
        >
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success fade show" role="alert">
          {success}
        </div>
      )}

      <div className="row mt-9">
        <div className="col d-flex">
          <div className="card border-0 flex-fill w-100">
            <div className="card-header border-0">
              <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
                <h2 className="card-header-title h4 text-uppercase ">
                  Classes
                </h2>

                <button
                  type="button"
                  className="btn btn-primary ms-md-4"
                  data-bs-toggle="modal"
                  data-bs-target="#createClass"
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    height={1}
                    width={14}
                    className="me-1"
                  />
                  Add Class
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle table-hover table-nowrap mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Date Created</th>
                    <th>Date Updated</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody className="list">
                  {studentclass.map((classDetails) => (
                    <tr key={classDetails.id}>
                      <td>{classDetails.id}</td>
                      <td>{classDetails.name}</td>
                      <td>
                        {new Date(classDetails.created_at).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                      <td className="status text-capitalize">
                        {new Date(classDetails.updated_at).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                      <td>
                        {" "}
                        <FontAwesomeIcon
                          icon={faEdit}
                          title="Edit"
                        ></FontAwesomeIcon>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            openModal(classDetails.id, classDetails.name)
                          }
                          className="border-0 bg-transparent"
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-orange-red stretched-link"
                            title="Delete"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-footer">
              <ul className="pagination justify-content-end list-pagination mb-0"></ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="createClass"
        data-bs-backdrop="static"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="createClassTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <form
              className="needs-validation"
              noValidate
              id="createKeyForm"
              onSubmit={formik.handleSubmit}
            >
              <div className="modal-header pb-0">
                <h3 id="createClassTitle" className="modal-title">
                  New Class
                </h3>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Add Class
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  ) : null}
                </div>
              </div>
              <div className="modal-footer pt-0">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div
          className={`modal fade ${isDeleteModalOpen ? "show d-block" : ""}`}
          id="deleteModal"
          tabIndex={-1}
          aria-labelledby="deleteModalLabel"
          aria-hidden={!isDeleteModalOpen}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="deleteModalLabel">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-danger"
                  />
                </h3>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete <code>{selectedClass}</code>{" "}
                  class?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentsClass
