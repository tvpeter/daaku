import {
    faAws,
  faFirefoxBrowser,
  faGoogle,
  faGooglePay,
  faPaypal,
  faSlack,
} from "@fortawesome/free-brands-svg-icons"
import {
  faAt,
  faExclamation,
  faMessage,
  faPen,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

function Student() {
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

                <h3 className="mb-0">Student Name</h3>
                <span className="small text-secondary fw-semibold">
                  Class Name
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
                  <svg
                    viewBox="0 0 24 24"
                    height="14"
                    width="14"
                    className="me-3"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.750 6.000 A5.250 5.250 0 1 0 17.250 6.000 A5.250 5.250 0 1 0 6.750 6.000 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2.25,23.25a9.75,9.75,0,0,1,19.5,0"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                  Basic information
                </a>
              </li>

              <li>
                <a
                  href="#usernameSection"
                  className="d-flex align-items-center py-3"
                >
                  <svg
                    viewBox="0 0 24 24"
                    height="14"
                    width="14"
                    className="me-3"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.25,12A5.25,5.25,0,1,1,12,6.75,5.25,5.25,0,0,1,17.25,12Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M17.25,12v2.25a3,3,0,0,0,6,0V12a11.249,11.249,0,1,0-4.5,9"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                  Username
                </a>
              </li>

              <li>
                <a
                  href="#passwordSection"
                  className="d-flex align-items-center py-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="14"
                    width="14"
                    className="me-3"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M18.75 9.75H5.25C4.42157 9.75 3.75 10.4216 3.75 11.25V21.75C3.75 22.5784 4.42157 23.25 5.25 23.25H18.75C19.5784 23.25 20.25 22.5784 20.25 21.75V11.25C20.25 10.4216 19.5784 9.75 18.75 9.75Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6.75 9.75V6C6.75 4.60761 7.30312 3.27226 8.28769 2.28769C9.27226 1.30312 10.6076 0.75 12 0.75C13.3924 0.75 14.7277 1.30312 15.7123 2.28769C16.6969 3.27226 17.25 4.60761 17.25 6V9.75"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M8.625 15C8.41789 15 8.25 14.8321 8.25 14.625C8.25 14.4179 8.41789 14.25 8.625 14.25"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M8.625 15C8.83211 15 9 14.8321 9 14.625C9 14.4179 8.83211 14.25 8.625 14.25"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M8.625 18.75C8.41789 18.75 8.25 18.5821 8.25 18.375C8.25 18.1679 8.41789 18 8.625 18"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M8.625 18.75C8.83211 18.75 9 18.5821 9 18.375C9 18.1679 8.83211 18 8.625 18"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M12 15C11.7929 15 11.625 14.8321 11.625 14.625C11.625 14.4179 11.7929 14.25 12 14.25"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M12 15C12.2071 15 12.375 14.8321 12.375 14.625C12.375 14.4179 12.2071 14.25 12 14.25"
                    />
                    <g>
                      <path
                        stroke="currentColor"
                        strokeWidth="1.5"
                        d="M12 18.75C11.7929 18.75 11.625 18.5821 11.625 18.375C11.625 18.1679 11.7929 18 12 18"
                      />
                      <path
                        stroke="currentColor"
                        strokeWidth="1.5"
                        d="M12 18.75C12.2071 18.75 12.375 18.5821 12.375 18.375C12.375 18.1679 12.2071 18 12 18"
                      />
                    </g>
                    <g>
                      <path
                        stroke="currentColor"
                        strokeWidth="1.5"
                        d="M15.375 15C15.1679 15 15 14.8321 15 14.625C15 14.4179 15.1679 14.25 15.375 14.25"
                      />
                      <path
                        stroke="currentColor"
                        strokeWidth="1.5"
                        d="M15.375 15C15.5821 15 15.75 14.8321 15.75 14.625C15.75 14.4179 15.5821 14.25 15.375 14.25"
                      />
                    </g>
                    <g>
                      <path
                        stroke="currentColor"
                        strokeWidth="1.5"
                        d="M15.375 18.75C15.1679 18.75 15 18.5821 15 18.375C15 18.1679 15.1679 18 15.375 18"
                      />
                      <path
                        stroke="currentColor"
                        strokeWidth="1.5"
                        d="M15.375 18.75C15.5821 18.75 15.75 18.5821 15.75 18.375C15.75 18.1679 15.5821 18 15.375 18"
                      />
                    </g>
                  </svg>
                  Password
                </a>
              </li>

              <li>
                <a
                  href="#privacyAndSafetySection"
                  className="d-flex align-items-center py-3"
                >
                  <svg
                    viewBox="0 0 24 24"
                    height="14"
                    width="14"
                    className="me-3"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.749,9a8.25,8.25,0,0,1,13.5-6.364"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M19.687,6a8.23,8.23,0,0,1,.562,3v6A8.25,8.25,0,0,1,12,23.25a8.336,8.336,0,0,1-1.5-.136"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6.751,21.365a8.234,8.234,0,0,1-3-6.365V12.75"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M15.749,15V9a3.75,3.75,0,0,0-6-3"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8.249,9v6A3.753,3.753,0,0,0,13.5,18.438"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M11.999 9.75L11.999 14.25"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                  Privacy and Safety
                </a>
              </li>

              <li>
                <a
                  href="#paymentMethodsSection"
                  className="d-flex align-items-center py-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="14"
                    width="14"
                    className="me-3"
                  >
                    <defs></defs>
                    <title>credit-card-1</title>
                    <rect
                      className="a"
                      x="0.75"
                      y="3.75"
                      width="22.5"
                      height="16.5"
                      rx="1.5"
                      ry="1.5"
                    />
                    <line
                      className="a"
                      x1="0.75"
                      y1="8.25"
                      x2="23.25"
                      y2="8.25"
                    />
                    <line
                      className="a"
                      x1="5.25"
                      y1="12.75"
                      x2="13.5"
                      y2="12.75"
                    />
                    <line
                      className="a"
                      x1="5.25"
                      y1="15.75"
                      x2="10.5"
                      y2="15.75"
                    />
                  </svg>
                  Payment methods
                </a>
              </li>

              <li>
                <a
                  href="#notificationsSection"
                  className="d-flex align-items-center py-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="14"
                    width="14"
                    className="me-3"
                  >
                    <defs></defs>
                    <title>alert-bell-notification-2</title>
                    <circle className="a" cx="18.875" cy="5.827" r="3" />
                    <path
                      className="a"
                      d="M9.125,21.75a2.087,2.087,0,0,0,4.005,0"
                    />
                    <line
                      className="a"
                      x1="11.125"
                      y1="3"
                      x2="11.125"
                      y2="0.75"
                    />
                    <path
                      className="a"
                      d="M18.648,11.961c.189,5.756,1.477,6.789,1.477,6.789h-18s1.5-1.916,1.5-8.25a7.507,7.507,0,0,1,9.724-7.165"
                    />
                  </svg>
                  Notifications
                </a>
              </li>

              <li>
                <a
                  href="#connectedAccountsSection"
                  className="d-flex align-items-center py-3"
                >
                  <svg
                    viewBox="0 0 24 24"
                    height="14"
                    width="14"
                    className="me-3"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.750 10.498 A3.750 3.750 0 1 0 17.250 10.498 A3.750 3.750 0 1 0 9.750 10.498 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M18.750 2.998 A2.250 2.250 0 1 0 23.250 2.998 A2.250 2.250 0 1 0 18.750 2.998 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M18.750 15.748 A2.250 2.250 0 1 0 23.250 15.748 A2.250 2.250 0 1 0 18.750 15.748 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M11.250 20.998 A2.250 2.250 0 1 0 15.750 20.998 A2.250 2.250 0 1 0 11.250 20.998 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M0.750 20.998 A2.250 2.250 0 1 0 5.250 20.998 A2.250 2.250 0 1 0 0.750 20.998 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M1.500 5.248 A2.250 2.250 0 1 0 6.000 5.248 A2.250 2.250 0 1 0 1.500 5.248 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M16.151 7.848L19.411 4.588"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M16.794 12.292L19.079 14.577"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M13.5 14.248L13.5 18.748"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10.851 13.147L4.59 19.408"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10.001 9.149L5.61 6.514"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                  Connected accounts
                </a>
              </li>

              <li>
                <a
                  href="#deleteAccountSection"
                  className="d-flex align-items-center py-3"
                >
                  <svg
                    viewBox="0 0 24 24"
                    height="14"
                    width="14"
                    className="me-3"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.177,23.25H7.677a1.5,1.5,0,0,1-1.5-1.5V8.25h13.5v13.5A1.5,1.5,0,0,1,18.177,23.25Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10.677 18.75L10.677 12.75"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M15.177 18.75L15.177 12.75"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2.427 6.212L21.501 2.158"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M13.541.783l-4.4.935A1.5,1.5,0,0,0,7.984,3.5L8.3,4.965l7.336-1.56L15.32,1.938A1.5,1.5,0,0,0,13.541.783Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
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
                      value="Ellie K. Tucker"
                    />
                    <div className="invalid-feedback">
                      Please add your full name
                    </div>
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
                      value="+1(119)980-03-11"
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
                      value="ellie.tucker@dashly.com"
                    />
                    <div className="invalid-feedback">
                      Please add your email address
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-lg-3">
                    <label htmlFor="country" className="col-form-label">
                      Location
                    </label>
                  </div>

                  <div className="col-lg">
                    <div className="mb-4">
                      <select
                        className="form-select"
                        id="country"
                        required
                        autoComplete="off"
                        data-select='{
                                            "placeholder": "Country"
                                        }'
                        data-option-template='<span class="d-flex align-items-center py-2"><span class="avatar avatar-circle avatar-xxs"><img class="avatar-img shadow-sm" src="assets/images/flags/1x1/%5b%5bvalue%5d%5d.html" /></span><span class="text-truncate ms-2">[[text]]</span></span>'
                        data-item-template='<span class="d-flex align-items-center"><span class="avatar avatar-circle avatar-xxs"><img class="avatar-img shadow-sm" src="assets/images/flags/1x1/%5b%5bvalue%5d%5d.html" /></span><span class="text-truncate ms-2">[[text]]</span></span>'
                      >
                        <option value="" label="country placeholder"></option>
                        <option value="af">Afghanistan</option>
                        <option value="ax">Aland Islands</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select a country
                      </div>
                    </div>

                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        value="Houston"
                      />
                      <div className="invalid-feedback">Please add a city</div>
                    </div>

                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        value="Texas"
                      />
                      <div className="invalid-feedback">
                        Please add a state or county
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-lg-3">
                    <label htmlFor="addressLine1" className="col-form-label">
                      Address Line 1
                    </label>
                  </div>

                  <div className="col-lg">
                    <input
                      type="text"
                      className="form-control"
                      id="addressLine1"
                      value="3227 Wines Lane"
                    />
                    <div className="invalid-feedback">
                      Please add an address
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-lg-3">
                    <label htmlFor="addressLine2" className="col-form-label">
                      Address Line 2
                      <span className="text-muted fw-normal">(Optional)</span>
                    </label>
                  </div>

                  <div className="col-lg">
                    <input
                      type="text"
                      className="form-control"
                      id="addressLine2"
                    />
                    <div className="invalid-feedback">
                      Please add an address
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-lg-3">
                    <label htmlFor="zipCode" className="col-form-label">
                      Zip code
                    </label>
                  </div>

                  <div className="col-lg">
                    <input
                      type="text"
                      className="form-control"
                      id="zipCode"
                      value="77032"
                    />
                    <div className="invalid-feedback">
                      Please add a zip code
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-lg-3">
                    <label htmlFor="overview" className="col-form-label">
                      Overview
                    </label>
                  </div>

                  <div className="col-lg">
                    <textarea className="form-control" id="overview" rows={4}>
                      Gamer. Certified entrepreneur. Introvert. Zombie geek.
                      Friendly coffee guru. Vegan.
                    </textarea>
                    <div className="invalid-feedback">
                      Please tell something about yourself
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
                    <label htmlFor="currentPassword" className="col-form-label">
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
                        <p className="small text-muted mb-0">Expires 9/2024</p>
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
                  In this setcion you will be able to configure the behaviour of
                  notifications in Dashly
                </p>

                <div className="table-responsive">
                  <table id="notificationsTable" className="table align-middle">
                    <thead className="thead-light">
                      <tr>
                        <th className="text-uppercase py-4 align-middle min-w-300px min-w-md-auto">
                          Type
                        </th>
                        <th className="text-center text-uppercase py-4">
                            <FontAwesomeIcon icon={faMessage} height={24} width={24} />
                          Email
                        </th>
                        <th className="text-center text-uppercase py-4">
                          <FontAwesomeIcon icon={faFirefoxBrowser} height={24} width={24} />
                          Browser
                        </th>
                        <th className="text-center text-uppercase py-4">
                         <FontAwesomeIcon icon={faPhone} height={30} width={30} />
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
                     <FontAwesomeIcon icon={faGoogle} height={30} width={30} />
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
                     <FontAwesomeIcon icon={faAws} height={30} width={30}/>
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
                      <FontAwesomeIcon icon={faSlack} height={30} width={30} />
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

                    <label className="form-check-label" htmlFor="deleteAccount">
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
    </div>
  )
}

export default Student
