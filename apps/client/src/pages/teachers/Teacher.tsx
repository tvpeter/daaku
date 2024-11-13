import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faEdit,
  faPrint,
  faDownload,
  faTimes,
  faCogs,
  faRedoAlt,
} from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import userService, {User} from "../../services/userService"
import { AxiosError } from "axios"

const Teacher = () => {
  const { id } = useParams()
  const [user, setUser] = useState<User|null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) setError("Invalid user ID")
    const { request, cancel } = userService.get(Number(id))

    request
      .then((response) => {
        setUser(response.data.result)
      })
      .catch((error) => {
        if (error && error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })

    return () => cancel()
  }, [id])

  return (
    <div className="dashboard-content-one">
      <div className="breadcrumbs-area">
        <h3>Teacher</h3>
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>Teacher Details</li>
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
          {user && (
            <div className="single-info-details">
              <div className="item-content">
                <div className="header-inline item-header">
                  <h3 className="text-dark-medium font-medium">{user.name}</h3>
                  <div className="header-elements">
                    <ul>
                      <li>
                        <a href="#">
                          <FontAwesomeIcon icon={faEdit} />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FontAwesomeIcon icon={faPrint} />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <FontAwesomeIcon icon={faDownload} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="info-table table-responsive">
                  <table className="table text-nowrap">
                    <tbody>
                      <tr>
                        <td>Name:</td>
                        <td className="font-medium text-dark-medium text-capitalize">
                          {user.name}
                        </td>
                      </tr>

                      <tr>
                        <td>Phone:</td>
                        <td className="font-medium text-dark-medium">
                          {user.phone}
                        </td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td className="font-medium text-dark-medium text-lowercase">
                          {user.email}
                        </td>
                      </tr>
                      <tr>
                        <td>Account Status:</td>
                        <td className="font-medium text-dark-medium text-capitalize">{user.status}</td>
                      </tr>
                      <tr>
                        <td>Account Creation Date:</td>
                        <td className="font-medium text-dark-medium">
                          {new Date(user.created_at).toLocaleDateString('en-GB')}
                        </td>
                      </tr>
                      <tr>
                        <td>Last Updated on:</td>
                        <td className="font-medium text-dark-medium">
                          {user.updated_at && new Date(user.updated_at).toLocaleDateString('en-GB')}
                        </td>
                      </tr>
                      <tr>
                        <td>Subject:</td>
                        <td className="font-medium text-dark-medium">
                          English
                        </td>
                      </tr>
                      <tr>
                        <td>className:</td>
                        <td className="font-medium text-dark-medium">2</td>
                      </tr>
                      <tr>
                        <td>Section:</td>
                        <td className="font-medium text-dark-medium">Pink</td>
                      </tr>
                      <tr>
                        <td>ID No:</td>
                        <td className="font-medium text-dark-medium">10005</td>
                      </tr>
                      <tr>
                        <td>Address:</td>
                        <td className="font-medium text-dark-medium">
                          House #10, Road #6, Australia
                        </td>
                      </tr>
                      <tr>
                        <td>Phone:</td>
                        <td className="font-medium text-dark-medium">
                          + 88 98568888418
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Teacher
