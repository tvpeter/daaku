import { useEffect, useState } from "react"
import studentService, { Student } from "../../services/studentService"
import { AxiosError } from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH, faPlus } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const Students = () => {
  const [error, setError] = useState("")
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setLoading] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletedId, setDeleteId] = useState<number | null>(null)
  const [selectedStudent, setSelectedStudent] = useState("")

  useEffect(() => {
    const { request, cancel } = studentService.getAll<{ result: Student[] }>()

    setLoading(true)
    request
      .then((response) => {
        setStudents(response.data.result)
        setLoading(false)
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })
    setLoading(false)

    return () => cancel()
  }, [])

  const openDeleteModal = (id: number, name: string) => {
    setIsDeleteModalOpen(true)
    setDeleteId(id)
    setSelectedStudent(name)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setSelectedStudent("")
    setDeleteId(null)
  }
  const confirmDelete = () => {
    if (deletedId !== null) {
      studentService
        .delete(deletedId)
        .then(() => {
          setStudents((students) =>
            students.filter((student) => student.id !== deletedId)
          )
        })
        .catch((error) => {
          if (error && error instanceof AxiosError) {
            setError(error.response?.data.message)
            setLoading(false)
          } else if (error && error instanceof Error) setError(error.message)
        })
        .finally(() => {
          closeDeleteModal()
        })
    }
  }
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex align-items-baseline justify-content-between">
          <h1 className="h2">All Students</h1>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Pages</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Students
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

        {isLoading && (
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}

        <div className="row">
          <div className="col d-flex">
            <div
              className="card border-0 flex-fill w-100"
              data-list='{"valueNames": ["name", {"name": "key", "attr": "data-key"}, {"name": "status", "attr": "data-status"}, {"name": "created", "attr": "data-created"}], "page": 100}'
              id="keysTable"
            >
              <div className="card-header border-0">
                <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-end">
                  <h2 className="card-header-title h4 text-uppercase">
                    Students
                  </h2>

                  <input
                    className="form-control list-fuzzy-search mw-md-300px ms-md-auto mt-5 mt-md-0 mb-3 mb-md-0"
                    type="search"
                    placeholder="Search students"
                  />

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
                    Register Student
                  </button>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table align-middle table-hover table-nowrap mb-0">
                  <thead className="thead-light">
                    <tr>
                      <th>
                        <a
                          href="#"
                          className="text-muted list-sort"
                          data-sort="index"
                        >
                          S/N
                        </a>
                      </th>
                      <th>
                        <a
                          href="#"
                          className="text-muted list-sort"
                          data-sort="name"
                        >
                          Name
                        </a>
                      </th>
                      <th>
                        <a
                          href="#"
                          className="text-muted list-sort"
                          data-sort="admission_number"
                        >
                          Adm No.
                        </a>
                      </th>
                      <th>
                        <a
                          href="#"
                          className="text-muted list-sort"
                          data-sort="gender"
                        >
                          Gender
                        </a>
                      </th>
                      <th>
                        <a
                          href="#"
                          className="text-muted list-sort"
                          data-sort="session.name"
                        >
                          Session
                        </a>
                      </th>
                      <th>
                        <a
                          href="#"
                          className="text-muted list-sort"
                          data-sort="class.name"
                        >
                          Class
                        </a>
                      </th>
                      <th>
                        <a
                          href="#"
                          className="text-muted list-sort"
                          data-sort="created_at"
                        >
                          Reg. Date
                        </a>
                      </th>
                      <th>
                        <a href="#" className="text-muted list-sort">
                          Action
                        </a>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="list">
                    {students.map((student, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="name">
                          <Link
                            to={`/app/students/details/${student.id}`}
                            className="text-gray-600"
                          >
                            {student.name}
                          </Link>
                        </td>
                        <td>{student.admission_number}</td>
                        <td className="status text-capitalize">
                          {student.gender}
                        </td>
                        <td className="created">{student.session.name}</td>
                        <td className="created">{student.class?.name}</td>
                        <td className="created">
                          {new Date(student.created_at).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td>
                          <div className="dropdown float-end">
                            <a
                              href="#"
                              className="dropdown-toggle no-arrow d-flex text-secondary"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <FontAwesomeIcon
                                icon={faEllipsisH}
                                height={14}
                                width={14}
                              />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href="#">
                                  Edit
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-warning"
                                  href="#"
                                >
                                  Suspend
                                </a>
                              </li>
                              <li>
                                <hr className="dropdown-divider" />
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="dropdown-item text-danger"
                                  data-bs-toggle="modal"
                                  data-bs-target="#deleteStudentModal"
                                  onClick={() =>
                                    openDeleteModal(student.id, student.name)
                                  }
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
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
      </div>

      {/* Delete student modal */}
      {isDeleteModalOpen && selectedStudent && (
        <div
          className="modal fade"
          id="deleteStudentModal"
          tabIndex={-1}
          aria-labelledby="deleteStudentModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="deleteStudentModalLabel">
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
                  Are you sure you want to delete <code>{selectedStudent}</code>
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
    </>
  )
}

export default Students
