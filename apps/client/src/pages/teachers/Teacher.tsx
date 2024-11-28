import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faDownload,
  faUser,
  faEllipsisH,
  faMapLocation,
  faPhone,
  faAt,
  faCheckCircle,
  faNewspaper,
  faEllipsisV,
  faEye,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import userService, { User } from "../../services/userService"
import { AxiosError } from "axios"
import { faDochub, faGoogleDrive } from "@fortawesome/free-brands-svg-icons"

const Teacher = () => {
  const { id } = useParams()
  const [user, setUser] = useState<User | null>(null)
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
    <div className="container-fluid">
      <div className="d-flex align-items-baseline justify-content-between">
        <h1 className="h2">User</h1>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              User
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
        <div className="col-xl-9 d-flex">
          <div className="card border-0 flex-fill w-100">
            <div className="card-body p-7">
              <div className="row align-items-center h-100">
                <div className="col-auto d-flex ms-auto ms-md-0">
                  <div className="avatar avatar-circle avatar-xxl">
                    <FontAwesomeIcon
                      icon={faUser}
                      width={112}
                      height={112}
                      className="avatar-img"
                    />
                  </div>
                </div>

                <div className="col-auto me-auto d-flex flex-column">
                  <h3 className="mb-0">{user?.name}</h3>
                  <span className="small text-secondary fw-bold d-block mb-4 text-capitalize">
                    {user?.role}
                  </span>

                  <div className="d-flex">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm me-2"
                    >
                      Message
                    </button>

                    <div className="dropdown">
                      <a
                        href="#"
                        className="dropdown-toggle no-arrow d-flex align-items-center justify-content-center btn-light rounded-circle ms-2 text-body w-30px h-30px"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        <FontAwesomeIcon
                          icon={faEllipsisH}
                          height={16}
                          width={16}
                        />
                      </a>
                      <div
                        className="dropdown-menu"
                        data-popper-placement="bottom-end"
                        style={{
                          position: "absolute",
                          inset: "0px 0px auto auto",
                          margin: "0px",
                          transform: "translate3d(-7.5px, 18px, 0px)",
                        }}
                      >
                        <a
                          href="#"
                          className="dropdown-item"
                        >
                          Action
                        </a>
                        <a
                          href="#"
                          className="dropdown-item"
                        >
                          Another action
                        </a>
                        <a
                          href="#"
                          className="dropdown-item"
                        >
                          Something else here
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-auto ms-auto text-center mt-8 mt-md-0">
                  <div className="hstack d-inline-flex gap-6">
                    <div>
                      <h4 className="h2 mb-0">4.2</h4>
                      <p className="text-secondary mb-0">Customer service</p>
                    </div>

                    <div className="vr"></div>

                    <div>
                      <h4 className="h2 mb-0">92%</h4>
                      <p className="text-secondary mb-0">Success rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 d-flex">
          <div className="card border-0 flex-fill w-100">
            <div className="card-body text-center">
              <div className="row align-items-center h-100">
                <div className="col">
                  <small className="text-secondary">Profile completion</small>

                  <div className="chart-container w-100px h-100px mx-auto mt-3">
                    <canvas id="profileCompletionChart"></canvas>

                    <div className="position-absolute top-50 start-50 translate-middle text-center">
                      <h3 className="mb-0">75%</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs" id="userTab">
        <li className="nav-item" role="presentation">
          <a
            href="#"
            className="nav-link active"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            role="tab"
            aria-controls="profile"
            aria-selected="true"
          >
            Profile
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            href="#"
            className="nav-link"
            id="projects-tab"
            data-bs-toggle="tab"
            data-bs-target="#projects"
            role="tab"
            aria-controls="projects"
            aria-selected="false"
          >
            Results
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            href="#"
            className="nav-link d-flex align-items-center"
            id="connections-tab"
            data-bs-toggle="tab"
            data-bs-target="#connections"
            role="tab"
            aria-controls="connections"
            aria-selected="false"
          >
            Connections
            <span className="badge text-bg-dark-soft rounded-circle d-inline-flex align-items-center justify-content-center w-20px h-20px ms-1">
              4
            </span>
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            href="#"
            className="nav-link"
            id="files-tab"
            data-bs-toggle="tab"
            data-bs-target="#files"
            role="tab"
            aria-controls="files"
            aria-selected="false"
          >
            Files
          </a>
        </li>
      </ul>

      <div className="tab-content pt-6" id="userTabContent">
        <div
          className="tab-pane fade show active"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <div className="row">
            <div className="col-xl-4 col-xxl-3">
              <div className="card border-0">
                <div className="card-header border-0">
                  <h2 className="card-header-title h4 text-uppercase mb-3">
                    Profile
                  </h2>
                </div>

                <div className="card-body pt-0">
                  <h3 className="h6 small text-secondary text-uppercase mb-3">
                    About
                  </h3>

                  <ul className="list-unstyled mb-7">
                    <li className="py-2">
                      <FontAwesomeIcon
                        icon={faDochub}
                        height={18}
                        width={18}
                        className="me-2"
                      />
                     {user?.name}
                    </li>
                    <li className="py-2">
                      <FontAwesomeIcon
                        icon={faMapLocation}
                        height={18}
                        width={18}
                        className="me-2"
                      />
                      Houston, Texas
                    </li>
                 
                    <li className="py-2">
                      <FontAwesomeIcon
                        icon={faPhone}
                        height={18}
                        width={18}
                        className="me-2"
                      />
                     {user?.phone}
                    </li>
                    <li className="py-2">
                      <FontAwesomeIcon
                        icon={faAt}
                        height={18}
                        width={18}
                        className="me-2"
                      />
                      {user?.email}
                    </li>
                  </ul>
                  
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card border-0">
                <div className="card-header border-0 card-header-space-between">
                  <h2 className="card-header-title h4 text-uppercase">
                    Subjects
                  </h2>

                  <a
                    href="#projects"
                    data-toggle="tabLink"
                    className="small fw-bold"
                  >
                    View all
                  </a>
                </div>

                <div className="table-responsive">
                  <table
                    id="projectsTable"
                    className="table align-middle table-edge table-nowrap mb-0"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th>Name</th>
                        <th className="w-50">Class</th>
                        <th className="w-150px text-end">No. of Students</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td className="fw-bold">Social Studies</td>
                        <td className="text-muted">JSS 1A</td>
                        <td className="text-end">23</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Social Studies</td>
                        <td className="text-muted">JSS 2A</td>
                        <td className="text-end">90</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-xl">
                  <div className="card border-0 flex-fill w-100">
                    <div className="card-header card-header-space-between">
                      <h2 className="card-header-title h4 text-uppercase">
                        Students
                      </h2>

                      <a
                        href="#connections"
                        data-toggle="tabLink"
                        className="small fw-bold"
                      >
                        View all
                      </a>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-sm table-borderless align-middle mb-3">
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-circle avatar-xs avatar-busy me-2">
                                  <FontAwesomeIcon
                                    icon={faUser}
                                    height={30}
                                    width={30}
                                    className="avatar-img"
                                  />
                                </div>

                                <div className="d-flex flex-column">
                                  <span className="fw-bold d-block">
                                    Dylan Sutton
                                  </span>
                                  <span className="fs-6 text-muted">
                                    10 connections
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="form-check form-state-switch float-end">
                                <input
                                  className="form-state-input"
                                  type="checkbox"
                                  id="connection1"
                                  checked
                                />
                                <label
                                  className="form-state-label"
                                  htmlFor="connection1"
                                >
                                  <span className="form-state-active">
                                    <span className="d-flex align-items-center justify-content-center text-bg-primary ms-auto rounded-circle w-30px h-30px">
                                      <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        height={30}
                                        width={30}
                                      />
                                    </span>
                                  </span>
                                </label>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-xl">
                  <div className="card border-0 flex-fill w-100">
                    <div className="card-header card-header-space-between">
                      <h2 className="card-header-title h4 text-uppercase">
                        Files
                      </h2>

                      <a
                        href="#files"
                        data-toggle="tabLink"
                        className="small fw-bold"
                      >
                        View all
                      </a>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-sm table-borderless align-middle mb-3">
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <FontAwesomeIcon
                                  icon={faNewspaper}
                                  height={30}
                                  width={30}
                                  className="me-3"
                                />

                                <div className="d-flex flex-column">
                                  <span className="fw-bold d-block">
                                    Employee handbook
                                  </span>
                                  <span className="fs-6 text-muted">
                                    Updated 17 mins ago, 18 kb
                                  </span>
                                </div>
                              </div>
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
                                    icon={faEllipsisV}
                                    height={14}
                                    width={14}
                                  />
                                </a>
                                <ul className="dropdown-menu">
                                  <li>
                                    <span className="dropdown-header">
                                      SETTINGS
                                    </span>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                    >
                                      <FontAwesomeIcon
                                        icon={faEye}
                                        height={14}
                                        width={14}
                                        className="me-2"
                                      />
                                      Preview
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <FontAwesomeIcon
                                        icon={faDownload}
                                        height={14}
                                        width={14}
                                        className="me-2"
                                      />
                                      Download
                                    </a>
                                  </li>

                                  <li>
                                    <hr className="dropdown-divider" />
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                    >
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        height={14}
                                        width={14}
                                        className="me-2"
                                      />
                                      Delete
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="tab-pane fade"
          id="projects"
          role="tabpanel"
          aria-labelledby="projects-tab"
        >
          <div className="row mb-6">
            <div className="col-lg-6 col-xl-4">
              <div className="card border-0">
                <div className="card-header border-0 card-header-space-between">
                  <span className="badge text-bg-info-soft flex-grow-0 flex-shrink-0 text-info p-2">
                    In progress - 87%
                  </span>

                  <div className="dropdown">
                    <a
                      href="#"
                      className="dropdown-toggle no-arrow text-muted"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        height={14}
                        width={14}
                      />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                        >
                          Rename project
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                        >
                          Add flag
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                        >
                          Archive project
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item text-danger"
                          href="#"
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title mt-3 mb-7">
                    2023/2024 Exam Computation
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4">
              <div className="card border-0">
                <div className="card-header border-0 card-header-space-between">
                  <span className="badge text-bg-success-soft flex-grow-0 flex-shrink-0 text-success p-2">
                    Completed
                  </span>

                  <div className="dropdown">
                    <a
                      href="#"
                      className="dropdown-toggle no-arrow text-muted"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        height={14}
                        width={14}
                      />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                        >
                          Rename project
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                        >
                          Add flag
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                        >
                          Archive project
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item text-danger"
                          href="#"
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title mt-3 mb-7">2022/2023 Results</h3>
                </div>

                <div className="card-footer border-0">
                  <div className="progress w-100 h-5px"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="tab-pane fade"
          id="connections"
          role="tabpanel"
          aria-labelledby="connections-tab"
        >
          <div className="row">
            <div className="col-lg-6 col-xl-4 col-xxl-3">
              <div className="card border-0">
                <div className="card-header border-0 d-flex justify-content-end">
                  <div className="dropdown flex-grow-0">
                    <a
                      href="#"
                      className="dropdown-toggle no-arrow text-muted"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                        >
                          Rename project
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                        >
                          Add flag
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                        >
                          Archive project
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item text-danger"
                          href="#"
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body text-center">
                  <div className="avatar avatar-xl avatar-circle avatar-busy">
                    <FontAwesomeIcon icon={faUser} className="avatar-img" />
                  </div>

                  <h3 className="card-title mt-3 mb-1">Perry Hart</h3>
                  <p className="fs-5 mb-6 text-muted text-uppercase">
                    Project Manager
                  </p>
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                      <a
                        className="badge text-bg-light p-2"
                        href="#"
                      >
                        Excel
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        className="badge text-bg-light p-2"
                        href="#"
                      >
                        JIRA
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        className="badge text-bg-light p-2"
                        href="#"
                      >
                        Trello
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="tab-pane fade"
          id="files"
          role="tabpanel"
          aria-labelledby="files-tab"
        >
          <div className="row">
            <div className="col">
              <div
                className="card border-0 flex-fill w-100"
                data-list='{"valueNames": ["title", {"name": "updated", "attr": "data-updated"}, {"name": "size", "attr": "data-size"}], "page": 10}'
                id="filesTable"
              >
                <div className="card-header border-0">
                  <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-end">
                    <h2 className="card-header-title h4 text-uppercase">
                      Files
                    </h2>

                    <input
                      className="form-control list-search mw-md-300px ms-md-auto mt-5 mt-md-0 mb-3 mb-md-0"
                      type="search"
                      placeholder="Search in files"
                    />

                    <button
                      type="button"
                      className="btn btn-primary ms-md-4"
                      data-bs-toggle="modal"
                      data-bs-target="#uploadFilesModal"
                    >
                      <FontAwesomeIcon
                        icon={faUpload}
                        height={16}
                        width={16}
                        className="me-1"
                      />
                      Upload
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
                            data-sort="title"
                          >
                            Title
                          </a>
                        </th>
                        <th>
                          <a
                            href="#"
                            className="text-muted list-sort"
                            data-sort="updated"
                          >
                            Last updated
                          </a>
                        </th>
                        <th>
                          <a
                            href="#"
                            className="text-muted list-sort"
                            data-sort="size"
                          >
                            Size
                          </a>
                        </th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="list">
                      <tr>
                        <td className="title">
                          <div className="d-flex align-items-center">
                            <FontAwesomeIcon
                              icon={faGoogleDrive}
                              className="me-3"
                              height={30}
                              width={23}
                            />

                            <div className="d-flex flex-column">
                              <span className="fw-bold d-block">
                                Employee handbook
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="updated" data-updated="1652267547">
                          Updated 17 mins ago
                        </td>
                        <td className="size" data-size="18432">
                          18 kb
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
                                icon={faEllipsisV}
                                height={14}
                                width={14}
                              />
                            </a>
                          </div>
                        </td>
                      </tr>
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
      </div>
    </div>
  )
}

export default Teacher
