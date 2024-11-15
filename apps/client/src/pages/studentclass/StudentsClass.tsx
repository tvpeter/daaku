import {
  faTimes,
  faCogs,
  faRedoAlt,
  faTrash,
  faEdit,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import studentClassService, {
  StudentClass,
} from "../../services/studentClassService"
import { AxiosError } from "axios"
import "../../assets/modal.css"

const StudentsClass = () => {
  const [studentclass, setStudentclass] = useState<StudentClass[]>([])
  const [error, setError] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    const { request, cancel } = studentClassService.getAll<{
      result: StudentClass[]
    }>()

    setLoading(true)
    request
      .then((response) => {
        setStudentclass(response.data.result)
      })
      .catch((error) => {
        if (error && error instanceof AxiosError) {
          setError(error.response?.data.message)
          setLoading(false)
        } else if (error && error instanceof Error) setError(error.message)
      })
    return () => cancel()
  }, [])

  const openModal = (id: number) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setDeleteId(null)
  }

  const confirmDelete = () => {
    if (deleteId !== null) {
      studentClassService
        .delete(deleteId)
        .then(() => {
          setStudentclass((studentclass) =>
            studentclass.filter((stclass) => stclass.id !== deleteId)
          );
        })
        .catch((error) => {
          if (error && error instanceof AxiosError) {
            setError(error.response?.data.message)
            setLoading(false)
          } else if (error && error instanceof Error) setError(error.message)
        })
        .finally(() => {
          closeModal()
        })
    }
  }

  return (
    <div className="dashboard-content-one">
      <div className="breadcrumbs-area">
        <h3>Classes</h3>
        <ul>
          <li>
            <a href="index.html">Home</a>
          </li>
          <li>All Classes</li>
        </ul>
      </div>
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title"></div>
            <div className="dropdown">
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-orange-red"
                    title="Edit"
                  ></FontAwesomeIcon>
                </a>
                <a className="dropdown-item" href="#">
                  <FontAwesomeIcon
                    icon={faCogs}
                    title="Print"
                  ></FontAwesomeIcon>
                </a>
                <a className="dropdown-item" href="#">
                  <FontAwesomeIcon
                    icon={faRedoAlt}
                    className="text-orange-peel"
                    title="Download"
                  ></FontAwesomeIcon>
                </a>
              </div>
            </div>
          </div>

          {error && <div className="text-danger mb-3">{error}</div>}
          {isLoading && (
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          <div className="table-responsive">
            <table className="table display data-table text-nowrap">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Class</th>
                  <th>Created</th>
                  <th>Last Updated</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {studentclass.map((classDetails) => (
                  <tr key={classDetails.id}>
                    <td>{classDetails.id}</td>
                    <td>{classDetails.name} </td>
                    <td>
                      {new Date(classDetails.created_at).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td>
                      {new Date(classDetails.updated_at).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        title="Edit"
                      ></FontAwesomeIcon>
                    </td>
                    <td>
                        <button onClick={() => openModal(classDetails.id)} className="border-0 bg-transparent">
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

            {isModalOpen && (
            <div
            className="modal"
            id="confirmation-modal"
            tabIndex={-1}
            role="dialog"
            aria-hidden="true"
          >
            <div
              className="modal-dialog success-modal-content"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-body">
                  <div className="success-message">
                    <div className="item-icon">
                        <FontAwesomeIcon icon={faExclamationTriangle} size="4x" />
                    </div>
                    <h3 className="item-title">
                      Are you sure you want to delete this class ?
                    </h3>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-warning" onClick={confirmDelete}>
                    Yes, Delete
                  </button>
                  <button
                    type="button"
                    className="footer-btn bg-dark-low"
                    data-dismiss="modal" onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentsClass
