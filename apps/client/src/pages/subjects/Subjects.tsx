import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import * as Yup from "yup"
import { useFormik } from "formik"
import subjectService, { Subject } from "../../services/subjectService"

const validationSchema = Yup.object({
  name: Yup.string().required("Subject name is required"),
})

const Subjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletedId, setDeleteId] = useState<number | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [subjectToUpdate, setSubjectToUpdate] = useState<Subject | null>(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  const getSubjects = () => {
    const { request, cancel } = subjectService.getAll<{
      result: Subject[]
    }>()

    request
      .then((response) => {
        setSubjects(response.data.result)
      })
      .catch((error) => {
        if (error && error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })
      .finally(() => {})
    return () => cancel()
  }
  useEffect(() => {
    getSubjects()
  }, [])

  const openDeleteModal = (id: number, name: string) => {
    setIsDeleteModalOpen(true)
    setDeleteId(id)
    setSelectedSubject(name)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setSelectedSubject(null)
    setDeleteId(null)
  }

  const confirmDelete = () => {
    if (deletedId) {
      subjectService
        .delete(deletedId)
        .then(() => {
          closeDeleteModal()
          setSubjects((subjects) =>
            subjects.filter((subject) => subject.id !== deletedId)
          )
          setSuccess("Subject deleted successfully")
        })
        .catch((error) => {
          if (error && error instanceof AxiosError) {
            setError(error.response?.data.message)
          } else if (error && error instanceof Error) setError(error.message)
        })
    }
  }

  const initialValues = {
    name: "",
  }

  const onSubmit = (values: { name: string }) => {
    const transformValues = {
      ...values,
      name: values.name.charAt(0).toUpperCase() + values.name.slice(1),
    }

    subjectService
      .create(transformValues)
      .then(() => {
        setSuccess("Subject created successfully")
        getSubjects()
        formik.resetForm()
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

  const onUpdateSubmit = (values: { id: number; name: string }) => {
    const transformValues = {
      ...values,
      name: values.name.charAt(0).toUpperCase() + values.name.slice(1),
    }

    subjectService
      .update(transformValues)
      .then(() => {
        setSuccess("Class updated successfully")
        formik.resetForm()
        getSubjects()
        closeUpdateModal()
      })
      .catch((error) => {
        if (error && error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })
  }

  const openUpdateModal = (subjectToUpdate: Subject) => {
    setSubjectToUpdate(subjectToUpdate)
    setIsUpdateModalOpen(true)
  }

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false)
    setSubjectToUpdate(null)
    updateFormik.resetForm()
  }

  const updateFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: subjectToUpdate?.id || 0,
      name: subjectToUpdate?.name || "",
    },
    onSubmit: onUpdateSubmit,
    validationSchema,
  })

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-baseline justify-content-between">
        <h1 className="h2">All Subjects</h1>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Subjects
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
                  Subjects
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
                  Add Subject
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle table-hover table-nowrap mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>S/N</th>
                    <th>Subject</th>
                    <th>Date Created</th>
                    <th>Date Updated</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody className="list">
                  {subjects.map((subject) => (
                    <tr key={subject.id}>
                      <td>{subject.id}</td>
                      <td>{subject.name}</td>
                      <td>
                        {new Date(subject.created_at).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                      <td className="status text-capitalize">
                        {new Date(subject.updated_at).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                      <td>
                        <button
                          className="border-0 bg-transparent"
                          onClick={() => openUpdateModal(subject)}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            title="Edit"
                          ></FontAwesomeIcon>
                        </button>
                      </td>
                      <td>
                        <button
                          className="border-0 bg-transparent"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteSubjectModal"
                          onClick={() =>
                            openDeleteModal(subject.id, subject.name)
                          }
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

      {/* Creaete subject modal */}
      <div
        className="modal fade"
        id="createClass"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="createClassTitle"
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
                  New Subject
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
                    Subject name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    {...formik.getFieldProps("name")}
                  />
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

      {/* Delete subject modal */}
      {isDeleteModalOpen && selectedSubject && (
        <div
          className={isDeleteModalOpen ? "modal show d-block" : "modal fade"}
          id="deleteSubjectModal"
          tabIndex={-1}
          aria-labelledby="deleteSubjectModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="deleteSubjectModalLabel">
                  Confirm Delete Student
                </h3>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete <code>{selectedSubject}</code>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                  onClick={closeDeleteModal}
                >
                  Close
                </button>
                <button
                  type="button"
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

    
{isUpdateModalOpen && (
        <div
          className={`modal fade ${isUpdateModalOpen ? "show d-block" : ""}`}
          id="updateClassModal"
          data-bs-backdrop="static"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="updateClassModalTitle"
          aria-hidden={!isUpdateModalOpen}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <form
                className="needs-validation"
                noValidate
                id="updateClass"
                onSubmit={updateFormik.handleSubmit}
              >
                <div className="modal-header pb-0">
                  <h3 id="updateClassModalTitle" className="modal-title">
                    Update Class
                  </h3>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={closeUpdateModal}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Class name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      required
                      {...updateFormik.getFieldProps("name")}
                    />
                  </div>
                </div>

                <input type="hidden" {...updateFormik.getFieldProps("id")} />

                <div className="modal-footer pt-0">
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                    onClick={closeUpdateModal}
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
      )}
    </div>
  )
}

export default Subjects
