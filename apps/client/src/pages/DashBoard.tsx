import { faDollarSign, faEllipsisV, faUser, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const DashBoard = () => {
  return (
    <div className="container-fluid">
      <h1 className="h2">Dashboard</h1>

      <div className="row">
        <div className="col-lg-6 col-xxl-3 d-flex">
          <div className="card border-0 flex-fill w-100">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="text-uppercase text-muted fw-semibold mb-2">
                    Students
                  </h5>

                  <h2 className="mb-0">6,328</h2>
                </div>
                <div className="col-auto">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="text-primary"
                    height={30}
                    width={30}
                  />
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row justify-content-between">
                <div className="col-auto">
                  <p className="fs-6 text-muted text-uppercase mb-0">
                    Junior
                  </p>

                  <p className="fs-5 fw-bold mb-0">3800</p>
                </div>
                <div className="col text-end text-truncate">
                  <p className="fs-6 text-muted text-uppercase mb-0">
                    Senior
                  </p>

                  <p className="fs-5 fw-bold mb-0">3500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xxl-3 d-flex">
          <div className="card border-0 flex-fill w-100">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="text-uppercase text-muted fw-semibold mb-2">
                    Teachers
                  </h5>

                  <h2 className="mb-0">120</h2>
                </div>
                <div className="col-auto">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="text-primary"
                    height={30}
                    width={30}
                  />
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row justify-content-between">
                <div className="col-auto">
                  <p className="fs-6 text-muted text-uppercase mb-0">
                    Junior
                  </p>

                  <p className="fs-5 fw-bold mb-0">65</p>
                </div>
                <div className="col text-end text-truncate">
                  <p className="fs-6 text-muted text-uppercase mb-0">
                    Senior
                  </p>

                  <p className="fs-5 fw-bold mb-0">55</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xxl-3 d-flex">
          <div className="card border-0 flex-fill w-100">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="text-uppercase text-muted fw-semibold mb-2">
                    Last Exams Performance
                  </h5>

                  <h2 className="mb-0">55% pass rate</h2>
                </div>
                <div className="col-auto">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="text-primary"
                    height={30}
                    width={30}
                  />
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row justify-content-between">
                <div className="col-auto">
                  <p className="fs-6 text-muted text-uppercase mb-0">
                    Senior Classes
                  </p>

                  <p className="fs-5 fw-bold mb-0">45%</p>
                </div>
                <div className="col text-end text-truncate">
                  <p className="fs-6 text-muted text-uppercase mb-0">
                    Junior Classes
                  </p>

                  <p className="fs-5 fw-bold mb-0">65%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xxl-3 d-flex">
          <div className="card border-0 text-bg-primary flex-fill w-100">
            <div className="card-body">
              <h4 className="text-uppercase fw-semibold mb-2">
                Latest Social Media Post
              </h4>

              <h5 className="mb-0 text-muted">Twitter</h5>

              <div className="chart-container h-70px">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt cumque ducimus, aperiam consequuntur nemo minus sunt iste laborum, atque suscipit ipsum ex aspernatur. Atque consectetur obcaecati harum, culpa officiis dolorem?
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xxl-9 d-flex">
          <div
            className="card border-0 flex-fill w-100"
            data-list='{"valueNames": ["name", "price", "quantity", "amount", {"name": "sales", "attr": "data-sales"}], "page": 5}'
            id="topSellingProducts"
          >
            <div className="card-header border-0 card-header-space-between">
              <h2 className="card-header-title h4 text-uppercase">
                Top 10 Performing Students
              </h2>

              <div className="dropdown">
                <a
                  href="javascript: void(0);"
                  className="dropdown-toggle no-arrow text-secondary"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faEllipsisV} height={14} width={14} />
                  
                </a>
                <div className="dropdown-menu">
                  <a href="javascript: void(0);" className="dropdown-item">
                    Action
                  </a>
                  <a href="javascript: void(0);" className="dropdown-item">
                    Another action
                  </a>
                  <a href="javascript: void(0);" className="dropdown-item">
                    Something else here
                  </a>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle table-edge table-nowrap mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>
                      <a
                        href="javascript: void(0);"
                        className="text-muted list-sort"
                        data-sort="name"
                      >
                        Name
                      </a>
                    </th>
                    <th className="text-end">
                      <a
                        href="javascript: void(0);"
                        className="text-muted list-sort"
                        data-sort="price"
                      >
                        Class
                      </a>
                    </th>
                    <th className="text-end">
                      <a
                        href="javascript: void(0);"
                        className="text-muted list-sort"
                        data-sort="quantity"
                      >
                        Average
                      </a>
                    </th>
                    <th className="text-end">
                      <a
                        href="javascript: void(0);"
                        className="text-muted list-sort"
                        data-sort="amount"
                      >
                        Award
                      </a>
                    </th>
                  </tr>
                </thead>

                <tbody className="list">
                  <tr>
                    <td className="name fw-bold">Student A</td>
                    <td className="price text-end">JSS 2A</td>
                    <td className="quantity text-end">135</td>
                    <td className="amount text-end">$80,865</td>
                  </tr>
                  <tr>
                    <td className="name fw-bold">Student B</td>
                    <td className="price text-end">SS 1A</td>
                    <td className="quantity text-end">127</td>
                    <td className="amount text-end">$63,373</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 d-flex">
          <div className="card border-0 flex-fill w-100">
            <div className="card-header border-0 border-0 card-header-space-between">
              <h2 className="card-header-title h4 text-uppercase">
                Recent Publications
              </h2>

              <a href="javascript: void(0);" className="small fw-bold">
                View all
              </a>
            </div>

            <div className="table-responsive">
              <table className="table table-sm table-borderless align-middle mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>Author</th>
                    <th >Title</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-circle avatar-xs me-2">
                        <FontAwesomeIcon icon={faUser} height={30} width={30} />
                        </div>

                        <div className="d-flex flex-column">
                          <span className="fw-bold d-block">
                            Lester William
                          </span>
                          <span className="fs-6 text-muted">
                            24 minutes ago
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="">
                      <div className="fw-bold">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, ad pariatur. 
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-circle avatar-xs me-2">
                          <FontAwesomeIcon icon={faUser} height={30} width={30} />
                        </div>

                        <div className="d-flex flex-column">
                          <span className="fw-bold d-block">
                            Gabriella Fletcher
                          </span>
                          <span className="fs-6 text-muted"></span>
                        </div>
                      </div>
                    </td>
                    <td className="">
                      <div className="fw-bold">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default DashBoard
