import { useEffect, useState } from "react"
import userService, { User, UserStatus } from "../../services/userService"
import { AxiosError } from "axios"
import {
  faPlus,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const Teachers = () => {
  const [error, setError] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")

  const getUsers = () => {
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
  }

  useEffect(() => {
    getUsers()
  }, [])

  const updateUserStatus = (user: User) => {
    const userData = {
      id: user.id,
      status:
        user.status === UserStatus.Active
          ? UserStatus.Disabled
          : UserStatus.Active,
    }

    userService
      .update(userData)
      .then(() => {
        setSuccess("User updated successfully")
        getUsers()
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
                    <th>Role</th>
                    <th>Status</th>
                    <th>Disable/Enable</th>
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
                      <td className="text-capitalize">{user.role}</td>

                      <td className="text-capitalize">{user.status}</td>
                      <td>
                        <button
                          className="border-0 bg-transparent"
                          onClick={() => updateUserStatus(user)}
                        >
                          <FontAwesomeIcon
                            icon={
                              user.status === UserStatus.Active
                                ? faToggleOn
                                : faToggleOff
                            }
                            title="Edit"
                            height={20}
                            width={20}
                            className={
                              user.status === UserStatus.Active
                                ? "text-primary"
                                : "text-secondary"
                            }
                          />
                        </button>
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
