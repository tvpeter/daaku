import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { AuthUserState } from "../services/authService"

import {
  faArchive,
  faBell,
  faBellSlash,
  faCalendar,
  faCamera,
  faCheckDouble,
  faCogs,
  faDiamond,
  faDove,
  faEllipsisH,
  faFaceGrinBeam,
  faGrinStars,
  faHashtag,
  faMoon,
  faNewspaper,
  faSchool,
  faSearch,
  faSun,
  faSunPlantWilt,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Header() {
  const auth = useAuthUser<AuthUserState>()
  return (
    <header className="container-fluid d-flex py-6 mb-4">
      <form className="d-none d-md-inline-block me-auto">
        <div className="input-group input-group-merge">
          <input
            type="text"
            className="form-control bg-light-green border-light-green w-250px"
            placeholder="Search..."
            aria-label="Search for any term"
          />

          <span className="input-group-text bg-light-green border-light-green p-0">
            <button
              className="btn btn-primary rounded-2 w-30px h-30px p-0 mx-1"
              type="button"
              aria-label="Search button"
            >
              <FontAwesomeIcon icon={faSearch} height={16} width={16} />

            </button>
          </span>
        </div>
      </form>

      <div className="d-flex align-items-center ms-auto me-n1 me-lg-n2">
        <div className="dropdown" id="themeSwitcher">
          <a
            href="javascript: void(0);"
            className="dropdown-toggle no-arrow d-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm mx-1 mx-lg-2 w-40px h-40px link-secondary"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            data-bs-offset="0,0"
          >
            <FontAwesomeIcon icon={faSun} />
          </a>

          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button
                type="button"
                className="dropdown-item active"
                data-theme-value="light"
              >
                <FontAwesomeIcon icon={faSunPlantWilt} className="me-2" />
                Light mode
              </button>
            </li>
            <li>
              <button
                type="button"
                className="dropdown-item"
                data-theme-value="dark"
              >
                <FontAwesomeIcon icon={faMoon} className="me-2" />
                Dark mode
              </button>
            </li>
            <li>
              <button
                type="button"
                className="dropdown-item"
                data-theme-value="auto"
              >
                <FontAwesomeIcon icon={faSchool} className="me-2" />
                Auto
              </button>
            </li>
          </ul>
        </div>

        <div className="vr bg-gray-700 mx-2 mx-lg-3"></div>

        <a
          className="d-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm mx-1 mx-lg-2 w-40px h-40px position-relative link-secondary"
          data-bs-toggle="offcanvas"
          href="#offcanvasNotifications"
          role="button"
          aria-controls="offcanvasNotifications"
        >
          <FontAwesomeIcon icon={faBell} width={18} height={18} />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-danger">
            20+<span className="visually-hidden">unread messages</span>
          </span>
        </a>

        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNotifications"
          aria-labelledby="offcanvasNotificationsLabel"
        >
          <div className="offcanvas-header px-5">
            <h3 className="offcanvas-title" id="offcanvasNotificationsLabel">
              Notifications
            </h3>

            <div className="d-flex align-items-start">
              <div className="dropdown">
                <a
                  href="javascript: void(0);"
                  className="dropdown-toggle no-arrow w-20px h-20px me-2 text-body"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faEllipsisH} width={18} height={18} />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="javascript: void(0);">
                      <FontAwesomeIcon
                        icon={faCheckDouble}
                        className="me-2 text-secondary"
                        width={14}
                        height={14}
                      />
                      Mark as all read
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="javascript: void(0);">
                      <FontAwesomeIcon
                        icon={faArchive}
                        className="me-2 text-secondary"
                        width={14}
                        height={14}
                      />
                      Archive all
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="javascript: void(0);">
                      <FontAwesomeIcon
                        icon={faBellSlash}
                        className="me-2 text-secondary"
                        width={14}
                        height={14}
                      />
                      Disable notifications
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="javascript: void(0);">
                      <FontAwesomeIcon
                        icon={faNewspaper}
                        className="me-2 text-secondary"
                        width={14}
                        height={14}
                      />
                      What's new?
                    </a>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
          </div>

          <div className="offcanvas-body p-0">
            <div className="list-group list-group-flush">
              <a
                href="javascript: void(0);"
                className="list-group-item list-group-item-action"
              >
                <div className="d-flex">
                  <div className="avatar avatar-circle avatar-xs me-2">
                    <span className="avatar-title text-bg-info-soft">D</span>
                  </div>

                  <div className="d-flex flex-column flex-grow-1">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Daniel</h5>
                      <small className="text-muted">10 minutes ago</small>
                    </div>

                    <div className="d-flex flex-column">
                      <p className="mb-1">
                        RE: Email pre-population from external source
                      </p>
                      <small className="text-secondary">
                        Not sure if we'll need any further instruction on how to
                        utilise the encoded ID in links from the new email
                        broadcast tool.
                      </small>
                    </div>
                  </div>
                </div>
              </a>

              <a
                href="javascript: void(0);"
                className="list-group-item list-group-item-action"
              >
                <div className="d-flex">
                  <div className="avatar avatar-circle avatar-xs me-2">
                    <span className="avatar-title text-bg-info-soft">M</span>
                  </div>

                  <div className="d-flex flex-column flex-grow-1">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Hello</h5>
                      <small className="text-muted">14 minutes ago</small>
                    </div>

                    <div className="d-flex flex-column">
                      <p className="mb-1">Customer invoice</p>
                      <small className="text-secondary">
                        This is a notice that an invoice has been generated on
                        05/14/2022.
                      </small>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="dropdown">
          <a
            href="javascript: void(0);"
            className="dropdown-toggle no-arrow d-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm mx-1 mx-lg-2 w-40px h-40px link-secondary"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            data-bs-offset="0,0"
          >
            <FontAwesomeIcon icon={faCalendar} width={18} height={18} />
          </a>

          <div className="dropdown-menu dropdown-menu-end w-300px h-250px overflow-auto scrollbar">
            <h6 className="dropdown-header text-uppercase">Apps & Services</h6>

            <div className="py-4 px-5">
              <div className="row">
                <div className="col-4 d-flex justify-content-center align-items-center">
                  <a
                    href="javascript: void(0);"
                    className="d-inline-block link-secondary fs-5 fw-semibold text-center p-3"
                  >
                    <span className="avatar avatar-xs d-flex align-items-center mx-auto mb-1">
                      <FontAwesomeIcon icon={faHashtag} />
                    </span>
                    Slack
                  </a>
                </div>
                <div className="col-4 d-flex justify-content-center align-items-end">
                  <a
                    href="javascript: void(0);"
                    className="d-inline-block link-secondary fs-5 fw-semibold text-center p-3"
                  >
                    <span className="avatar avatar-xs d-flex align-items-center mx-auto mb-1">
                      <FontAwesomeIcon icon={faGrinStars} />
                    </span>
                    GitHub
                  </a>
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                  <a
                    href="javascript: void(0);"
                    className="d-inline-block link-secondary fs-5 fw-semibold text-center p-3"
                  >
                    <span className="avatar avatar-xs d-flex align-items-center mx-auto mb-1">
                      <FontAwesomeIcon icon={faDiamond} />
                    </span>
                    JIRA
                  </a>
                </div>

                <hr className="dropdown-divider" />

                <div className="col-4 d-flex justify-content-center align-items-center">
                  <a
                    href="javascript: void(0);"
                    className="d-inline-block link-secondary fs-5 fw-semibold text-center p-3"
                  >
                    <span className="avatar avatar-xs d-flex align-items-center mx-auto mb-1">
                      <FontAwesomeIcon icon={faFaceGrinBeam} />
                    </span>
                    Facebook
                  </a>
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                  <a
                    href="javascript: void(0);"
                    className="d-inline-block link-secondary fs-5 fw-semibold text-center p-3"
                  >
                    <span className="avatar avatar-xs d-flex align-items-center mx-auto mb-1">
                      <FontAwesomeIcon icon={faDove} />
                    </span>
                    Twitter
                  </a>
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                  <a
                    href="javascript: void(0);"
                    className="d-inline-block link-secondary fs-5 fw-semibold text-center p-3"
                  >
                    <span className="avatar avatar-xs avatar-circle">
                      <FontAwesomeIcon icon={faCamera} />
                    </span>
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a
          className="d-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm mx-1 mx-lg-2 w-40px h-40px link-secondary"
          data-bs-toggle="offcanvas"
          href="#offcanvasCustomize"
          role="button"
          aria-controls="offcanvasCustomize"
        >
          <FontAwesomeIcon icon={faCogs} width={18} height={18} />
        </a>

        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasCustomize"
          aria-labelledby="offcanvasCustomizeTitle"
        >
          <div className="offcanvas-body pt-7 pb-5 position-relative">
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 mt-5 me-5"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>

            <div className="text-center">
              <h3 className="mb-2" id="offcanvasCustomizeTitle">
                Set Notifications
              </h3>
            </div>

            <hr />

            <div className="d-flex justify-content-between align-items-center mb-5">
              <div className="d-flex flex-column">
                <label
                  className="h4 mb-0 d-flex align-items-center"
                  htmlFor="isRTL"
                >
                  Logins
                </label>
                <p className="text-secondary fs-5 mb-0">
                  Receive notifications on logins
                </p>
              </div>

              <div className="form-check form-switch mb-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  data-theme-control="isRTL"
                  id="isRTL"
                  aria-label="RTL switcher"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="vr bg-gray-700 mx-2 mx-lg-3"></div>

        <div className="dropdown">
          <a
            href="javascript: void(0);"
            className="dropdown-toggle no-arrow d-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm mx-1 mx-lg-2 w-40px h-40px"
            role="button"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-haspopup="true"
            aria-expanded="false"
            data-bs-offset="0,0"
          >
            <div className="avatar avatar-circle avatar-sm avatar-online">
              <FontAwesomeIcon icon={faUserAlt} className="avatar-img" height={40} width={40} />
            </div>
          </a>

          <div className="dropdown-menu">
            <div className="dropdown-item-text">
              <div className="d-flex align-items-center">
                <div className="avatar avatar-sm avatar-circle">
                <FontAwesomeIcon icon={faUserAlt} className="avatar-img" height={40} width={40} />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h4 className="mb-0">{auth?.username}</h4>
                  <p className="card-text">{auth?.role}</p>
                </div>
              </div>
            </div>

            <hr className="dropdown-divider" />

            <div className="dropdown dropend">
              <a
                className="dropdown-item dropdown-toggle"
                href="javascript: void(0);"
                id="statusDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-offset="-16,10"
              >
                Set status
              </a>

              <div
                className="dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-sub-menu"
                aria-labelledby="statusDropdown"
              >
                <a className="dropdown-item" href="javascript: void(0);">
                  <span className="legend-circle bg-success me-2"></span>
                  Available
                </a>
                <a className="dropdown-item" href="javascript: void(0);">
                  <span className="legend-circle bg-danger me-2"></span>Busy
                </a>
                <a className="dropdown-item" href="javascript: void(0);">
                  <span className="legend-circle bg-warning me-2"></span>Away
                </a>
                <a className="dropdown-item" href="javascript: void(0);">
                  <span className="legend-circle bg-gray-500 me-2"></span>Appear
                  offline
                </a>
                <hr className="dropdown-divider" />
                <a className="dropdown-item" href="javascript: void(0);">
                  Reset status
                </a>
              </div>
            </div>

            <a className="dropdown-item" href="javascript: void(0);">
              Profile & account
            </a>
            <a className="dropdown-item" href="javascript: void(0);">
              Settings
            </a>

            <hr className="dropdown-divider" />

            <a className="dropdown-item" href="javascript: void(0);">
              Sign out
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
