import { faTrash, faEdit, faPlus, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import studentClassService, {
  StudentClass,
} from "../../services/studentClassService"
import { AxiosError } from "axios"

const StudentsClass = () => {
  const [studentclass, setStudentclass] = useState<StudentClass[]>([])
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
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
          )
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
                  data-bs-target="#createKeyModal"
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
                          onClick={() => openModal(classDetails.id)}
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

      {/* Modal */}
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
  )
}

export default StudentsClass
