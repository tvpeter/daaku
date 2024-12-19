import { useEffect, useState } from "react"
import studentService, { Student } from "../../services/studentService"
import { AxiosError } from "axios"
import { Link } from "react-router-dom"
import sessionService, { SchoolSession } from "../../services/sessionService"
import studentClassService, {
  StudentClass,
} from "../../services/studentClassService"
import { useFormik } from "formik"
import * as Yup from "yup"
import subjectService, { Subject } from "../../services/subjectService"

export interface SubjectStudentClassParams {
  class_id: number
  session_id: number
  subject_id: number
}

const validationSchema = Yup.object({
  class_id: Yup.number().required("Select class"),
  session_id: Yup.number().required("Select session"),
  subject_id: Yup.number().required("Select subject"),
})

const StudentClassSubject = () => {
  const [error, setError] = useState("")
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setLoading] = useState(false)
  const [sessions, setSessions] = useState<SchoolSession[]>([])
  const [selectedSessionName, setSelectedSessionName] = useState<string | null>(
    null
  )
  const [selectedClassName, setSelectedClassName] = useState<string | null>(
    null
  )
  const [studentClass, setStudentClass] = useState<StudentClass[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedSubjectName, setSelectedSubjectName] = useState<string | null>(
    null
  )
  const [totalStudentsInAClass, setTotalStudentsInAClass] = useState<
    number | null
  >()

  const getSessions = () => {
    const { request, cancel } = sessionService.getAll<{
      result: SchoolSession[]
    }>()

    request
      .then((response) => {
        setSessions(response.data.result)
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })

    return () => cancel()
  }

  const loadStudentClasses = () => {
    const { request, cancel } = studentClassService.getAll<{
      result: StudentClass[]
    }>()

    request
      .then((response) => {
        setStudentClass(response.data.result)
      })
      .catch((error) => {
        if (error && error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })
    return () => cancel()
  }

  const getSubjects = () => {
    const { request, cancel } = subjectService.getAll<{
      result: Subject[]
    }>()

    request
      .then((response) => {
        setSubjects(response.data.result)
      })
      .catch((error) => {
        if (error && error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })
      .finally(() => {})
    return () => cancel()
  }

  const getTotalStudentsInAClass = (session_id: number, class_id: number) => {
    const { request, cancel } = studentService.getStudentsCount(
      session_id,
      class_id
    )

    request
      .then((response) => {
        setTotalStudentsInAClass(response.data.result)
      })
      .catch((error) => {
        if (error && error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })
    return () => cancel()
  }

  useEffect(() => {
    getSessions()
    loadStudentClasses()
    getSubjects()
  }, [])

  const getStudents = (requestBody: SubjectStudentClassParams) => {
    const fetchStudents = studentService.getWithParams<
      SubjectStudentClassParams,
      { result: Student[] }
    >(requestBody)

    setLoading(true)
    fetchStudents.request
      .then((response) => {
        setStudents(response.data.result)
        setLoading(false)
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })
    setLoading(false)

    return () => fetchStudents.cancel()
  }

  const onSubmit = (values: {
    session_id: number
    class_id: number
    subject_id: number
  }) => {
    const transformValues = {
      session_id: Number(values.session_id),
      class_id: Number(values.class_id),
      subject_id: Number(values.subject_id),
    }

    const selectedClass = studentClass.find(
      (classDetails) => classDetails.id === transformValues.class_id
    )
    setSelectedClassName(selectedClass ? selectedClass.name : null)
    const selectedSession = sessions.find(
      (session) => session.id === transformValues.session_id
    )
    setSelectedSessionName(selectedSession ? selectedSession.name : null)
    const selectedSubject = subjects.find(
      (subject) => subject.id === transformValues.subject_id
    )
    setSelectedSubjectName(selectedSubject ? selectedSubject.name : null)
    getStudents(transformValues)

    getTotalStudentsInAClass(
      transformValues.session_id,
      transformValues.class_id
    )
  }

  const initialValues = {
    class_id: 0,
    session_id: 0,
    subject_id: 0,
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-baseline justify-content-between">
        <h1 className="h2">Students</h1>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"></li>
            <li className="breadcrumb-item active" aria-current="page">
              Students In A Class
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

      <div className="row">
        <div className="col d-flex mt-9">
          <div className="card border-0 flex-fill w-100">
            <div className="card-header border-0">
              <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
                <h2 className="card-header-title h4 text-uppercase">
                  {selectedSessionName && selectedClassName
                    ? `${selectedClassName} Students Registered for ${selectedSubjectName} in ${selectedSessionName}`
                    : "Select Session,  Class and Subject"}
                </h2>

                <form
                  className="d-flex align-items-center gap-4"
                  onSubmit={formik.handleSubmit}
                >
                  <select
                    className="form-select"
                    {...formik.getFieldProps("session_id")}
                    required
                  >
                    <option value="" label="Select session"></option>
                    {sessions.map((session) => (
                      <option value={session.id} key={session.id}>
                        {session.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select"
                    {...formik.getFieldProps("class_id")}
                    required
                  >
                    <option value="" label="Select class"></option>
                    {studentClass.map((classDetails) => (
                      <option value={classDetails.id} key={classDetails.id}>
                        {classDetails.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select"
                    {...formik.getFieldProps("subject_id")}
                    required
                  >
                    <option value="" label="Select Subject"></option>
                    {subjects.map((subject) => (
                      <option value={subject.id} key={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle table-hover table-nowrap mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Adm No.</th>
                    <th>Session</th>
                    <th>Class</th>
                    <th>Term I</th>
                    <th>Term II</th>
                    <th>Term III</th>
                    <th>
                      <a href="#" className="text-muted list-sort">
                        Remove
                      </a>
                    </th>
                  </tr>
                </thead>

                <tbody className="list">
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="name">{student.name}</td>
                      <td>
                        <Link to={`/app/students/details/${student.id}`}>
                          {student.admission_number}
                        </Link>
                      </td>
                      <td className="status text-capitalize">
                        {student.studentSessionClass?.[0].session.name}
                      </td>
                      <td>
                        {student.studentSessionClass?.[0].studentClass.name}
                      </td>
                      <td></td>

                      <td></td>
                      <td></td>
                      <td>Edit</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-footer">
              <span className="pagination justify-content-end list-pagination mb-0 fst-italic">
                {selectedClassName && selectedSessionName && (
                  <span>
                    total students in {selectedClassName} for{" "}
                    {selectedSessionName} is {totalStudentsInAClass}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentClassSubject
