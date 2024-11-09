import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faPrint, faDownload, faTimes, faCogs, faRedoAlt } from "@fortawesome/free-solid-svg-icons"

const TeacherDetails = () => {
  return (
    <div className="dashboard-content-one">
      <div className="breadcrumbs-area">
        <h3>Teacher</h3>
        <ul>
          <li>
            <a href="index.html">Home</a>
          </li>
          <li>Teacher Details</li>
        </ul>
      </div>
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
            </div>
            <div className="dropdown">
        

              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">
                  <FontAwesomeIcon icon={faTimes} className="text-orange-red" title="Close"></FontAwesomeIcon>
                </a>
                <a className="dropdown-item" href="#">
                  <FontAwesomeIcon icon={faCogs} title="Edit"></FontAwesomeIcon>
                </a>
                <a className="dropdown-item" href="#">
                  <FontAwesomeIcon icon={faRedoAlt} className="text-orange-peel" title="Refresh"></FontAwesomeIcon>
                </a>
              </div>
            </div>
          </div>
          <div className="single-info-details">
            <div className="item-content">
              <div className="header-inline item-header">
                <h3 className="text-dark-medium font-medium">Steven Johnson</h3>
                <div className="header-elements">
                  <ul>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon icon={faEdit}/>
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
                      <td className="font-medium text-dark-medium">
                        Steven Johnson
                      </td>
                    </tr>
      
                    <tr>
                      <td>Father Name:</td>
                      <td className="font-medium text-dark-medium">
                        Steve Jones
                      </td>
                    </tr>
                    <tr>
                      <td>Mother Name:</td>
                      <td className="font-medium text-dark-medium">
                        Naomi Rose
                      </td>
                    </tr>
                    <tr>
                      <td>Religion:</td>
                      <td className="font-medium text-dark-medium">Islam</td>
                    </tr>
                    <tr>
                      <td>Joining Date:</td>
                      <td className="font-medium text-dark-medium">
                        07.08.2016
                      </td>
                    </tr>
                    <tr>
                      <td>E-mail:</td>
                      <td className="font-medium text-dark-medium">
                        stevenjohnson@gmail.com
                      </td>
                    </tr>
                    <tr>
                      <td>Subject:</td>
                      <td className="font-medium text-dark-medium">English</td>
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
        </div>
      </div>
    </div>
  )
}

export default TeacherDetails
