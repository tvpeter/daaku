import { useEffect, useState } from "react"
import userService, { User } from "../../services/userService"
import { AxiosError } from "axios"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const Teachers = () => {
  const [error, setError] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const { request, cancel } = userService.getAll<{ result: User[] }>()

    setLoading(true)
    request
      .then((response) => {
        setUsers(response.data.result)
        setLoading(false)
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
    <div className="container-fluid">
      <div className="d-flex align-items-baseline justify-content-between">
        <h1 className="h2">All Staff</h1>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Teachers
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

      <div className="row mt-9">
        <div className="col d-flex">
          <div className="card border-0 flex-fill w-100">
            <div className="card-header border-0">
              <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
                <h2 className="card-header-title h4 text-uppercase ">
                  Teachers
                </h2>
                <Link to="/app/teachers/register">
                  <button type="button" className="btn btn-primary ms-md-4">
                    <FontAwesomeIcon
                      icon={faPlus}
                      height={1}
                      width={14}
                      className="me-1"
                    />
                    Register Staff
                  </button>
                </Link>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle table-hover table-nowrap mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email Address</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Registered Date</th>
                    <th>View</th>
                  </tr>
                </thead>

                <tbody className="list">
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      <td className="text-capitalize">{user.status}</td>
                      <td className="text-capitalize">{user.role}</td>
                      <td>
                        {new Date(user.created_at).toLocaleDateString("en-GB")}
                      </td>
                      <td>
                        <Link to={`/app/teachers/details/${user.id}`}>
                          <button
                            type="button"
                            className="btn btn-sm text-bg-info-soft border-0"
                          >
                            View
                          </button>
                        </Link>
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

export default Teachers
