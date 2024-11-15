import {
  faTimes,
  faCogs,
  faRedoAlt,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import subjectService, { Subject } from "../../services/subjectService"

const Subjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [error, setError] = useState("")
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const { request, cancel } = subjectService.getAll<{
      result: Subject[]
    }>()

    setLoading(true)
    request
      .then((response) => {
        setSubjects(response.data.result)
      })
      .catch((error) => {
        if (error && error instanceof AxiosError) {
          setError(error.response?.data.message)
          setLoading(false)
        } else if (error && error instanceof Error) setError(error.message)
      })
    return () => cancel()
  }, [])

  const handleDelete = (id: number) => {
    subjectService
      .delete(id)
      .then(() => {
        setSubjects((subjects) =>
          subjects.filter((subject) => subject.id !== id)
        )
      })
      .catch((error) => {
        if (error && error instanceof AxiosError) {
          setError(error.response?.data.message)
          setLoading(false)
        } else if (error && error instanceof Error) setError(error.message)
      })
  }

  return (
    <div className="dashboard-content-one">
      <div className="breadcrumbs-area">
        <h3>School Subjects</h3>
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>All Subjects</li>
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
                  <th>Subject</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => (
                  <tr key={subject.id}>
                    <td>{subject.id}</td>
                    <td>{subject.name} </td>

                    <td>
                      <FontAwesomeIcon icon={faEdit} title="Edit" />
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(subject.id)}
                        title="Delete"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-orange-red"
                          title="Delete"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subjects
