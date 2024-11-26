import {
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
  const [success, setSuccess] = useState("")

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
                          // onClick={() => openUpdateModal(classDetails)}
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


     
    </div>
  )
}

export default Subjects
