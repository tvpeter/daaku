import { useEffect, useState } from "react"
import userService, { User } from "../../services/userService"
import { AxiosError } from "axios"
import { Link } from "react-router-dom"

const Teachers = () => {
  const [error, setError] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const { request, cancel } = userService.getAll<{result: User[]}>()

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
    <div className="dashboard-content-one">
      <div className="breadcrumbs-area">
        <h3>Teachers</h3>
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>All Teachers</li>
        </ul>
      </div>
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h3>All Teachers Data</h3>
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            {isLoading && <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>}
            <div className="dropdown">
              <a
                className="dropdown-toggle"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                ...
              </a>

              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">
                  <i className="fas fa-times text-orange-red"></i>Close
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-cogs text-dark-pastel-green"></i>Edit
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-redo-alt text-orange-peel"></i>Refresh
                </a>
              </div>
            </div>
          </div>
          <form className="mg-b-20">
            <div className="row gutters-8">
              <div className="col-3-xxxl col-xl-3 col-lg-3 col-12 form-group">
                <input
                  type="text"
                  placeholder="Search by ID ..."
                  className="form-control"
                />
              </div>
              <div className="col-4-xxxl col-xl-4 col-lg-3 col-12 form-group">
                <input
                  type="text"
                  placeholder="Search by Name ..."
                  className="form-control"
                />
              </div>
              <div className="col-4-xxxl col-xl-3 col-lg-3 col-12 form-group">
                <input
                  type="text"
                  placeholder="Search by Phone ..."
                  className="form-control"
                />
              </div>
              <div className="col-1-xxxl col-xl-2 col-lg-3 col-12 form-group">
                <button
                  type="submit"
                  className="fw-btn-fill btn-gradient-yellow"
                >
                  SEARCH
                </button>
              </div>
            </div>
          </form>
          <div className="table-responsive">
            <table className="table display data-table text-nowrap">
              <thead>
                <tr>
                  <th>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input checkAll"
                      />
                      <label className="form-check-label">ID</label>
                    </div>
                  </th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>E-mail</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Registered on</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-check-label">{user.id}</label>
                      </div>
                    </td>
                    <td className="text-capitalize"><Link to={`/app/teachers/details/${user.id}`}>{user.name}</Link></td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td className="text-capitalize">{user.status}</td>
                    <td className="text-capitalize">{user.role}</td>
                    <td>{ new Date(user.created_at).toLocaleDateString('en-GB')}</td>
                    <td>
                      <div className="dropdown">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span className="flaticon-more-button-of-three-dots"></span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">
                            <i className="fas fa-times text-orange-red"></i>
                            Close
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="fas fa-cogs text-dark-pastel-green"></i>
                            Edit
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="fas fa-redo-alt text-orange-peel"></i>
                            Refresh
                          </a>
                        </div>
                      </div>
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

export default Teachers
