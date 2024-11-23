import {
  faAws,
  faFirefoxBrowser,
  faGoogle,
  faGooglePay,
  faMagento,
  faPaypal,
  faSlack,
  faTrello,
} from "@fortawesome/free-brands-svg-icons"
import {
  faAt,
  faBell,
  faExclamation,
  faFileSignature,
  faMessage,
  faNewspaper,
  faPen,
  faPhone,
  faTrash,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import studentService, {
  Student as StudentInterface,
} from "../../services/studentService"
import { AxiosError } from "axios"
import sessionService, { SchoolSession } from "../../services/sessionService"

function Student() {
  const [error, setError] = useState("")
  const [student, setStudent] = useState<StudentInterface | null>(null)
  const { id } = useParams()
  const [sessions, setSessions] = useState<SchoolSession[]>([])

  useEffect(() => {
    if (!id) setError("Student was not selected")

    const { request, cancel } = studentService.get(Number(id))

    request
      .then((response) => {
        setStudent(response.data.result)
      })
      .catch((error) => {
        if (error && error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })

    const { request: sessionRequest, cancel: sessionCancel } =
      sessionService.getAll<{ result: SchoolSession[] }>()

    sessionRequest
      .then((res) => {
        setSessions(res.data.result)
      })
      .catch((error) => {
        if (error && error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })

    return () => {
      cancel(), sessionCancel()
    }
  }, [])

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-baseline justify-content-between">
        <h1 className="h2">Student Details</h1>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Student
            </li>
          </ol>
        </nav>
      </div>

      {error && <div className="text-danger mb-3">{error}</div>}

      {student && (
        <div className="row">
          <div className="col-md-4 col-xxl-3">
            <div className="card border-0 sticky-md-top top-10px">
              <div className="card-body">
                <div className="text-center mb-5">
                  <div className="avatar avatar-xxl avatar-circle mb-5">
                    <label className="d-block cursor-pointer">
                      <span className="position-absolute bottom-0 end-0 m-0 text-bg-primary w-30px h-30px rounded-circle d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon icon={faPen} height={14} width={14} />
                      </span>
                      <input type="file" name="avatar" className="d-none" />
                    </label>
                    <FontAwesomeIcon
                      icon={faUser}
                      className="avatar-img"
                      height={112}
                      width={112}
                    />
                  </div>

                  <h3 className="mb-0">{student.name}</h3>
                  <span className="small text-secondary fw-semibold">
                    {student.admission_number}
                  </span>
                </div>

                <hr className="mb-0" />
              </div>

              <ul
                className="scrollspy mb-5"
                id="account"
                data-scrollspy='{"offset": "30"}'
              >
                <li className="active">
                  <a
                    href="#basicInformationSection"
                    className="d-flex align-items-center py-3"
                  >
                    <FontAwesomeIcon
                      icon={faUserAlt}
                      height={14}
                      width={14}
                      className="me-3"
                    />
                    Student Data
                  </a>
                </li>

                <li>
                  <a
                    href="#usernameSection"
                    className="d-flex align-items-center py-3"
                  >
                    <FontAwesomeIcon
                      icon={faNewspaper}
                      height={14}
                      width={14}
                      className="me-3"
                    />
                    Subjects
                  </a>
                </li>

                <li>
                  <a
                    href="#passwordSection"
                    className="d-flex align-items-center py-3"
                  >
                    <FontAwesomeIcon
                      icon={faMagento}
                      height={14}
                      width={14}
                      className="me-3"
                    />
                    Previous Results
                  </a>
                </li>

                <li>
                  <a
                    href="#privacyAndSafetySection"
                    className="d-flex align-items-center py-3"
                  >
                    <FontAwesomeIcon
                      icon={faNewspaper}
                      height={14}
                      width={14}
                      className="me-3"
                    />
                    Privacy and Safety
                  </a>
                </li>

                <li>
                  <a
                    href="#paymentMethodsSection"
                    className="d-flex align-items-center py-3"
                  >
                    <FontAwesomeIcon
                      icon={faFileSignature}
                      height={14}
                      width={14}
                      className="me-3"
                    />
                    Payments
                  </a>
                </li>

                <li>
                  <a
                    href="#notificationsSection"
                    className="d-flex align-items-center py-3"
                  >
                    <FontAwesomeIcon
                      icon={faBell}
                      height={14}
                      width={14}
                      className="me-3"
                    />
                    Notifications
                  </a>
                </li>

                <li>
                  <a
                    href="#connectedAccountsSection"
                    className="d-flex align-items-center py-3"
                  >
                    <FontAwesomeIcon
                      icon={faTrello}
                      height={14}
                      width={14}
                      className="me-3"
                    />
                    Connected accounts
                  </a>
                </li>

                <li>
                  <a
                    href="#deleteAccountSection"
                    className="d-flex align-items-center py-3"
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      height={14}
                      width={14}
                      className="me-3"
                    />
                    Delete account
                  </a>
                </li>
              </ul>

              <div className="card-footer text-center">
                <a href="user.html" className="btn btn-secondary">
                  View Public Profile
                </a>
              </div>
            </div>
          </div>

          <div className="col">
            <form noValidate>
              <div
                className="card border-0 scroll-mt-3"
                id="basicInformationSection"
              >
                <div className="card-header">
                  <h2 className="h3 mb-0">Basic information</h2>
                </div>

                <div className="card-body">
                  <div className="row mb-4">
                    <div className="col-lg-3">
                      <label htmlFor="fullName" className="col-form-label">
                        Full Name
                      </label>
                    </div>

                    <div className="col-lg">
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        value={student.name}
                      />
                      <div className="invalid-feedback">
                        Please add your full name
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-lg-3">
                      <label htmlFor="phone" className="col-form-label">
                        Gender
                      </label>
                    </div>

                    <div className="col-lg">
                      <div className="mb-4">
                        <select
                          className="form-select"
                          id="gender"
                          required
                          autoComplete="off"
                          disabled
                        >
                          <option value={student.gender} selected>
                            {student.gender.charAt(0).toUpperCase() +
                              student.gender.slice(1)}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-lg-3">
                      <label htmlFor="emailAddress" className="col-form-label">
                        Date of Birth
                      </label>
                    </div>

                    <div className="col-lg">
                      <input
                        type="date"
                        className="form-control"
                        id="dob"
                        value={student.dob}
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-lg-3">
                      <label htmlFor="phone" className="col-form-label">
                        Phone
                      </label>
                    </div>

                    <div className="col-lg">
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={student.phone}
                      />
                      <div className="invalid-feedback">
                        Please add your phone number
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-lg-3">
                      <label htmlFor="emailAddress" className="col-form-label">
                        Email address
                      </label>
                    </div>

                    <div className="col-lg">
                      <input
                        type="text"
                        className="form-control"
                        id="emailAddress"
                        value={student.email}
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-lg-3">
                      <label htmlFor="overview" className="col-form-label">
                        Address
                      </label>
                    </div>

                    <div className="col-lg">
                      <textarea className="form-control" id="overview" rows={4}>
                        {student.address}
                      </textarea>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-lg-3">
                      <label htmlFor="emailAddress" className="col-form-label">
                        Admission Number
                      </label>
                    </div>

                    <div className="col-lg">
                      <input
                        type="text"
                        className="form-control"
                        id="admission_number"
                        value={student.admission_number}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-lg-3">
                      <label htmlFor="emailAddress" className="col-form-label">
                        Current Session:
                      </label>
                    </div>

                    <div className="col-lg">
                      <div className="mb-4">
                        <select
                          className="form-select"
                          id="current_session_id"
                          required
                          autoComplete="off"
                        >
                          <option value={student.session.id} selected>
                            {student.session.name}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-lg-3">
                      <label htmlFor="class_id" className="col-form-label">
                        Current Session
                      </label>
                    </div>

                    <div className="col-lg">
                      <div className="mb-4">
                        <select
                          className="form-select"
                          id="current_class_id"
                          required
                          autoComplete="off"
                          value={student?.session?.id || ""}
                        >
                          {sessions && sessions.map((session) => (
                            <option key={session.id} value={session.id} >
                              {session.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-lg-3">
                      <label htmlFor="created_at" className="col-form-label">
                        Date Registered
                      </label>
                    </div>

                    <div className="col-lg">
                      <input
                        type="text"
                        className="form-control"
                        id="created_at"
                        disabled
                        value={new Date(student.created_at).toLocaleDateString(
                          "en-GB"
                        )}
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-lg-3">
                      <label htmlFor="updated_at" className="col-form-label">
                        Last Updated
                      </label>
                    </div>

                    <div className="col-lg">
                      <input
                        type="text"
                        className="form-control"
                        id="updated_at"
                        disabled
                        value={new Date(student.updated_at).toLocaleDateString(
                          "en-GB"
                        )}
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-5">
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>

              <div className="card border-0 scroll-mt-3" id="usernameSection">
                <div className="card-header">
                  <h2 className="h3 mb-0">Username</h2>
                </div>

                <div className="card-body">
                  <p className="small text-muted mb-3">
                    Your current username is <strong>@ellietucker</strong>
                  </p>

                  <div className="row mb-4">
                    <div className="col-lg-3">
                      <label htmlFor="username" className="col-form-label">
                        Username
                      </label>
                    </div>

                    <div className="col-lg">
                      <div className="input-group">
                        <span className="input-group-text" id="username-addon">
                          <FontAwesomeIcon icon={faAt} height={10} width={10} />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="username"
                          value="ellietucker"
                          aria-describedby="username-addon"
                        />
                      </div>
                      <div className="invalid-feedback">
                        Please add a new username
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-5">
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>

              <div className="card border-0 scroll-mt-3" id="passwordSection">
                <div className="card-header">
                  <h2 className="h3 mb-0">Password</h2>
                </div>

                <div className="card-body">
                  <div className="row mb-4">
                    <div className="col-lg-3">
                      <label
                        htmlFor="currentPassword"
                        className="col-form-label"
                      >
                        Current password
                      </label>
                    </div>

                    <div className="col-lg">
                      <input
                        type="password"
                        className="form-control"
                        id="currentPassword"
                      />
                      <div className="invalid-feedback">
                        Please add your current password
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-lg-3">
                      <label htmlFor="newPassword" className="col-form-label">
                        New password
                      </label>
                    </div>

                    <div className="col-lg">
                      <div className="input-group input-group-merge">
                        <input
                          type="password"
                          className="form-control"
                          id="newPassword"
                          autoComplete="off"
                          data-toggle-password-input
                          placeholder="Your new password"
                        />

                        <button
                          type="button"
                          className="input-group-text px-4 text-secondary link-primary"
                          data-toggle-password
                        ></button>
                      </div>

                      <div className="invalid-feedback">
                        Please add a new password
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-3 h-15px">
                        <div className="progress d-flex flex-grow-1 h-7px"></div>
                        <span
                          className="text-muted fs-6"
                          id="progressText"
                        ></span>
                      </div>
                    </div>

                    <div className="col-lg">
                      <div className="input-group input-group-merge">
                        <input
                          type="password"
                          className="form-control"
                          id="newPasswordAgain"
                          autoComplete="off"
                          data-toggle-password-input
                          placeholder="Confirm your new password"
                        />

                        <button
                          type="button"
                          className="input-group-text px-4 text-secondary link-primary"
                          data-toggle-password
                        ></button>
                      </div>

                      <div className="invalid-feedback">
                        Please confirm your new password again
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg offset-lg-3">
                      <div className="alert alert-light mw-450px" role="alert">
                        <h4 className="mb-3">Password requirements:</h4>
                        <ul className="p-3 mb-0">
                          <li>
                            Minimum 8 characters long - the more, the better
                          </li>
                          <li>At least one lowercase character</li>
                          <li>At least one uppercase character</li>
                          <li>
                            At least one number, symbol, or whitespace character
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-5">
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="card border-0 scroll-mt-3"
                id="privacyAndSafetySection"
              >
                <div className="card-header">
                  <h2 className="h3 mb-0">Privacy and Safety</h2>
                </div>

                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <div className="me-2">
                        <h3 className="h4 mb-0">Use 2-Step Verification</h3>
                        <p className="small text-muted mb-0">
                          Ut vel lectus vel sem pretium pharetra
                        </p>
                      </div>
                      <div className="form-check form-switch mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="twoStepVerification"
                        />
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <div className="me-2">
                        <h3 className="h4 mb-0">Search History</h3>
                        <p className="small text-muted mb-0">
                          Nunc suscipit est quis tincidunt lobortis
                        </p>
                      </div>

                      <button
                        type="button"
                        className="btn btn-sm text-bg-info-soft border-0"
                      >
                        View
                      </button>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <div className="me-2">
                        <h3 className="h4 mb-0">Login activity</h3>
                        <p className="small text-muted mb-0">
                          Nunc eget libero posuere, cursus mi tincidunt, mattis
                          nisi
                        </p>
                      </div>

                      <button
                        type="button"
                        className="btn btn-sm text-bg-info-soft border-0"
                      >
                        View
                      </button>
                    </li>
                  </ul>

                  <div className="d-flex justify-content-end mt-5">
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="card border-0 scroll-mt-3"
                id="paymentMethodsSection"
              >
                <div className="card-header">
                  <h2 className="h3 mb-0">Payment methods</h2>
                </div>

                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faPaypal} />

                        <div className="ms-4">
                          <h3 className="h4 mb-0">Visa ending in 4321</h3>
                          <p className="small text-muted mb-0">
                            Expires 9/2024
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge text-bg-light p-2 fs-6 me-2">
                          Default
                        </span>

                        <div className="dropdown">
                          <a
                            href="#"
                            className="dropdown-toggle no-arrow d-flex mx-2 text-secondary"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <FontAwesomeIcon icon={faGooglePay} />
                          </a>
                          <div className="dropdown-menu">
                            <a href="#" className="dropdown-item">
                              Action
                            </a>
                            <a href="#" className="dropdown-item">
                              Another action
                            </a>
                            <a href="#" className="dropdown-item">
                              Something else here
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>

                  <div className="d-flex justify-content-end mt-5">
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="card border-0 scroll-mt-3"
                id="notificationsSection"
              >
                <div className="card-header">
                  <h2 className="h3 mb-0">Notifications</h2>
                </div>

                <div className="card-body">
                  <p className="text-muted">
                    In this setcion you will be able to configure the behaviour
                    of notifications in Dashly
                  </p>

                  <div className="table-responsive">
                    <table
                      id="notificationsTable"
                      className="table align-middle"
                    >
                      <thead className="thead-light">
                        <tr>
                          <th className="text-uppercase py-4 align-middle min-w-300px min-w-md-auto">
                            Type
                          </th>
                          <th className="text-center text-uppercase py-4">
                            <FontAwesomeIcon
                              icon={faMessage}
                              height={24}
                              width={24}
                            />
                            Email
                          </th>
                          <th className="text-center text-uppercase py-4">
                            <FontAwesomeIcon
                              icon={faFirefoxBrowser}
                              height={24}
                              width={24}
                            />
                            Browser
                          </th>
                          <th className="text-center text-uppercase py-4">
                            <FontAwesomeIcon
                              icon={faPhone}
                              height={30}
                              width={30}
                            />
                            App
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <h3 className="h4 mb-0">
                              Enable E-mail notification
                            </h3>
                            <p className="small text-muted mb-0">
                              Lorem ipsum dolor sit amet
                            </p>
                          </td>
                          <td className="text-center">
                            <div className="form-check form-check-inline m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="form-check form-check-inline m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="form-check form-check-inline m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h3 className="h4 mb-0">
                              Enable New Friend Notifications
                            </h3>
                            <p className="small text-muted mb-0">
                              Nunc suscipit est quis tincidunt lobortis
                            </p>
                          </td>
                          <td className="text-center">
                            <div className="form-check form-check-inline m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="form-check form-check-inline m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="form-check form-check-inline m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h3 className="h4 mb-0">
                              Enable New Comment Notifications
                            </h3>
                            <p className="small text-muted mb-0">
                              Nunc eget libero posuere, cursus mi tincidunt,
                              mattis nisi
                            </p>
                          </td>
                          <td className="text-center">
                            <div className="form-check form-check-inline m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="form-check form-check-inline m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="form-check form-check-inline m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h3 className="h4 mb-0">
                              Enable System Notifications
                              <a
                                href="#"
                                data-bs-toggle="tooltip"
                                title="Maecenas sit amet lectus et orci facilisis venenatis"
                                className="ms-1 text-secondary"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  height="14"
                                  width="14"
                                >
                                  <path
                                    d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,0,1,0,2Z"
                                    style={{ fill: "currentColor" }}
                                  />
                                </svg>
                              </a>
                            </h3>
                            <p className="small text-muted mb-0">
                              In dapibus magna ac tellus lacinia, tempus pretium
                              mauris scelerisque
                            </p>
                          </td>
                          <td className="text-center">
                            <div className="form-check form-check-inline m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="form-check form-check-inline m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="form-check form-check-inline m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h3 className="h4 mb-0">Status changes</h3>
                            <p className="small text-muted mb-0">
                              Ut viverra sapien ut purus ultricies, et euismod
                              enim viverra
                            </p>
                          </td>
                          <td className="text-center">
                            <div className="form-check form-check-inline m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="form-check form-check-inline m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="form-check form-check-inline m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="d-flex justify-content-end mt-5">
                      <button type="button" className="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="card border-0 scroll-mt-3"
                id="connectedAccountsSection"
              >
                <div className="card-header">
                  <h2 className="h3 mb-0">Connected Accounts</h2>
                </div>

                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon
                          icon={faGoogle}
                          height={30}
                          width={30}
                        />
                        <div className="ms-3">
                          <h3 className="h4 mb-0">Google</h3>
                          <p className="small text-muted mb-0">
                            Etiam rhoncus leo et ex volutpat eleifend
                          </p>
                        </div>
                      </div>
                      <div className="form-check form-switch mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          checked
                          id="connectGoogle"
                        />
                      </div>
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faAws} height={30} width={30} />
                        <div className="ms-3">
                          <h3 className="h4 mb-0">AWS</h3>
                          <p className="small text-muted mb-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit
                          </p>
                        </div>
                      </div>
                      <div className="form-check form-switch mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="connectAWS"
                        />
                      </div>
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon
                          icon={faSlack}
                          height={30}
                          width={30}
                        />
                        <div className="ms-3">
                          <h3 className="h4 mb-0">Slack</h3>
                          <p className="small text-muted mb-0">
                            Sed dapibus sapien <a href="#">vel bibendum</a>{" "}
                            egestas
                          </p>
                        </div>
                      </div>
                      <div className="form-check form-switch mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          checked
                          id="connectSlack"
                        />
                      </div>
                    </li>
                  </ul>

                  <div className="d-flex justify-content-end mt-5">
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="card border-0 scroll-mt-3"
                id="deleteAccountSection"
              >
                <div className="card-header">
                  <h2 className="h3 mb-0">Delete Account</h2>
                </div>

                <div className="card-body">
                  <div
                    className="alert text-bg-danger-soft d-flex align-items-center"
                    role="alert"
                  >
                    <div>
                      <FontAwesomeIcon
                        icon={faExclamation}
                        height={32}
                        width={32}
                        className="me-3"
                      />
                    </div>
                    <div>
                      <h4 className="mb-0">
                        If you delete your account, you will lose all your data
                      </h4>
                      Take a backup of your data
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="deleteAccount"
                      />

                      <label
                        className="form-check-label"
                        htmlFor="deleteAccount"
                      >
                        I confirm that I'd like to delete my account
                      </label>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-5">
                    <button type="button" className="btn btn-danger">
                      Delete account
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Student
