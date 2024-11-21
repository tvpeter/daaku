import { useEffect, useState } from "react"
import sessionService, {
  SchoolSession,
  SessionStatus,
} from "../../services/sessionService"
import { AxiosError } from "axios"
import studentClassService, { StudentClass } from "../../services/studentClassService"

const RegisterStudent = () => {
  const [error, setError] = useState("")
  const [sessions, setSessions] = useState<SchoolSession[]>([]);
  const [studentClasses, setStudentClasses] = useState<StudentClass[]>();

  useEffect(() => {
    const { request, cancel } = sessionService.getAll<{
      result: SchoolSession[]
    }>()

    request
      .then((response) => {
        const fetchedSessions = response.data.result
        const openSessions = fetchedSessions
          ? fetchedSessions.filter(
              (session) => session.status === SessionStatus.OPEN
            )
          : []
        setSessions(openSessions)
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })

      const { request: classRequest, cancel: classCancel } = studentClassService.getAll<{
        result: StudentClass[]
      }>();

      classRequest.then((response) => {
        setStudentClasses(response.data.result);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })

    return () => {cancel(), classCancel()};
  }, [])

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-baseline justify-content-between">
        <h1 className="h2">Students Registration</h1>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Students
            </li>
          </ol>
        </nav>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-9 col-xxl-7 mt-8">
          <form className="needs-validation" noValidate>
            <div className="tab-content mt-3" id="wizard-tabContent">
              <div
                className="tab-pane fade show active"
                id="wizardStepOne"
                role="tabpanel"
                aria-labelledby="wizardTabOne"
              >
                <div className="card border-0 py-6 px-md-6">
                  <div className="card-body">
                    <h2 className="text-center mb-0">Register Student</h2>
                    <p className="text-secondary text-center">
                      Fill all information
                    </p>

                    {error && (
                      <div
                        className={
                          "alert d-flex align-items-center mb-6  text-bg-warning-soft"
                        }
                        role="alert"
                      >
                        {error}
                      </div>
                    )}
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-md">
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Firstname Lastname"
                            required
                          />
                          <div className="invalid-feedback">
                            Student name is required
                          </div>
                        </div>

                        <div className="col-md">
                          <label htmlFor="dob" className="form-label">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="dob"
                            placeholder="28/10/2017"
                            required
                          />
                          <div className="invalid-feedback">
                            Please indicate student admission number
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="row">
                        <div className="col-md">
                          <label htmlFor="phone" className="form-label">
                            Phone
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            placeholder="Phone"
                            required
                          />
                          <div className="invalid-feedback">
                            Parents contact is required
                          </div>
                        </div>

                        <div className="col-md">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            required
                          />
                          <div className="invalid-feedback">
                            Supply a valid email
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="row">
                        <div className="col-md">
                          <label htmlFor="gender" className="form-label">
                            Gender
                          </label>
                          <select
                            className="form-select"
                            id="gender"
                            required
                            autoComplete="off"
                          >
                            <option value="" label="select"></option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                          <div className="invalid-feedback">
                            Please select student Gender
                          </div>
                        </div>

                        <div className="col-md">
                          <label htmlFor="admno" className="form-label">
                            Admission Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="admno"
                            placeholder="281JUD"
                            required
                          />
                          <div className="invalid-feedback">
                            Please indicate student admission number
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-md">
                          <label htmlFor="session_id" className="form-label">
                            Session
                          </label>
                          <select
                            className="form-select"
                            id="session_id"
                            required
                          >
                            <option value="" label="select"></option>
                          {sessions.map((session) => (
                            <option value={session.id} key={session.id }>{session.name}</option>
                          ))}
                          </select>
                          <div className="invalid-feedback">
                            Please select session
                          </div>
                        </div>
                        <div className="col-md">
                          <label htmlFor="class_id" className="form-label">
                            Class
                          </label>
                          <select
                            className="form-select"
                            id="class_id"
                            required
                          >
                            <option value="" label="select"></option>
                            {studentClasses?.map((studentClass) => (
                            <option value={studentClass.id} key={studentClass.id}>{studentClass.name}</option>
                          ))}
                          </select>
                          <div className="invalid-feedback">
                            Please select student class
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-md">
                          <label htmlFor="address" className="form-label">
                            Address
                          </label>
                          <textarea
                            className="form-control"
                            id="overview"
                            rows={4}
                          ></textarea>
                          <div className="invalid-feedback">
                            Supply student address
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="d-flex justify-content-end mt-5">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterStudent
