import { useEffect, useState } from "react"
import studentService, { Student } from "../../services/studentService"
import { AxiosError } from "axios"

const Students = () => {
  const [error, setError] = useState("")
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const { request, cancel } = studentService.getAll<{result: Student[]}>()

    setLoading(true)
    request
      .then((response) => {
        setStudents(response.data.result);
        console.log(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message)
        } else if (error && error instanceof Error) setError(error.message)
      })
      setLoading(false);

      return () => cancel();
  }, [])

  return (
    <div className="dashboard-content-one">
      <div className="breadcrumbs-area">
        <h3>Students</h3>
        <ul>
          <li>
            <a href="index.html">Home</a>
          </li>
          <li>All Students</li>
        </ul>
      </div>
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h3>All Students Data</h3>
            </div>
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
                  <th>
                    Admission No.
                  </th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Class</th>
                  <th>Session</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {students && students.map((student) => (
                <tr key={student.id}>
                  <td>
                    {student.admission_number}
                  </td>
                  <td className="text-capitalize">{student.name}</td>
                  <td className="text-capitalize">{student.gender}</td>
                  <td>{student.class.name}</td>
                  <td>{ student.session.name }</td>
                  <td>Edit</td>
                  <td>Delete</td>
                  <td>Details</td>
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

export default Students
