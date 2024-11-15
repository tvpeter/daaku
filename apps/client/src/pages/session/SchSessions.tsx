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
import sessionService, { SchoolSession } from "../../services/sessionService"
  
  const SchoolSessions = () => {
    const [schoolSessions, setSchoolSessions] = useState<SchoolSession[]>([])
    const [error, setError] = useState("")
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
      const { request, cancel } = sessionService.getAll<{
        result: SchoolSession[]
      }>()
  
      setLoading(true)
      request
        .then((response) => {
          setSchoolSessions(response.data.result)
        })
        .catch((error) => {
          if (error && error instanceof AxiosError) {
            setError(error.response?.data.message)
            setLoading(false)
          } else if (error && error instanceof Error) setError(error.message)
        })
      return () => cancel()
    }, [])
  
    return (
      <div className="dashboard-content-one">
        <div className="breadcrumbs-area">
          <h3>School Sessions</h3>
          <ul>
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>All Sessions</li>
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
                    <th>Name</th>
                    <th>Status</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {schoolSessions.map((sessionDetails) => (
                    <tr key={sessionDetails.id}>
                      <td>{sessionDetails.id}</td>
                      <td>{sessionDetails.name} </td>
                      <td className="text-capitalize">{sessionDetails.status} </td>
                      <td>
                          <FontAwesomeIcon icon={faEdit} title="Edit">
                          </FontAwesomeIcon>
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-orange-red"
                          title="Delete"
                        ></FontAwesomeIcon>
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
  
  export default SchoolSessions
  