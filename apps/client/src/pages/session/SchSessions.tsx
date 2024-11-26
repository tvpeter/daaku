import {
  faTrash,
  faPlus,
  faToggleOn,
  faToggleOff,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import * as Yup from "yup"
import { useFormik } from "formik"

import sessionService, {
  SchoolSession,
  SessionStatus,
} from "../../services/sessionService"

const validationSchema = Yup.object({
  name: Yup.string().required("Session name is required"),
})

const SchoolSessions = () => {
  const [schoolSessions, setSchoolSessions] = useState<SchoolSession[]>([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletedId, setDeleteId] = useState<number | null>(null)
  const [selectedSession, setSelectedSession] = useState<string | null>(null)

  const getSessions = () => {
    const { request, cancel } = sessionService.getAll<{
      result: SchoolSession[]
    }>()

    request
      .then((response) => {
        setSchoolSessions(response.data.result)
      })
      .catch((error) => {
        if (error && error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })
    return () => cancel()
  }

  useEffect(() => {
    getSessions()
  }, [])

  const initialValues = {
    name: "",
  }

  const onSubmit = (values: { name: string }) => {
    sessionService
      .create(values)
      .then(() => {
        setSuccess("Session created successfully")
        formik.resetForm()
        getSessions()
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

  const openDeleteModal = (id: number, name: string) => {
    setIsDeleteModalOpen(true)
    setDeleteId(id)
    setSelectedSession(name)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setSelectedSession(null)
    setDeleteId(null)
  }

  const confirmDelete = () => {
    if (deletedId) {
      sessionService
        .delete(deletedId)
        .then(() => {
          closeDeleteModal()
          setSchoolSessions((schoolSessions) =>
            schoolSessions.filter((session) => session.id !== deletedId)
          )
          setSuccess("Session deleted successfully")
        })
        .catch((error) => {
          if (error && error instanceof AxiosError) {
            setError(error.response?.data.message)
          } else if (error && error instanceof Error) setError(error.message)
        })
    }
  }

  const updateSession = (session: SchoolSession) => {
    const updateData = {
      id: session.id,
      status:
        session.status === SessionStatus.OPEN
          ? SessionStatus.CLOSED
          : SessionStatus.OPEN,
    }
    sessionService
      .update(updateData)
      .then(() => {
        setSuccess("Session status updated successfully")
        getSessions()
      })
      .catch((error) => {
        if (error && error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })
  }

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-baseline justify-content-between">
        <h1 className="h2">School Sessions</h1>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Sessions
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
                  Sessions
                </h2>
                <button
                  type="button"
                  className="btn btn-primary ms-md-4"
                  data-bs-toggle="modal"
                  data-bs-target="#createSession"
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    height={1}
                    width={14}
                    className="me-1"
                  />
                  Add Session
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle table-hover table-nowrap mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Update Status</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody className="list">
                  {schoolSessions.map((sessionDetails, index) => (
                    <tr key={sessionDetails.id}>
                      <td>{index + 1}</td>
                      <td>{sessionDetails.name}</td>
                      <td className="status text-capitalize">
                        {sessionDetails.status}
                      </td>
                      <td>
                        <button
                          className="border-0 bg-transparent"
                          onClick={() => updateSession(sessionDetails)}
                        >
                          <FontAwesomeIcon
                            icon={
                              sessionDetails.status === SessionStatus.OPEN
                                ? faToggleOn
                                : faToggleOff
                            }
                            title="Edit"
                            height={20}
                            width={20}
                            className={
                              sessionDetails.status === SessionStatus.OPEN
                                ? "text-primary"
                                : "text-secondary"
                            }
                          />
                        </button>
                      </td>
                      <td>
                        <button
                          className="border-0 bg-transparent"
                          data-bs-toggle="modal"
                          onClick={() => {
                            openDeleteModal(
                              sessionDetails.id,
                              sessionDetails.name
                            )
                          }}
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

      {/* Creaete session modal */}
      <div
        className="modal fade"
        id="createSession"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="createSessionTitle"
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
                <h3 id="createSessionTitle" className="modal-title">
                  New Session
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
                    Session name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="2024/2025"
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
      {isDeleteModalOpen && selectedSession && (
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
                  Are you sure you want to delete <code>{selectedSession}</code>{" "}
                  Session
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
    </div>
  )
}

export default SchoolSessions
